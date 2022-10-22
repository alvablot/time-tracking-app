import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useProjectContext } from "../context/ProjectContext";
const host = "http://localhost:3000/";

function AddTask(props) {
  const { tasks, setTasks } = useProjectContext();
  const [taskName, setTaskName] = useState("Task title");
  const [showNewTask, setShowNewTask] = useState("visible");
  const [showAddTask, setShowAddTask] = useState("hidden");
  async function postTask(projectId) {
    try {
      const response = await axios.post(`${host}tasks`, {
        projectId: projectId,
        title: taskName,
      });
      const { data } = response;
      console.log(response.data);
      setTasks([...tasks, data]);
    } catch (error) {
      //console.log(error);
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
