import { Component, OnInit } from '@angular/core';
import { TaskListService } from './task-list.service';
import { TaskService } from '../task/task.service';
import { ActivatedRoute } from '@angular/router';
import { TaskList } from './task-list.model';
import { filter } from 'rxjs/operators';
import { Status } from '../task/status.emun';
import { Task } from '../task/task.model';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from './new-task/new-task/new-task.component';

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
    const dialogRef = this.dialog.open(NewTaskComponent, {
      height: '600px',
      width: '800px',
      data: this.taskList.id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.taskService.create(result)
        .subscribe((task: Task) => {
          this.taskList.tasks.push(task);
        });
    });
  }

  public onEditTask(task: Task): void {

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
