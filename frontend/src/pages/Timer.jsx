import { React, useState, useEffect, Children } from "react";
import { useProjectContext } from "../context/ProjectContext";
import Navbar from "../components/Navbar";
import axios from "axios";
const host = "http://localhost:3000/";

function Timer() {
    const providerValue = useProjectContext();
    const { projects, setProjects, tasks, setTasks, timelogs, setTimelogs } = useProjectContext();
    const [dateTime, setDateTime] = useState(0);

    function getTime(data) {
        const now = new Date();
        const date = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        //const time = `${hours}:${minutes}:${seconds}`
        const time = now.getTime();
        if (data === "time") return time;
        if (data === "seconds") return seconds;
        if (data === "date") return date;
    }

    //const [buttonText, setButtonText] = useState("");
    const [activeTimelogs, setActiveTimelogs] = useState([]);
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
            //console.log(data);
        }
    }
    async function postTimelog(id) {
        try {
            const response = await axios.post(`${host}timelogs`, {
                taskId: id,
                start: getTime("date"),
                end: getTime("date"),
            });
            const { data } = response;
            //console.log(response.data);
            setTimelogs([...timelogs, data]);
        } catch (error) {
            console.log(error);
        }
    }
    async function patchTimer(id, active) {
        await getData("tasks");
        //isActive ? (active = false) : (active = true);
        console.log(active);
        try {
            const response = await axios.patch(`${host}tasks/${id}`, {
                start: getTime("seconds"),
                end: getTime("seconds"),
                active: active,
            });
            const { data } = response;
            //console.log(response.data);
            setTimelogs([...timelogs, data]);
        } catch (error) {
            console.log(error);
        }
    }
    function startTimer(id, active) {
        postTimelog(id);
        patchTimer(id, active);
        let started;
        if (started === true) return;
        else {
            const timer = setInterval(() => {
                setDateTime(getTime("seconds"));
                started = true;
            }, 100);
        }
    }
    useEffect(() => {
        getData("tasks");
        getData("projects");
        getData("timelogs");
    }, []);
    return (
        <div>
            <h1>Timer</h1>
            {dateTime}
            <div>
                {tasks.map((task, i) => {
                    let active;
                    let color;
                    let hej;
                    let buttonText;
                    task.active ? (buttonText = "Stop") : (buttonText = "Start");
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
                                    startTimer(task.id, true);
                                }}
                            >
                                Start
                            </button>
                            <button
                                onClick={() => {
                                    startTimer(task.id, false);
                                }}
                            >
                                Stop
                            </button>
                        </div>
                    );
                })}
            </div>
            <Navbar />
        </div>
    );
}

export default Timer;
