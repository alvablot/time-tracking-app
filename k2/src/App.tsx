import { useState, useEffect, Children } from "react";
import fetchDataComp from "./lib/axios";
import { Project, Task, Timelog } from "./lib/interfaces";
import { useProjectContext } from "./contexts/ProjContext";
import "./App.css";
import axios from "axios";
const host = "http://localhost:3000/";

function App() {
    const { project, setProject, task, setTask, timelog, setTimelog } = useProjectContext();

    async function fetchData(type: string): Promise<void> {
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
    }

    useEffect(() => {
        fetchData("projects");
        fetchData("tasks");
        fetchData("timelogs");
    }, []);

    return (
        <div className="App">
            <h2>Projects</h2>
            {project.map((element) => {
                return (
                    <div key={`project_${element.id}`} className="container">
                        <div key={`name_${element.id}`}>{element.name}</div>
                        <div key={`color_${element.id}`}>{element.color}</div>
                        <div key={`id_${element.id}`}>{element.id}</div>
                    </div>
                );
            })}
            <h2>Tasks</h2>
            {task.map((element) => {
                return (
                    <div key={`taks_${element.id}`} className="container">
                        <div key={`date${element.id}`}>{element.date}</div>
                        <div key={`projectId${element.id}`}>{element.projectId}</div>
                        <div key={`title${element.id}`}>{element.title}</div>
                        <div key={`start${element.id}`}>{element.start}</div>
                        <div key={`end${element.id}`}>{element.end}</div>
                        <div key={`timeElapsed${element.id}`}>{element.timeElapsed}</div>
                        <div key={`active${element.id}`}>{element.active}</div>
                        <div key={`task_id_${element.id}`}>{element.id}</div>
                    </div>
                );
            })}
            <h2>Timelogs</h2>
            {timelog.map((element) => {
                return (
                    <div key={`timelog_${element.id}`} className="container">
                        <div key={`taskId${element.id}`}>{element.taskId}</div>
                        <div key={`timeElapsed${element.id}`}>{element.timeElapsed}</div>
                        <div key={`date2${element.id}`}>{element.date}</div>
                        <div key={`timelog_id_${element.id}`}>{element.id}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default App;
