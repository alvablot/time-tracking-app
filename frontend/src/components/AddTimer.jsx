import { useState, useEffect, useContext, useRef } from "react";
import DateObject from "react-date-object";
import axios from "axios";
const host = "http://localhost:3000/";
import { useProjectContext } from "../context/ProjectContext";

function AddTimer(props) {
    const { patchTimer, deleteTimelog, postTimelog } = props;
    const providerValue = useProjectContext();
    const { projects, tasks } = useProjectContext();
    const [taskColor, setTaskColor] = useState("");
    const [showHideTasks, setShowHideTasks] = useState("hidden");
    const [count, setCount] = useState(0);
    const [showTime, setShowTime] = useState();
    let color = [];
    const [timelog, setTimelog] = useState([]);
    let hej;
    let timer = useRef(null);
    let [countId, setCountId] = useState(1);
    let [active, setActive] = useState(false);
    let date = new DateObject({
        hour: 0,
        minute: 0,
        second: 0,
    });
    const task = tasks.find((task) => task.id === countId);
    const project = projects.find((project) => project.id === task.projectId);

    function startTimer() {
        if (active) {
            patchTimer(task.id, !active, 0, count, count);
            postTimelog(task.id, showTime);
        }
    }
    function resetTimer() {
        console.log(timelog);
        setActive(true);
        setActive(false);
        setCount(0);
        patchTimer(task.id, !active, 0, 0, 0);
    }

    useEffect(() => {
        if (active) {
            timer.current = setInterval(() => {
                setCount((count) => {
                    return count + 1;
                });
            }, 1000);
        } else {
            clearInterval(timer.current);
        }
    }, [active]);

    useEffect(() => {
        date.second = count;
        setShowTime(date.format("HH:mm:ss"));
    }, [count]);

    if (!task || !project) {
        return <div>Hittade inte det du letar efter</div>;
    }
    return (
        <div>
            Choose task to start timing
            <br />
            {tasks.map((task, i) => {
                projects.map((project) => {
                    project.id === task.projectId ? (color[i] = project.color) : (hej = null);
                });
                return (
                    <div key={i}>
                        <button
                            style={{ borderColor: color[i] }}
                            onClick={() => {
                                setCountId(task.id);
                                setCount(task.end);
                                setShowHideTasks("project-container task");
                                setTaskColor(color[i]);
                            }}
                        >
                            {task.title}
                        </button>
                        <br />
                    </div>
                );
            })}
            <div>
                <div className={showHideTasks} style={{ background: taskColor }}>
                    <div>
                        <b>Project: {project.name}</b>
                    </div>
                    <div>
                        <b>Task: {task.title}</b>
                    </div>
                    <div>{showTime}</div>

                    <button
                        onClick={() => {
                            setCountId(task.id);
                            startTimer();
                            active ? setActive(false) : setActive(true);
                        }}
                    >
                        {active ? "Stop" : "Start"}
                    </button>

                    <button
                        onClick={() => {
                            resetTimer();
                        }}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddTimer;
