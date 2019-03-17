import { Priority } from './priority.emun';
import { Status } from './status.emun';

export interface Task {
    id: string;
    name: string;
    priority: Priority;
    status: Status;
}
