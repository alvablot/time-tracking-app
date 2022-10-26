import { useState, useEffect, useContext, useRef } from "react";
import DateObject from "react-date-object";
import axios from "axios";
const host = "http://localhost:3000/";
import { useProjectContext } from "../context/ProjectContext";

function AddTimer(props) {
    const { dateTime, setDateTime, patchTimer, getTime, postTimelog } = props;
    const providerValue = useProjectContext();
    const { projects, setProjects, tasks, setTasks, timelogs, setTimelogs } = useProjectContext();
    const [taskColor, setTaskColor] = useState("");
    let [end, setEnd] = useState(0);
    const [showHideTasks, setShowHideTasks] = useState("hidden");
    const [count, setCount] = useState(0);
    let color = [];
    let hej;
    let timer = useRef(null);
    let [countId, setCountId] = useState(1);
    let [active, setActive] = useState(false);
    const task = tasks.find((task) => task.id === countId);

    function startTimer() {}
    function resetTimer() {
        clearInterval(timer.current);
        setActive(false);
        setEnd(0);
        //postTimelog(task.id, !active, 0, 0);
        patchTimer(task.id, !active, 0, 0);
    }
    useEffect(() => {
        if (active) {
            timer.current = setInterval(() => {
                // setEnd(getTime("time"));
                /* const date = new DateObject(getTime("time"));
                console.log(date.format("HH:mm:ss"));
                console.log(getTime("time"));*/
                setCount((count) => {
                    return count + 1;
                });
            }, 1000);
        } else {
            clearInterval(timer.current);
        }
    }, [active]);
    if (!task) {
        return <div>Hittade inte task</div>;
    }
    return (
        <div>
            {tasks.map((task, i) => {
                projects.map((project) => {
                    project.id === task.projectId ? (color[i] = project.color) : (hej = null);
                });
                return (
                    <div key={i}>
                        <button
                            onClick={() => {
                                setCountId(task.id);
                                setEnd(task.end);
                                setShowHideTasks("project-container task");
                                setTaskColor(color[i]);
                            }}
                        >
                            {task.id}
                        </button>
                        <br />
                    </div>
                );
            })}
            <div>
                <div className={showHideTasks} style={{ background: taskColor }}>
                    <div>Id: {task.id}</div>
                    <div>ProjId: {task.projectId}</div>
                    <div>Title: {task.title}</div>
                    <div>Start: {task.start}</div>
                    <div>End: {count}</div>

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
