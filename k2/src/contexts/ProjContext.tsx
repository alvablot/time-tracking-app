import { createContext, useContext, useState } from "react";
import { Project, Task, Timelog, Invoice } from "../lib/interfaces";
import axios from "axios";
import { parse } from "date-format-parse";
const now: Date = new Date();
const thisTime: number = now.getTime();
const host: string = "http://localhost:3000/";

interface ProviderProps {
    children?: React.ReactNode;
}
interface ProjectContext {
    get30B: (date: string) => number;
    fetchData: (type: string) => void;
    showEmo: (type: string) => void;
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
    emo: string;
    setEmo: React.Dispatch<React.SetStateAction<string>>;
    hidden: string;
    setHidden: React.Dispatch<React.SetStateAction<string>>;

    showMenu: string;
    setShowMenu: React.Dispatch<React.SetStateAction<string>>;

    showHideContent: string[];
    setShowHideContent: React.Dispatch<React.SetStateAction<string[]>>;
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
    const [emo, setEmo] = useState<string>("");
    const [hidden, setHidden] = useState<string>("none");
    const [showHideContent, setShowHideContent] = useState<string[]>([
        "block",
        "block",
        "block",
        "block",
        "block",
        "block",
        "block",
        "block",
        "block",
    ]);

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
            }
            if (type === "timelogs") {
                const timelogs: Timelog[] = response.data;
                setTimelog(timelogs);
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
        if (!confirm(`Are you sure you want to delete ${endpoint} post ${id} `)) {
            return;
        }
        try {
            await axios.delete(`${host}${endpoint}/${id}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error);
            } else {
                console.log(error);
            }
        }
    }
    function showEmo(type: string): void {
        setEmo(type);
        setHidden("block");
        setTimeout(() => {
            setEmo("");
            setHidden("none");
        }, 2000);
    }

    function get30B(date: string): number {
        const dates: Date = parse(date, "YYYY-MM-DD");
        const time: number = dates.getTime();
        const days: number =
            Math.round(thisTime / 1000 / 60 / 60 / 24) - Math.round(time / 1000 / 60 / 60 / 24);
        return days;
    }


    const [showMenu, setShowMenu] = useState<string>("none");
    return (
        <ProjectContext.Provider
            value={{
                invoice,
                showEmo,
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
                emo,
                setEmo,
                hidden,
                setHidden,   
                showMenu,
                setShowMenu,
                get30B,
                showHideContent,
                setShowHideContent,
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
