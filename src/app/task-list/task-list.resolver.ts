import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TaskList } from './task-list.model';
import { Observable } from 'rxjs';
import { TaskListService } from './task-list.service';

@Injectable()
export class TaskListResolver implements Resolve<TaskList> {

    constructor(private taskListService: TaskListService) {
    }

    public resolve(route: ActivatedRouteSnapshot): Observable<TaskList> {
        console.log(route.params['id']);
        return this.taskListService.get(+route.params['id']);
    }
}
