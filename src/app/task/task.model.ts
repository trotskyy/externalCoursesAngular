import { Priority } from './priority.emun';
import { Status } from './status.emun';

export interface Task {
    id: string;
    name: string;
    date: Date;
    priority: Priority;
    status: Status;
}
