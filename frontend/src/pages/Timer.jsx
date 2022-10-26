import { React, useState, useEffect, Children } from "react";
import { useProjectContext } from "../context/ProjectContext";
import Navbar from "../components/Navbar";
import AddTimer from "../components/AddTimer";
import axios from "axios";
const host = "http://localhost:3000/";

function Timer() {
    const providerValue = useProjectContext();
    const { projects, setProjects, tasks, setTasks, timelogs, setTimelogs } = useProjectContext();
    const [dateTime, setDateTime] = useState(0);

    function getTime(data) {
        let now = new Date();
        now.toString();
        const date = now.getDate();
        const year = now.getHours();
        const month = now.getHours();
        const day = now.getDay();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        //const time = `${hours}:${minutes}:${seconds}`;
        const time = now.getTime();
        if (data === "year") return time;
        if (data === "month") return month;
        if (data === "date") return date;
        if (data === "day") return day;
        if (data === "time") return time;
        if (data === "hours") return hours;
        if (data === "minutes") return minutes;
        if (data === "seconds") return seconds;
        
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
    async function postTimelog(id, active, start, end) {
        try {
            const response = await axios.post(`${host}timelogs`, {
                taskId: id,
                start: start,
                end: end,
                active: active,
            });
            const { data } = response;
            //console.log(response.data);
            setTimelogs([...timelogs, data]);
        } catch (error) {
            console.log(error);
        }
    }

    async function patchTimer(id, active, start, end) {
        await getData("tasks");
        const taskToUpdate = await tasks.find((task) => task.id === id);

        try {
            /*if (taskToUpdate.start !== null) {
                const response = await axios.patch(`${host}tasks/${id}`, {
                    active: active,
                });
                const { data } = response;
                setTimelogs([...timelogs, data]);
            } else {*/
            const response = await axios.patch(`${host}tasks/${id}`, {
                active: active,
                start: start,
                end: end,
            });
            const { data } = response;
            setTimelogs([...timelogs, data]);
            //}
        } catch (error) {
            console.log(error);
        }
        if (taskToUpdate.start === null) {
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
            <AddTimer
                dateTime={dateTime}
                setDateTime={setDateTime}
                patchTimer={patchTimer}
                getTime={getTime}
                postTimelog={postTimelog}
            />
            <Navbar />
        </div>
    );
}

export default Timer;
