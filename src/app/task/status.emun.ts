export enum Status {
    ToDo = 1,
    InProgress = 2,
    Done = 3,
}

export const StatusName = {
    [Status.Done]: 'Done',
    [Status.InProgress]: 'In Progress',
    [Status.ToDo]: 'To Do'
}
