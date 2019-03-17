import { Injectable } from '@angular/core';
import { TaskListSummary } from './task-list-summary.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  PATH = 'https://localhost:44357/taskList/summary';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<TaskListSummary[]> {
    return this.http.get<TaskListSummary[]>(this.PATH);
  }
}
