import { Task } from '../task';

export interface TaskList {
    id: string;
    name: string;
    tasks: Task[];
}
