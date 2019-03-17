import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Task } from './task.model';
import { PriorityName  } from './priority.emun';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {
  @Input()
  task: Task;

  panelOpenState: boolean;

  Priority = PriorityName;
}
