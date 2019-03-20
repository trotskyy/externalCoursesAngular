import { Component, OnInit } from '@angular/core';
import { TaskListService } from './task-list.service';
import { TaskService } from '../task/task.service';
import { ActivatedRoute } from '@angular/router';
import { TaskList } from './task-list.model';
import { filter, mergeMap } from 'rxjs/operators';
import { Status } from '../task/status.emun';
import { Task } from '../task/task.model';
import { MatDialog } from '@angular/material';
import {
  CdkDragDrop
} from '@angular/cdk/drag-drop';
import { EditTaskComponent } from 'src/app/task-list/edit-task/edit-task.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  public taskList: TaskList;
  toDo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  constructor(
    private taskService: TaskService,
    private router: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.taskList = this.router.snapshot.data['taskList'];
    this.initArrays();
  }

  public openNewTaskDialog(): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      height: '600px',
      width: '800px',
      data: { taskListId: this.taskList.id, status: Status.ToDo }
    });

    // pay attention! subscribe inside subscribe. this is wrong
    // dialogRef.afterClosed().pipe(
    //   filter(response => !!response)
    // ).subscribe(response => {
    //   this.taskService.create(response as Task)
    //     .subscribe((task: Task) => {
    //       this.taskList.tasks.push(task);
    //     });
    // });

    // use mergeMap() instead
    dialogRef
      .afterClosed()
      .pipe(
        filter(response => !!response),
        mergeMap(response => this.taskService.create(response as Task))
      )
      .subscribe(task => {
        this.taskList.tasks.push(task);
        this.initArrays();
      });
  }

  public onEditTask(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      height: '600px',
      width: '800px',
      data: { ...task }
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(response => !!response),
        mergeMap(response =>
          this.taskService
            .update((<Task>response).id, response as Task)
            .pipe(mergeMap(_ => of(response)))
        )
      )
      .subscribe(_ => this.updateTaskInArrays(task));
  }

  public onDeleteTask(task: Task): void {
    // remove subscribe and see that request does not occur!
    this.taskService.delete(task.id).subscribe(_ => {
      const tasks = this.taskList.tasks;
      const deletedTaskIndex = tasks.findIndex(t => t === task);

      this.taskList.tasks = tasks.splice(0, deletedTaskIndex);
      this.initArrays();
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    console.log(event);
    console.log(event.item.data);
    console.log(+event.container.id);
    const item = event.item.data;
    const status = +event.container.id;
    this.onUpdateTaskStatus(item, status);
  }

  private onUpdateTaskStatus(task: Task, status: Status) {
    task.status = status;
    this.taskService.update(task.id, task)
      .subscribe(_ => this.updateTaskInArrays(task));
  }

  private updateTaskInArrays(task: Task) {
    const updated = task as Task;
    const updatedTaskIndex = this.taskList.tasks.findIndex(
      t => t.id === updated.id
    );

    this.taskList.tasks[updatedTaskIndex] = updated;
    console.log('updated task', updated);
    this.initArrays();
  }

  private initArrays() {
    this.toDo = this.getToDo();
    this.inProgress = this.getInProgress();
    this.done = this.getDone();
  }

  private getToDo(): Task[] {
    const arr = this.taskList.tasks
      .filter(item => item.status === Status.ToDo)
      .sort(this.sortDescPriority);
    return arr ? arr : [];
  }

  private getInProgress(): Task[] {
    const arr = this.taskList.tasks
      .filter(item => item.status === Status.InProgress)
      .sort(this.sortDescPriority);
    return arr || [];
  }

  private getDone(): Task[] {
    const arr = this.taskList.tasks
      .filter(item => item.status === Status.Done)
      .sort(this.sortDescPriority);
    return arr ? arr : [];
  }

  private sortDescPriority(a: Task, b: Task): number {
    return b.priority - a.priority;
  }
}
