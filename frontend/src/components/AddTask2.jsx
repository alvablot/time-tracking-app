import { useState, useEffect, useContext } from "react";
import { useProjectContext } from "../context/ProjectContext";
import axios from "axios";
const host = "http://localhost:3000/";

function AddTask2(props) {
    const providerValue = useProjectContext();
    const [taskName, setTaskName] = useState("Task title");
    const [projects, setProjects] = useState([]);
    const [projectId, setProjectId] = useState(0);
    const [color, setColor] = useState("");
    const [showHideTaskInput, setShowHideTaskInput] = useState(props.hidden);
    const [showHideSelectTask, setShowHideSelectTask] = useState("hidden");
    const [createButton, setCreateButton] = useState("visible");
    let [errorMsg, setErrorMsg] = useState("");
    async function postTask(projectId) {
        let id = new Date();
        id = Math.round(id.getTime() * (Math.random() * 666));
        try {
            const response = await axios.post(`${host}tasks`, {
                id: id,
                projectId: projectId,
                title: taskName,
            });
        } catch (error) {
            console.log(error);
        }
    }

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

    async function viewInput(element) {
        getData("projects");
        if (element === "create") {
            setShowHideTaskInput("visible");
            setCreateButton("hidden");
            setShowHideSelectTask("select-container");
        }
        if (element === "abort") {
            setShowHideTaskInput("hidden");
            setCreateButton("visible");
            setTaskName("Task name");
        }
    }
    useEffect(() => {
        //console.log(projects);
    }, [projects]);
    useEffect(() => {
        getData("projects");
    }, [showHideTaskInput]);
    return (
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
                        /*postTask(projectId);*/
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
    );
}
export default AddTask2;
