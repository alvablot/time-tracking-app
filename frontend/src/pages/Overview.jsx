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
    const [projects, setProjects] = useState([]);
    const [projectId, setProjectId] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [timelogs, setTimelogs] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [color, setColor] = useState("");
    const [taskName, setTaskName] = useState("Task title");
    const [showHideTaskInput, setShowHideTaskInput] = useState("hidden");
    const [showHideSelectTask, setShowHideSelectTask] = useState("hidden");
    const [showHideProjects, setShowHideProjects] = useState("visible");
    const [showHideTasks, setShowHideTasks] = useState("hidden");
    const [showHideTimelogs, setShowHideTimelogs] = useState("hidden");
    const [showHideProjectInput, setShowHideProjectInput] = useState("hidden");
    const [createButton, setCreateButton] = useState("visible");

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
            //setErrorMsg(`${error.response.data.status}: ${error.response.data.message}`);
            console.log(error);
        }
    }
    async function postProject(e) {
        let id = new Date();
        id = Math.round(id.getTime() * (Math.random() * 666));
        try {
            const response = await axios.post(`${host}projects`, {
                id: id,
                name: projectName,
                color: color,
            });
            getData("projects");
            setProjectId(id);
        } catch (error) {
            console.log(error);
        }
    }
    async function postTask(projectId) {
        let id = new Date();
        id = Math.round(id.getTime() * (Math.random() * 666));
        try {
            const response = await axios.post(`${host}tasks`, {
                id: id,
                projectId: projectId,
                title: taskName,
            });
            getData("tasks");
        } catch (error) {
            console.log(error);
        }
    }
    async function viewInput(element) {
        if (element === "create") {
            setShowHideProjectInput("visible");
            setCreateButton("hidden");
            setShowHideTaskInput("visible");
            setCreateButton("hidden");
            setShowHideSelectTask("select-container");
        }
        if (element === "abort") {
            setShowHideProjectInput("hidden");
            setCreateButton("visible");
            setShowHideTaskInput("hidden");
            setCreateButton("visible");
            setTaskName("Task name");
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
    useEffect(() => {
        //console.log(projects);
    }, [projects]);
    useEffect(() => {
        getData("projects");
    }, [showHideTaskInput]);
    return (
        <div>
            <h1>
                <a href="/overview">Overview</a>
            </h1>
            <div className={showHideProjects}>
                <div>
                    <div className={showHideProjectInput}>
                        Name
                        <br />
                        <input
                            onChange={(e) => setProjectName(e.target.value)}
                            name="name"
                            type="text"
                            style={{ borderColor: color }}
                            value={projectName}
                        />
                        <br />
                        <input
                            onChange={(e) => setColor(e.target.value)}
                            name="color"
                            type="hidden"
                            value={color}
                        />
                        <div
                            className="color-cube blue"
                            onClick={() => {
                                setColor("#5650ff");
                            }}
                        ></div>
                        <div
                            className="color-cube purple"
                            onClick={() => {
                                setColor("#af3bee");
                            }}
                        ></div>
                        <div
                            className="color-cube yellow"
                            onClick={() => {
                                setColor("#e3da3b");
                            }}
                        ></div>
                        <div
                            className="color-cube green"
                            onClick={() => {
                                setColor("#34dc3a");
                            }}
                        ></div>
                        <div
                            className="color-cube red"
                            onClick={() => {
                                setColor("#fb3a64");
                            }}
                        ></div>
                        <div
                            className="color-cube pink"
                            onClick={() => {
                                setColor("#fc83cc");
                            }}
                        ></div>
                        <div
                            className="color-cube orange"
                            onClick={() => {
                                setColor("#ffb651");
                            }}
                        ></div>
                        <br />
                        <button onClick={postProject}>Add project</button>
                        <button
                            onClick={() => {
                                viewInput("abort");
                            }}
                        >
                            Abort
                        </button>
                    </div>
                    <button
                        className={createButton}
                        onClick={() => {
                            viewInput("create");
                        }}
                    >
                        Create new project
                    </button>
                </div>

                {/* <AddProject getData={getData} id="add-project" />*/}
            </div>
            <div className={showHideTasks}>
                <div>
                    <div className={showHideTaskInput}>
                        <br />
                        Choose project
                        <div className="task-container">
                            {projects.map((project) => {
                                return (
                                    <div
                                        className={showHideSelectTask}
                                        key={`proj_${project.id}`}
                                        style={{ background: project.color }}
                                        onClick={(e) => {
                                            setColor(project.color);
                                            setProjectId(project.id);
                                        }}
                                    >
                                        <span>Name: {project.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <input
                            style={{ borderColor: color }}
                            type="text"
                            onChange={(e) => {
                                setTaskName(e.target.value);
                            }}
                            onFocus={() => {
                                setTaskName("");
                            }}
                            value={taskName}
                        />
                        <br />
                        <button
                            onClick={() => {
                                postTask(projectId);
                            }}
                        >
                            Add task
                        </button>
                        <button
                            onClick={() => {
                                viewInput("abort");
                            }}
                        >
                            Abort
                        </button>
                    </div>
                    <button
                        className={createButton}
                        onClick={() => {
                            viewInput("create");
                        }}
                    >
                        Create new task
                    </button>
                </div>
                {/* <AddTask2 hidden={"hidden"} getData={getData} id="add-project" />*/}
            </div>
            <button
                onClick={() => {
                    getData("projects");
                    view("projects");
                    viewInput("abort");
                }}
            >
                Projects
            </button>
            <button
                onClick={() => {
                    getData("tasks");
                    viewInput("abort");
                    view("tasks");
                }}
            >
                Tasks
            </button>
            <button
                onClick={() => {
                    getData("timelogs");
                    view("timelogs");
                    viewInput("abort");
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
