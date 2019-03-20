import { Injectable } from '@angular/core';
import { TaskList } from './task-list.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from '../core/services';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  TASK_LIST_PATH = 'https://localhost:44357/api/task-list';
  taskLists: TaskList[];

  constructor(private http: HttpClient, private handleErrorService: ErrorHandlingService) { }

  public getAll(): Observable<TaskList[]> {
    const all_path = '';
    return this.http.get<TaskList[]>(this.TASK_LIST_PATH + all_path).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  public get(id: number): Observable<TaskList> {
    const path = `/${id}`;
    return this.http.get<TaskList>(this.TASK_LIST_PATH + path).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  public create(taskList: TaskList): Observable<TaskList> {
    const body = { taskList };
    return this.http.post<TaskList>(this.TASK_LIST_PATH, body).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
