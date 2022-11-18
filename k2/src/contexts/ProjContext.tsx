import { createContext, useContext, useState } from "react";
import { Project, Task, Timelog } from "../lib/interfaces";

interface ProviderProps {
    children?: React.ReactNode;
}
interface ProjectContext {
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

    return (
        <ProjectContext.Provider
            value={{
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
