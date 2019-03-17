import { Priority } from './priority.emun';
import { Status } from './status.emun';

export interface Task {
    taskId: string;
    taskListId: string;
    name: string;
    description: string;
    date: Date;
    priority: Priority;
    status: Status;
}
