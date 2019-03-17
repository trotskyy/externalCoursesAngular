import { Injectable } from '@angular/core';
import { TaskList } from './task-list.model';
import { Priority, Status } from '../task';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  private static mockData: TaskList[] = [
    {
      id: '1',
      name: 'Home',
      tasks: [
        {
          id: 'task1',
          name: 'Task 1',
          priority: Priority.High,
          status: Status.ToDO
        },
        {
          id: 'task2',
          name: 'Task 2',
          priority: Priority.High,
          status: Status.InProgress
        },
        {
          id: 'task3',
          name: 'Task 3',
          priority: Priority.Low,
          status: Status.Done
        }
      ]
    }
  ];

  constructor() { }

  public get(id: string): Observable<TaskList> {
    console.log(id);
    console.log(TaskListService.mockData);
    console.log(TaskListService.mockData.find(taskList => taskList.id === id));
    return of(TaskListService.mockData.find(taskList => taskList.id === id));
  }

  public create(taskList: TaskList): Observable<TaskList> {
    taskList.id = 'jadfubsdf';
    TaskListService.mockData.push(taskList);
    return of(taskList);
  }
}
