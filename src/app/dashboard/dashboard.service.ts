import { Injectable } from '@angular/core';
import { TaskListSummary } from './task-list-summary.model';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  public getAll(): Observable<TaskListSummary[]> {
    return of([
      {
        id: '1',
        listName: 'Home',
        doneTotal: 666,
        inProgressTotal: 777,
        todoTotal: 0
      },
      {
        id: '2',
        listName: 'Hom2 2 3e',
        doneTotal: 666,
        inProgressTotal: 777,
        todoTotal: 0
      }
    ]);
  }
}
