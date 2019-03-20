import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  TASK_LIST_PATH = 'https://localhost:44357/api/task';

  constructor(private http: HttpClient) { }

  public getAll(taskListId: string): Observable<Task[]> {
    const all_path = `/list-id?taskListId=${taskListId}`;
    return this.http.get<Task[]>(this.TASK_LIST_PATH + all_path);
  }

  public get(taskId: string): Observable<Task> {
    const path = `/${taskId}`;
    return this.http.get<Task>(this.TASK_LIST_PATH + path);
  }

  public create(task: Task): Observable<Task> {
    const body = {...task, status: <number>task.status, priority: <number>task.priority };
    return this.http.post<Task>(this.TASK_LIST_PATH, body );
  }

  public delete(taskId: number): Observable<Task> {
    const path = `/${taskId}`;
    return this.http.delete<Task>(this.TASK_LIST_PATH + path);
  }

  public update(taskId: number, task: Task): Observable<{}> {
    return this.http.put(this.TASK_LIST_PATH + `/${taskId}`, task);
  }
}
