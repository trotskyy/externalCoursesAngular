import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { TaskListSummary } from './task-list-summary.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public taskLists: TaskListSummary[];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getAll().pipe(
      take(1)
    ).subscribe(taskLists => {
      this.taskLists = taskLists;
    });
  }
}
