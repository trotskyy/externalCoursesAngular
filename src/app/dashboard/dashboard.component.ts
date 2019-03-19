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
          listName: taskList.name,
          doneCount: 0,
          inProgressCount: 0,
          toDoCount: 0,
        };
        this.taskLists.push(summary);
      })
  }

  // pay at attention at $event object passed in html
  public deleteTaskList(event: Event, taskList: TaskListSummary): void {
    // to not redirect to /task-list/:id
    event.stopPropagation();

    this.dashboardService.delete(taskList.taskListId).subscribe(() => {
      this.taskLists = this.taskLists.filter(tl => tl !== taskList);
    });
  }
}
