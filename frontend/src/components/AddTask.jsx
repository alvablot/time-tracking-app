import { useState, useEffect, useContext } from "react";
import axios from "axios";
const host = "http://localhost:3000/";

function AddTask(props) {
    const [taskName, setTaskName] = useState("Task title");
    const [showNewTask, setShowNewTask] = useState("visible");
    const [showAddTask, setShowAddTask] = useState("hidden");
    async function postTask(projectId) {
        let id = new Date();
        id = Math.round(id.getTime() * (Math.random() * 666));
        try {
            const response = await axios.post(`${host}tasks`, {
                id: id,
                projectId: projectId,
                title: taskName,
            });
            props.getData("projects");
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
                <b>Title</b><br />
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
