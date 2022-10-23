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
    const { projects, setProjects, tasks, setTasks, timelogs, setTimelogs } = useProjectContext();
    //const { tasks, setTasks } = useProjectContext();
    //const { timelogs, setTimelogs } = useProjectContext();
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
            //console.log(id);
            await getData(element);
        } catch (error) {
            //setErrorMsg(`${error.response.data.status}: ${error.response.data.message}`);
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
                <a href="/overview">Overview</a>
            </h1>

            <div className={showHideProjects}>
                <AddProject trigger={trigger} getData={getData} id="add-project" />
            </div>
            <div className={showHideTasks}>
                <AddTask2 trigger={trigger} getData={getData} id="add-project" />
            </div>

            <button
                onClick={() => {
                    getData("projects");
                    view("projects");
                    setTrigger({});
                }}
            >
                Projects
            </button>
            <button
                onClick={() => {
                    getData("tasks");
                    getData("projects");
                    view("tasks");
                    setTrigger({});
                }}
            >
                Tasks
            </button>
            <button
                onClick={() => {
                    getData("timelogs");
                    view("timelogs");
                }}
            >
                Timelogs
            </button>
            <div className={showHideProjects}>
                {projects.map((project) => {
                    return (
                        <div
                            key={`proj_${project.id}`}
                            className="project-container"
                            style={{ background: project.color }}
                        >
                            <button
                                onClick={() => {
                                    deleteObject("projects", project.id);
                                }}
                            >
                                x
                            </button>
                            <div>Id: {project.id}</div>
                            <div>Name: {project.name}</div>
                            <div>Color: {project.color}</div>
                            <AddTask getData={getData} projectId={project.id} id="add-task" />
                        </div>
                    );
                })}
            </div>
            <div className={showHideTasks}>
                {tasks.map((task) => {
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
                            <div>Id: {task.id}</div>
                            <div>ProjId: {task.projectId}</div>
                            <div>Title: {task.title}</div>
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
            <div className={showHideTimelogs}>
                {timelogs.map((timelog) => {
                    return (
                        <div key={`time_${timelog.id}`} className="project-container time">
                            <div>Id: {timelog.id}</div>
                            <div>TaskId: {timelog.taskId}</div>
                            <div>Start: {timelog.start}</div>
                            <div>End: {timelog.end}</div>
                            <button
                                onClick={() => {
                                    deleteObject("timelogs", timelog.id);
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
