import { Component, OnInit } from '@angular/core';
import { TaskListService } from './task-list.service';
import { ActivatedRoute } from '@angular/router';
import { TaskList } from './task-list.model';
import { take, filter } from 'rxjs/operators';
import { Status } from '../task/status.emun';
import { Task } from '../task/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  taskList: TaskList;

  constructor(private taskListService: TaskListService, private router: ActivatedRoute) {}

  ngOnInit() {
    this.taskListService.get(this.router.snapshot.params['id'])
      .pipe(
        filter(taskList => !!taskList),
        take(1))
      .subscribe(taskList => this.taskList = taskList);
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
