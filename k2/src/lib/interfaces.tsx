export interface Project {
    name: string;
    color: string;
    id: number;
    price: number;
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

export interface Invoice {
    id: number;
    status: string;
    due_date: string;
    amount: number;
    project: number;
    customer_name: string;
    created_date: string
}

