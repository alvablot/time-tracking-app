import { React, useState, useEffect, Children } from "react";
import DateObject from "react-date-object";
import { useProjectContext } from "../context/ProjectContext";
import Navbar from "../components/Navbar";
import AddTimer from "../components/AddTimer";
import axios from "axios";
const host = "http://localhost:3000/";

function Timer() {
    const providerValue = useProjectContext();
    const { setProjects, tasks, setTasks, timelogs, setTimelogs } = useProjectContext();
    const [dateTime, setDateTime] = useState(0);

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
        }
    }
    async function postTimelog(id, timeElapsed) {
        const date = new DateObject();
        try {
            const response = await axios.post(`${host}timelogs`, {
                taskId: id,
                timeElapsed: timeElapsed,
                date: date.format("YYYY-MM-DD"),
            });
            const { data } = response;
            setTimelogs(timelogs);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteTimelog(id) {
        const date = new DateObject();
        try {
            const response = await axios.delete(`${host}timelogs/${id}`);
        } catch (error) {
            console.log(error);
        }
    }

    async function patchTimer(id, active, start, end, timeElapsed) {
        await getData("tasks");
        const taskToUpdate = await tasks.find((task) => task.id === id);

        try {
            const response = await axios.patch(`${host}tasks/${id}`, {
                active: active,
                start: start,
                end: end,
                timeElapsed: timeElapsed,
            });
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
                postTimelog={postTimelog}
                deleteTimelog={deleteTimelog}
            />
            <Navbar />
        </div>
    );
}

export default Timer;
