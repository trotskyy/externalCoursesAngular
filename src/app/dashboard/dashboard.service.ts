import { Injectable } from '@angular/core';
import { TaskListSummary } from './task-list-summary.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlingService } from '../core/services';
import { catchError, map } from 'rxjs/operators';
import { TaskList } from '../task-list/task-list.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  PATH = 'https://localhost:44357/api/task-list/summary';

  constructor(private http: HttpClient, private errorHandlingSerivce: ErrorHandlingService) {}

  public getAll(): Observable<TaskListSummary[]> {
    return this.http.get<TaskListSummary[]>(this.PATH)
      .pipe(
        catchError(this.errorHandlingSerivce.handleError)
      );
  }

  public create(taskListName: string): Observable<TaskList> {
    return this.http.post<TaskList>('https://localhost:44357/api/task-list', { name: taskListName })
      .pipe(
        catchError(this.errorHandlingSerivce.handleError)
      );
  }

  public delete(taskListId: number): Observable<{}> {
    return this.http.delete(`https://localhost:44357/api/task-list/${taskListId}`)
      .pipe(
        catchError(this.errorHandlingSerivce.handleError)
      );
  }
}
