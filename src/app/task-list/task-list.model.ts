import { Task } from '../task';

export interface TaskList {
    taskListId: string;
    name: string;
    tasks: Task[];
}
