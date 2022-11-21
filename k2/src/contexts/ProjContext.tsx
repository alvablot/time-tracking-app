import { createContext, useContext, useState } from "react";
import { Project, Task, Timelog } from "../lib/interfaces";
import axios from "axios";
const host = "http://localhost:3000/";

interface ProviderProps {
    children?: React.ReactNode;
}
interface ProjectContext {
    fetchData: React.Dispatch<React.SetStateAction<any>>;
    project: Project[];
    setProject: React.Dispatch<React.SetStateAction<Project[]>>;
    task: Task[];
    setTask: React.Dispatch<React.SetStateAction<Task[]>>;
    timelog: Timelog[];
    setTimelog: React.Dispatch<React.SetStateAction<Timelog[]>>;
}

// del 1
const ProjectContext = createContext<ProjectContext | null>(null);

// del 2
export const ProjectProvider = ({ children }: ProviderProps) => {
    const [project, setProject] = useState<Project[]>([]);
    const [task, setTask] = useState<Task[]>([]);
    const [timelog, setTimelog] = useState<Timelog[]>([]);

    const fetchData = async (type: string): Promise<void> => {
        const response = await axios.get(`${host}${type}`);

        if (type === "projects") {
            const projects: Project[] = response.data;
            setProject(projects);
        }
        if (type === "tasks") {
            const tasks: Task[] = response.data;
            setTask(tasks);
        }
        if (type === "timelogs") {
            const timelogs: Timelog[] = response.data;
            setTimelog(timelogs);
        }
    };

    return (
        <ProjectContext.Provider
            value={{
                fetchData,
                project,
                setProject,
                task,
                setTask,
                timelog,
                setTimelog,
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
