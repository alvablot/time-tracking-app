import { createContext, useContext, useState } from "react";
import { Project, Task, Timelog, Invoice } from "../lib/interfaces";
import axios from "axios";
import { AxiosError } from "axios";
import { parse } from "date-format-parse";
const host: string = "http://localhost:3000/";
const Dates: Date[] = [];
const now: Date = new Date();
const thisTime: number = now.getTime();

interface ProviderProps {
    children?: React.ReactNode;
}
interface ProjectContext {
    fetchData: (type: string) => void;
    deletePost: (id: number, endpoint: string) => void;
    project: Project[];
    setProject: React.Dispatch<React.SetStateAction<Project[]>>;
    task: Task[];
    setTask: React.Dispatch<React.SetStateAction<Task[]>>;
    task_30: Task[];
    setTask_30: React.Dispatch<React.SetStateAction<Task[]>>;
    timelog: Timelog[];
    setTimelog: React.Dispatch<React.SetStateAction<Timelog[]>>;
    timelog_30: Timelog[];
    setTimelog_30: React.Dispatch<React.SetStateAction<Timelog[]>>;
    invoice: Invoice[];
    setInvoice: React.Dispatch<React.SetStateAction<Invoice[]>>;
    inputs: number[];
    setInputs: React.Dispatch<React.SetStateAction<number[]>>;
}

// del 1
const ProjectContext = createContext<ProjectContext | null>(null);

// del 2
export const ProjectProvider = ({ children }: ProviderProps) => {
    const [project, setProject] = useState<Project[]>([]);
    const [task, setTask] = useState<Task[]>([]);
    const [task_30, setTask_30] = useState<Task[]>([]);
    const [timelog_30, setTimelog_30] = useState<Timelog[]>([]);
    const [timelog, setTimelog] = useState<Timelog[]>([]);
    const [invoice, setInvoice] = useState<Invoice[]>([]);
    const [inputs, setInputs] = useState<number[]>([]);

    function get30(i: number, date: string): number {
        Dates[i] = parse(date, "YYYY-MM-DD");
        const time: number = Dates[i].getTime();
        const days: number =
            Math.round(thisTime / 1000 / 60 / 60 / 24) - Math.round(time / 1000 / 60 / 60 / 24);
        return days;
    }

    const fetchData = async (type: string): Promise<void> => {
        try {
            const response = await axios.get(`${host}${type}`);

            if (type === "projects") {
                const projects: Project[] = response.data;
                setProject(projects);
                projects.map((element, i) => {
                    setInputs((inputs) => [...inputs, element.price]);
                });
            }
            if (type === "tasks") {
                const tasks: Task[] = response.data;
                setTask(tasks);
                tasks.map((element, i) => {
                    const days: number = get30(i, element.date);
                    if (days < 31) {
                        setTask_30((task_30) => [...task_30, element]);
                    }
                });
            }
            if (type === "timelogs") {
                const timelogs: Timelog[] = response.data;
                setTimelog(timelogs);
                timelogs.map((element, i) => {
                    const days: number = get30(i, element.date);
                    if (days < 31) {
                        setTimelog_30((timelog_30) => [...timelog_30, element]);
                    }
                });
            }
            if (type === "invoices") {
                const invoice: Invoice[] = response.data;
                setInvoice(invoice);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error);
            } else {
                console.log(error);
            }
        }
    };

    async function deletePost(id: number, endpoint: string): Promise<void> {
        try {
            await axios.delete(`${host}${endpoint}/${id}`);
            const response = await axios.get(`${host}${endpoint}`);
            if (endpoint === "projects") {
                fetchData("projects");
            }
            if (endpoint === "timelogs") {
                const timelogs: Timelog[] = response.data;
                setTimelog(timelogs);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error);
            } else {
                console.log(error);
            }
        }
    }

    return (
        <ProjectContext.Provider
            value={{
                invoice,
                setInvoice,
                fetchData,
                deletePost,
                project,
                setProject,
                task,
                setTask,
                task_30,
                setTask_30,
                timelog,
                setTimelog,
                timelog_30,
                setTimelog_30,
                inputs,
                setInputs,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};
// del 3
export const useProjectContext = () => {
    const contextValue = useContext(ProjectContext);
    if (contextValue === null) {
        throw new Error("Hittade ej context");
    }
    return contextValue;
};
