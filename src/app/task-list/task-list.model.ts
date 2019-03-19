import { Task } from '../task';

export interface TaskList {
    id: number;
    name: string;
    tasks: Task[];
}
