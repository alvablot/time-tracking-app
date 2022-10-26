import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
const host = "http://localhost:3000/";
import { useProjectContext } from "../context/ProjectContext";

function AddTimer(props) {
    const { dateTime, setDateTime, patchTimer, getTime, postTimelog } = props;
    const providerValue = useProjectContext();
    const { projects, setProjects, tasks, setTasks, timelogs, setTimelogs } = useProjectContext();
    const [taskId, setTaskId] = useState(0);
    const [projId, setProjId] = useState(0);
    const [taskTitle, setTaskTitle] = useState(0);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);
    const [count, setCount] = useState(0);
    const [abort, setAbort] = useState("");
    let activeCount;
    let steps = useRef(0);
    const started = useRef(false);
    let timer = useRef(null);
    let [countId, setCountId] = useState(1);
    let buttonText = "Start";
    let active = false;
    function getObject() {
        if (tasks.length > 0) {
            const task = tasks.find((task) => task.id === countId);
            setTaskId(task.id);
            setProjId(task.projectId);
            setTaskTitle(task.title);
            setStart(task.start);
            setEnd(task.end);
            //console.log(activeCount);
            //return object;
        }
    }

    function startTimer() {
        active = started.current ? (active = false) : (active = true);
        activeCount = tasks.find((task) => task.id === countId);
        //setDateTime(getTime("date"));
        postTimelog(activeCount.id, active, activeCount.start, count);
        patchTimer(activeCount.id, active, activeCount.start, count);
        //console.log(active);
        setCount(activeCount.end);
        if (!started.current) {
            timer.current = setInterval(() => {
                setDateTime(getTime("time"));
                setCount((activeCount.end += steps.current));
                started.current = true;
            }, 10);
        }
        //steps.current === 0 ? (steps.current = 1) : (steps.current = 0);
    }
    function resetTimer() {
        clearInterval(timer.current);
        started.current = false;
        active = false;
        setCount(0);
        activeCount = tasks.find((task) => task.id === countId);
        postTimelog(activeCount.id, active, 0, 0);
        patchTimer(activeCount.id, active, 0, 0);
    }
    useEffect(() => {
        console.log(activeCount);
        getObject();
    }, []);
    return (
        <div>
            {dateTime}
            {tasks.map((task, i) => {
                return (
                    <div>
                        <button
                            onClick={() => {
                                setCountId(task.id);
                            }}
                        >
                            {task.title}
                        </button>
                        <br />
                    </div>
                );
            })}
            <div>
                {tasks.map((task, i) => {
                     /*
                    let color;
                    let hej;
                    steps.current === 1 ? (buttonText = "Stop") : (buttonText = "Start");
                    projects.map((project) => {
                        project.id === activeCount.projectId
                            ? (color = project.color)
                            : (hej = null);
                    });
                   
                    return (
                        <div className="project-container task" style={{ background: color }}>
                            <div>Id: {activeCount.id}</div>
                            <div>ProjId: {activeCount.projectId}</div>
                            <div>Title: {activeCount.title}</div>
                            <div>Start: {activeCount.start - activeCount.start}</div>
                            <div>End: {activeCount.end - activeCount.start + count}</div>

                            <button
                                onClick={() => {
                                    setCountId(activeCount.id);
                                    startTimer(true);
                                    steps.current === 0 ? (steps.current = 1) : (steps.current = 0);
                                }}
                            >
                                {buttonText}
                            </button>

                            <button
                                onClick={() => {
                                    setCountId(activeCount.id);
                                    resetTimer(true);
                                    steps.current = 0;
                                }}
                            >
                                Reset
                            </button>
                        </div>
                    );*/
                })}
            </div>
            }
        </div>
    );
}

export default AddTimer;
