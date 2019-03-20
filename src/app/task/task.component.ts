import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Task } from './task.model';
import { PriorityName  } from './priority.emun';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {

  // parent component passes task in html mark-up
  // <app-task [task]="task" ...>
  @Input()
  public task: Task;

  // parent component subscribes to output in mark-up
  // <app-task (editTask)="onEditTask($event)" ...>
  // $event - is a special vaiable to represent event payload. in this case - Task object
  // look at different types of variable creation
  @Output()
  public editTask: EventEmitter<Task>;
  
  // look at different types of variable creation
  @Output()
  public deleteTask = new EventEmitter<Task>()

  public panelOpenState: boolean;
  public Priority = PriorityName;

  constructor() {
    this.editTask = new EventEmitter<Task>();
  }

  public onEditClick(event: Event) {
    // without stopProp..() drag will occur
    event.stopPropagation();
    this.editTask.emit(this.task);
  }

  public onDeleteClick(event: Event): void {
    event.stopPropagation();
    this.deleteTask.emit(this.task);
  }
}
