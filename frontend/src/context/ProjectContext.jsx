import { createContext, useContext } from "react";
import axios from "axios";

const ProjectContext = createContext();
const host = "http://localhost:3000/";
export function ProjectProvider(props) {
    async function getProjects() {
        try {
            const response = await axios.get(`${host}projects/`);
            const data = response.data;
            return data;
        } catch (error) {}
    }

    async function getTasks() {
        try {
            const response = await axios.get(`${host}tasks/`);
            const data = response.data;
            return data;
        } catch (error) {}
    }

    async function getTimelogs() {
        try {
            const response = await axios.get(`${host}timelogs/`);
            const data = response.data;
            return data;
        } catch (error) {}
    }

    const providerValue = {
        getProjects,
        getTasks,
        getTimelogs,
    };
    return (
        <ProjectContext.Provider value={providerValue}>{props.children}</ProjectContext.Provider>
    );
}

export function useProjectContext() {
    const providerValue = useContext(ProjectContext);
    return providerValue;
}
