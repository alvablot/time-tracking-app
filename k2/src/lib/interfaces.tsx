export interface Project {
    name: string;
    color: string;
    id: number;
}
export interface Task {
    date: string;
    projectId: number;
    title: string;
    start: number;
    end: number;
    timeElapsed: number;
    active: boolean;
    id: number;
}
export interface Timelog {
    taskId: number;
    timeElapsed: string;
    date: string;
    id: number;
}
