import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { TaskListSummary } from './task-list-summary.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public taskLists: TaskListSummary[];
  public creatingTaskList: boolean;
  public newTaskListName: string;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getAll()
      .subscribe(taskLists => {
      this.taskLists = taskLists || [];
    });
  }

  public createNewList() {
    this.dashboardService.create(this.newTaskListName)
      .subscribe(taskList => {
        const summary = <TaskListSummary> {
          taskListId: taskList.id,
          name: taskList.name,
          total: 0,
          doneTotal: 0,
          inProgressTotal: 0,
          toDoTotal: 0,
        };
        this.taskLists.push(summary);
      })
  }
}
