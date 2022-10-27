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
    const date = new DateObject();
    const [foundTimelogs, setFoundTimelogs] = useState([]);
    const [today, setToday] = useState(date.format("YYYY-MM-DD"));

    async function deleteObject(element, id) {
        try {
            const response = await axios.delete(`${host}${element}/${id}`);
        } catch (error) {
            console.log(error);
        }
    }
    async function getData(type) {
        if (type === "projects") {
            const data = await providerValue.getProjects();
            setProjects(data);
        }
        if (type === "timelogs") {
            const data = await providerValue.getTimelogs();
            setTimelogs(data);
        }
    }
    useEffect(() => {
        getData("timelogs")
        setFoundTimelogs(timelogs);
    }, [today]);
    if (!foundTimelogs) {
        return (
            <div>
                Didn't find foundTimelogs
                <Navbar />
            </div>
        );
    }
    return (
        <div>
            <h1>Calender</h1>
            <input
                type="date"
                onChange={(e) => {
                    setToday(e.target.value);
                }}
                value={today}
            />
            <div className="visible">
                {foundTimelogs
                    .filter((timelog) => timelog.date === today)
                    .map((timelog) => {
                        return (
                            <div key={`timelog_${timelog.id}`} className="calender">
                                <span className="calender-item">
                                    <strong>{timelog.date}</strong>
                                </span>
                                <span className="calender-item">Id {timelog.id}</span>
                                <span className="calender-item">
                                    timeElapsed: {timelog.timeElapsed}
                                </span>
                                <button
                                    className="calender-button"
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
