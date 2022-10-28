import { useState, useEffect, useContext } from "react";
import DateObject from "react-date-object";
import { useProjectContext } from "../context/ProjectContext";
import axios from "axios";
const host = "http://localhost:3000/";

function AddTask2(props) {
    const { trigger } = props;
    const { tasks, setTasks, projects } = useProjectContext();
    const [taskName, setTaskName] = useState("Task title");
    const [projectId, setProjectId] = useState(0);
    const [color, setColor] = useState("");
    const [showHideTaskInput, setShowHideTaskInput] = useState(props.hidden);
    const [showHideSelectTask, setShowHideSelectTask] = useState("hidden");
    const [createButton, setCreateButton] = useState("visible");

    async function postTask(projectId) {
        const date = new DateObject();
        if (taskName === "" || taskName === "Task name" || projectId < 1) return;
        try {
            const response = await axios.post(`${host}tasks`, {
                date: date.format("YYYY-MM-DD"), 
                projectId: projectId,
                title: taskName,
                start: 0,
                end: 0,
                timeElapsed: 0,
                active: false,
            });
            const { data } = response;
            setTasks([...tasks, data]);
        } catch (error) {
            console.log(error);
        }
    }
    function viewInput(element) {
        if (element === "create") {
            setShowHideTaskInput("visible");
            setCreateButton("hidden");
            setShowHideSelectTask("select-container");
        }
        if (element === "abort") {
            setShowHideTaskInput("hidden");
            setCreateButton("visible");
            setTaskName("Task title");
        }
    }
    useEffect(() => {
        viewInput("abort");
    }, [trigger]);
    return (
        <div>
            <div className={showHideTaskInput}>
                <br />
                Choose a project to bind to your task
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
                                <span><strong>{project.name}</strong></span>
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
    );
}
export default AddTask2;
