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

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getAll()
      .subscribe(taskLists => {
      this.taskLists = taskLists;
    });
  }

  public createNewList() {
    this.creatingTaskList = true;
  }
}
