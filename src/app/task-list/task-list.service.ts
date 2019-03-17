import { Injectable } from '@angular/core';
import { TaskList } from './task-list.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  TASK_LIST_PATH = 'https://localhost:44357/taskList';
  taskLists: TaskList[];

  constructor(private http: HttpClient) { }

  public getAll(): Observable<TaskList[]> {
    const all_path = '';
    return this.http.get<TaskList[]>(this.TASK_LIST_PATH + all_path);
  }

  public get(id: string): Observable<TaskList> {
    const path = `/${id}`;
    return this.http.get<TaskList>(this.TASK_LIST_PATH + path);
  }

  public create(taskList: TaskList): Observable<TaskList> {
    const body = { taskList };
    return this.http.post<TaskList>(this.TASK_LIST_PATH, body );
  }
}
