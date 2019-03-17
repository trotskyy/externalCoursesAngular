import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  TASK_LIST_PATH = 'https://localhost:44357';

  constructor(private http: HttpClient) { }

  public getAll(taskListId: string): Observable<Task[]> {
    const all_path = `/taskList/${taskListId}/task`;
    return this.http.get<Task[]>(this.TASK_LIST_PATH + all_path);
  }

  public get(taskListId: string, taskId: string): Observable<Task> {
    const path = `/taskList/${taskListId}/task/${taskId}`;
    return this.http.get<Task>(this.TASK_LIST_PATH + path);
  }

  public create(task: Task): Observable<Task> {
    const path = `/taskList/${task.taskListId}/task`;
    const body = { task };
    return this.http.post<Task>(this.TASK_LIST_PATH + path, body );
  }
}
