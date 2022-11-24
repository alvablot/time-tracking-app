import { useState, useEffect, useContext } from "react";
import DateObject from "react-date-object";
import axios from "axios";
import { useProjectContext } from "../context/ProjectContext";
const host = "http://localhost:3000/";

function AddTask(props) {
    const { tasks, setTasks } = useProjectContext();
    const [taskName, setTaskName] = useState("Task title");
    const [showNewTask, setShowNewTask] = useState("visible");
    const [showAddTask, setShowAddTask] = useState("hidden");
    async function postTask(projectId) {
        const date = new DateObject();
        if (taskName === "" || taskName === "Task title" || projectId < 1) return;
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
            console.log(response.data);
            setTasks([...tasks, data]);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <button
                className={showNewTask}
                id="add-task-button"
                onClick={() => {
                    setShowAddTask("visible");
                    setShowNewTask("hidden");
                }}
            >
                New task
            </button>

            <div id="task-input" className={showAddTask}>
                <b>Title</b>
                <br />
                <input
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
                        postTask(props.projectId);
                    }}
                >
                    Add task
                </button>
                <button
                    onClick={() => {
                        setShowAddTask("hidden");
                        setShowNewTask("visible");
                        setTaskName("Task name");
                    }}
                >
                    Abort
                </button>
            </div>
        </div>
    );
}
export default AddTask;
