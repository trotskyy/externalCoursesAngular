import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Task } from '../../task/task.model';
import { StatusName } from '../../task/status.emun';
import { Priority as PriorityEnum } from '../../task/priority.emun';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {

  public Status = StatusName;
  public Priority = PriorityEnum;

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task
  ) { }

  public onNoClick(): void {
    this.dialogRef.close(this.task);
  }

  public onSaveCLick(): void {
    this.dialogRef.close(this.task);
  }

  public onCloseCLick(): void {
    this.dialogRef.close();
  }
}
