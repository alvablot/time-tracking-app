import { useState, useEffect, useContext } from "react";
import axios from "axios";
const host = "http://localhost:3000/";
import { useProjectContext } from "../context/ProjectContext";

function AddTimer(props) {
    const { dateTime, setDateTime, patchTimer, getTime, postTimelog } = props;
    const providerValue = useProjectContext();
    const { projects, setProjects, tasks, setTasks, timelogs, setTimelogs } = useProjectContext();
    const [count, setCount] = useState(0);
    const [abort, setAbort] = useState("");
    let i = 0;
    let started;
    let timer;
    function startTimer(id) {
        //setDateTime(getTime("date"));
        //postTimelog(id);
        //patchTimer(id, active);
        const activeCount = tasks.find((task) => task.id === id);
        setCount(activeCount.end);
        if (!started) {
            timer = setInterval(() => {
                setDateTime(getTime("time"));
                i++;
                setCount(activeCount.end + i);
                console.log(count);
                started = true;
            }, 1000);
        }
    }
    useEffect(() => {
        clearInterval(timer);
        console.log(timer);
    }, [abort]);
    return (
        <div>
            {dateTime}
            {
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
                                <div>Start: {task.start}</div>
                                <div>End: {count}</div>

                                <button
                                    onClick={() => {
                                        startTimer(task.id, true);
                                    }}
                                >
                                    Start
                                </button>
                                <button
                                    onClick={() => {
                                        setAbort("0");
                                    }}
                                >
                                    Stop
                                </button>
                            </div>
                        );
                    })}
                </div>
            }
        </div>
    );
}

export default AddTimer;
