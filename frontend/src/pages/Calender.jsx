import { React, useState, useEffect, Children } from "react";
import DateObject from "react-date-object";
import Navbar from "../components/Navbar";
import { useProjectContext } from "../context/ProjectContext";
import axios from "axios";
const host = "http://localhost:3000/";

function Calender() {
    const providerValue = useProjectContext();
    const { projects, setProjects, tasks, setTasks, timelogs, setTimelogs } = useProjectContext();
    let [countId, setCountId] = useState(1);

    let task = tasks.find((task) => task.id === countId);
    async function deleteObject(element, id) {
        try {
            const response = await axios.delete(`${host}${element}/${id}`);
            await getData(element);
        } catch (error) {
            console.log(error);
        }
    }
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
    if (!task) {
        return <div>Hittade inte det du letar efter</div>;
    }
    return (
        <div>
            <h1>Calender</h1>
            <div className="visible">
                {timelogs.map((timelog) => {
                    return (
                        <div key={`timelog_${timelog.id}`} className="project-container time">
                            <div>{timelog.id}</div>
                            <div>date: {timelog.date}</div>
                            <div>timeElapsed: {timelog.timeElapsed}</div>
                            <button
                                onClick={() => {
                                    deleteObject("timelogs", timelog.id);
                                }}
                            >
                                x
                            </button>
                        </div>
                    );
                })}
            </div>
            <Navbar />
        </div>
    );
}

export default Calender;
