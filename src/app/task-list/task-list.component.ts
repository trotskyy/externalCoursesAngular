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

  constructor(
    private taskListService: TaskListService,
    private taskService: TaskService,
    private router: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.taskListService
      .get(this.router.snapshot.params['id'])
      .pipe(
        filter(taskList => !!taskList)
      )
      .subscribe(taskList => {
        this.taskList = taskList;
        console.log(taskList);
      });
  }

  openNewTaskDialog() {
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

  getToDo() {
    return this.taskList.tasks
      .filter(item => item.status === Status.ToDo)
      .sort(this.sortDescPriority);
  }

  getInProgress() {
    return this.taskList.tasks
      .filter(item => item.status === Status.InProgress)
      .sort(this.sortDescPriority);
  }

  getDone() {
    return this.taskList.tasks
      .filter(item => item.status === Status.Done)
      .sort(this.sortDescPriority);
  }

  private sortDescPriority(a: Task, b: Task) {
    return b.priority - a.priority;
  }
}
