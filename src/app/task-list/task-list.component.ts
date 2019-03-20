import { Component, OnInit } from '@angular/core';
import { TaskListService } from './task-list.service';
import { TaskService } from '../task/task.service';
import { ActivatedRoute } from '@angular/router';
import { TaskList } from './task-list.model';
import { filter, mergeMap } from 'rxjs/operators';
import { Status } from '../task/status.emun';
import { Task } from '../task/task.model';
import { MatDialog } from '@angular/material';
import { EditTaskComponent } from 'src/app/task-list/edit-task/edit-task.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  public taskList: TaskList;

  constructor(private taskListService: TaskListService,
    private taskService: TaskService,
    private router: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.taskList = this.router.snapshot.data['taskList'];
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
    dialogRef.afterClosed().pipe(
      filter(response => !!response),
      mergeMap(response => this.taskService.create(response as Task))
    ).subscribe(task => {
      this.taskList.tasks.push(task);
    });
  }

  public onEditTask(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      height: '600px',
      width: '800px',
      data: { ...task }
    });

    dialogRef.afterClosed().pipe(
      filter(response => !!response),
      mergeMap(response => this.taskService.update((<Task>response).id, response as Task).pipe(
        mergeMap(_ => of(response))
      ))
    ).subscribe(response => {
      const task = response as Task;
      const updatedTaskIndex = this.taskList.tasks.findIndex(t => t.id === task.id);

      this.taskList.tasks[updatedTaskIndex] = task;
      console.log(task);
      console.log('edit');
    });
  }

  public onDeleteTask(task: Task): void {
    // remove subscribe and see that request does not occur!
    this.taskService.delete(task.id).subscribe(_ => {
      const tasks = this.taskList.tasks;
      const deletedTaskIndex = tasks.findIndex(t => t === task);

      this.taskList.tasks = tasks.splice(0, deletedTaskIndex);
    });
  }

  public getToDo(): Task[] {
    return this.taskList.tasks
      .filter(item => item.status === Status.ToDo)
      .sort(this.sortDescPriority);
  }

  public getInProgress(): Task[] {
    return this.taskList.tasks
      .filter(item => item.status === Status.InProgress)
      .sort(this.sortDescPriority);
  }

  public getDone(): Task[] {
    return this.taskList.tasks
      .filter(item => item.status === Status.Done)
      .sort(this.sortDescPriority);
  }

  private sortDescPriority(a: Task, b: Task): number {
    return b.priority - a.priority;
  }
}
