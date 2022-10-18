import { React, useState, useEffect } from "react";
import AddProject from "../components/AddProject";
import AddTask from "../components/AddTask";
import Navbar from "../components/Navbar";
import { useProjectContext } from "../context/ProjectContext";

function Overview() {
    const providerValue = useProjectContext();
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [timelogs, setTimelogs] = useState([]);

    async function getData(type) {
        if (type === "projects") {
            const data = await providerValue.getProjects();
            setProjects(data);
        }
        if (type === "tasks") {
            const data = await providerValue.getTasks();
            setTasks(data);
        }
        if (type === "timelogs") {
            const data = await providerValue.getTimelogs();
            setTimelogs(data);
        }
    }
/*
    useEffect(() => {
        console.log("projects");
        console.log(projects);
    }, [projects]);
    
    useEffect(() => {
        console.log("tasks");
        console.log(tasks);
    }, [tasks]);

    useEffect(() => {
        console.log("timelogs");
        console.log(timelogs);
    }, [timelogs]);
*/
    return (
        <div>
            <h1><a href="/overview">Overview</a></h1>
            <AddProject id="add-project" />
            <AddTask id="add-task" />
            <button
                onClick={() => {
                    getData("projects");
                }}
            >
                Projekt
            </button>
            <button
                onClick={() => {
                    getData("tasks");
                }}
            >
                Tasks
            </button>
            <button
                onClick={() => {
                    getData("timelogs");
                }}
            >
                Timelogs
            </button>
            {projects.map((project) => {
                return (
                    <div key={`proj_${project.id}`} className="project-container">
                        <div>Id: {project.id}</div>
                        <div>Name: {project.name}</div>
                        <div>Color: {project.color}</div>
                    </div>
                );
            })}
            {tasks.map((task) => {
                return (
                    <div key={`task_${task.id}`} className="project-container task">
                        <div>Id: {task.id}</div>
                        <div>ProjId: {task.projectId}</div>
                        <div>Title: {task.title}</div>
                    </div>
                );
            })}
            {timelogs.map((timelog) => {
                return (
                    <div key={`time_${timelog.id}`} className="project-container time">
                        <div>Id: {timelog.id}</div>
                        <div>TaskId: {timelog.taskId}</div>
                        <div>Start: {timelog.start}</div>
                        <div>End: {timelog.end}</div>
                    </div>
                );
            })}
            <Navbar />
        </div>
    );
}

export default Overview;
