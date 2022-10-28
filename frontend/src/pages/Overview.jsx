import { React, useState, useEffect, Children } from "react";
import AddProject from "../components/AddProject";
import AddTask from "../components/AddTask";
import AddTask2 from "../components/AddTask2";
import Navbar from "../components/Navbar";
import { useProjectContext } from "../context/ProjectContext";
import axios from "axios";
const host = "http://localhost:3000/";

function Overview() {
    const providerValue = useProjectContext();
    const { projects, setProjects, tasks, setTasks, setTimelogs } = useProjectContext();
    const [showHideProjects, setShowHideProjects] = useState("visible");
    const [showHideTasks, setShowHideTasks] = useState("hidden");
    const [showHideTimelogs, setShowHideTimelogs] = useState("hidden");
    const [trigger, setTrigger] = useState(null);

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

    async function deleteObject(element, id) {
        try {
            const response = await axios.delete(`${host}${element}/${id}`);
            await getData(element);
        } catch (error) {
            console.log(error);
        }
    }
    function view(element) {
        if (element === "projects") {
            setShowHideProjects("visible");
            setShowHideTasks("hidden");
            setShowHideTimelogs("hidden");
        }
        if (element === "tasks") {
            setShowHideProjects("hidden");
            setShowHideTasks("visible");
            setShowHideTimelogs("hidden");
        }
        if (element === "timelogs") {
            setShowHideProjects("hidden");
            setShowHideTasks("hidden");
            setShowHideTimelogs("visible");
        }
    }
    useEffect(() => {
        getData("projects");
    }, [showHideProjects]);
    return (
        <div>
            <h1>
                Overview
            </h1>

            <div className={showHideProjects}>
                <AddProject trigger={trigger} getData={getData} id="add-project" />
            </div>
            <div className={showHideTasks}>
                <AddTask2 trigger={trigger} getData={getData} id="add-project" />
            </div>

            <button
                className="tab-button"
                onClick={() => {
                    getData("projects");
                    view("projects");
                    setTrigger({});
                }}
            >
                Projects
            </button>
            <button
                className="tab-button"
                onClick={() => {
                    getData("tasks");
                    getData("projects");
                    view("tasks");
                    setTrigger({});
                }}
            >
                Tasks
            </button>
            <div className={showHideProjects}>
                <h2>Projects</h2>
                {projects.map((project) => {
                    return (
                        <div
                            key={`proj_${project.id}`}
                            className="project-container"
                            style={{ background: project.color }}
                        >
                            <div>
                                <b>{project.name}</b>
                            </div>
                            <button
                                onClick={() => {
                                    deleteObject("projects", project.id);
                                }}
                            >
                                x
                            </button>

                            <AddTask getData={getData} projectId={project.id} id="add-task" />
                        </div>
                    );
                })}
            </div>
            <div className={showHideTasks}>
            <h2>Tasks</h2>
                {tasks.map((task) => {
                    const project = projects.find((project) => project.id === task.projectId);
                    let color;
                    let hej;
                    projects.map((project) => {
                        project.id === task.projectId ? (color = project.color) : (hej = null);
                    });
                    return (
                        <div
                            key={`task_${task.id}`}
                            className="project-container task"
                            style={{ background: color }}
                        >
                            <div>
                                <b>Project: {project.name}</b>
                            </div>
                            <div>
                                <b>Task: {task.title}</b>
                            </div>
                            <button
                                onClick={() => {
                                    deleteObject("tasks", task.id);
                                }}
                            >
                                x
                            </button>
                        </div>
                    );
                })}
            </div>
            <Navbar />
        </div>
    );
}

export default Overview;
