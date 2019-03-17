import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Task } from '../../../task/task.model';
import { Status as StatusEnum } from '../../../task/status.emun';
import { Priority as PriorityEnum } from '../../../task/priority.emun';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  task: Task = <Task>{};

  Status = StatusEnum;
  Priority = PriorityEnum;

  constructor(
    public dialogRef: MatDialogRef<NewTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public taskListId: string
  ) { }

  onNoClick(): void {
    this.dialogRef.close(this.task);
  }

  onSaveCLick() {
    this.task.taskListId = this.taskListId;
    this.dialogRef.close(this.task);
  }

  onCloseCLick() {
    this.dialogRef.close();
  }
}
