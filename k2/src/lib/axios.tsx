import axios from "axios";
import { Project, Task, Timelog } from "./interfaces";
const host = "http://localhost:3000/";

async function fetchData(type: string): Promise<unknown> {
    const response = await axios.get(`${host}${type}`);
    if (type === "projects") {
        const projects: Project[] = response.data;
        console.log(projects);
        return projects;
    }
    if (type === "tasks") {
        const tasks: Task[] = response.data;
        console.log(tasks);
        return tasks;
    }
    if (type === "timelogs") {
        const timelogs: Timelog[] = response.data;
        console.log(timelogs);
        return timelogs;
    }
}

export default fetchData;
