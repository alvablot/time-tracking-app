import { useState, useEffect, Children, ChangeEvent } from "react";
import { Project, Task, Timelog, Invoice } from "./lib/interfaces";
import { useProjectContext } from "./contexts/ProjContext";
import timeSpanFormat from "time-span-format";
import { parse } from "date-format-parse";
const host: string = "http://localhost:3000/";
const now: Date = new Date();
const thisTime: number = now.getTime();

import "./App.css";
import Projects from "./components/Projects";
import CreateInvoice from "./components/CreateInvoice";
import Invoices from "./components/Invoices";
function App() {
    const {
        project,
        task,
        setTask_30,
        task_30,
        timelog,
        setTimelog_30,
        timelog_30,
        fetchData,
        deletePost,
        emo,
        hidden,
    } = useProjectContext();

    const [showMenu, setShowMenu] = useState<string>("none");
    const [showCreateInvoice, setShowCreateInvoice] = useState<string>("none");
    const [showProjects, setShowProjects] = useState<string>("none");
    const [showTasks, setShowTasks] = useState<string>("none");
    const [showTasks30, setShowTasks30] = useState<string>("none");
    const [showTimelogs, setShowTimelogs] = useState<string>("none");
    const [showTimelogs30, setShowTimelogs30] = useState<string>("none");
    const [showInvoices, setShowInvoices] = useState<string>("none");

    function fetchAll(): void {
        fetchData("projects");
        fetchData("tasks");
        fetchData("timelogs");
        fetchData("invoices");
    }

    useEffect(() => {
        fetchAll();
    }, []);

    function get30B(date: string): number {
        const dates: Date = parse(date, "YYYY-MM-DD");
        const time: number = dates.getTime();
        const days: number =
            Math.round(thisTime / 1000 / 60 / 60 / 24) - Math.round(time / 1000 / 60 / 60 / 24);
        return days;
    }

    useEffect(() => {
        const days: Task[] = task.filter((element) => get30B(element.date) < 32);
        setTask_30(days);
    }, [task]);

    useEffect(() => {
        const days: Timelog[] = timelog.filter((element) => get30B(element.date) < 32);
        setTimelog_30(days);
    }, [timelog]);

    useEffect(() => {
        console.log(showProjects);
    }, [showProjects]);

    return (
        <div className="App">
            <div
                id="hider"
                style={{ display: showMenu }}
                onClick={() => {
                    setShowMenu("none");
                }}
            ></div>
            <div id="menuBar">
                <span
                    id="open-menu"
                    onClick={() => {
                        setShowMenu("block");
                    }}
                >
                    ...
                </span>
            </div>
            <div
                id="menuContainer"
                style={{ display: showMenu }}
                onClick={() => {
                    setShowMenu("none");
                }}
            >
                <ul>
                    <li>
                        <a
                            href="#"
                            onClick={() => {
                                setShowProjects("block");
                                setShowTasks30("block");
                                setShowTasks("block");
                                setShowTimelogs30("block");
                                setShowTimelogs("block");
                                setShowCreateInvoice("block");
                                setShowInvoices("block");
                            }}
                        >
                            Overview
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={() => {
                                setShowProjects("block");
                                setShowTasks30("none");
                                setShowTasks("none");
                                setShowTimelogs30("none");
                                setShowTimelogs("none");
                                setShowCreateInvoice("none");
                                setShowInvoices("none");
                            }}
                        >
                            Projects
                        </a>
                    </li>
                    <li>Tasks</li>
                    <ul>
                        <li>
                            <a
                                href="#"
                                onClick={() => {
                                    setShowProjects("none");
                                    setShowTasks30("block");
                                    setShowTasks("none");
                                    setShowTimelogs30("none");
                                    setShowTimelogs("none");
                                    setShowCreateInvoice("none");
                                    setShowInvoices("none");
                                }}
                            >
                                Last 30 days
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => {
                                    setShowProjects("none");
                                    setShowTasks30("none");
                                    setShowTasks("block");
                                    setShowTimelogs30("none");
                                    setShowTimelogs("none");
                                    setShowCreateInvoice("none");
                                    setShowInvoices("none");
                                }}
                            >
                                All
                            </a>
                        </li>
                    </ul>
                    <li>Timelogs</li>
                    <ul>
                        <li>
                            <a
                                href="#"
                                onClick={() => {
                                    setShowProjects("none");
                                    setShowTasks30("none");
                                    setShowTasks("none");
                                    setShowTimelogs30("block");
                                    setShowTimelogs("none");
                                    setShowCreateInvoice("none");
                                    setShowInvoices("none");
                                }}
                            >
                                Last 30 days
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => {
                                    setShowProjects("none");
                                    setShowTasks30("none");
                                    setShowTasks("none");
                                    setShowTimelogs30("none");
                                    setShowTimelogs("block");
                                    setShowCreateInvoice("none");
                                    setShowInvoices("none");
                                }}
                            >
                                All
                            </a>
                        </li>
                    </ul>
                    <li>Invoices</li>
                    <ul>
                        <li>
                            <a
                                href="#"
                                onClick={() => {
                                    setShowProjects("none");
                                    setShowTasks30("none");
                                    setShowTasks("none");
                                    setShowTimelogs30("none");
                                    setShowTimelogs("none");
                                    setShowCreateInvoice("block");
                                    setShowInvoices("none");
                                }}
                            >
                                Create
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => {
                                    setShowProjects("none");
                                    setShowTasks30("none");
                                    setShowTasks("none");
                                    setShowTimelogs30("none");
                                    setShowTimelogs("none");
                                    setShowCreateInvoice("none");
                                    setShowInvoices("block");
                                }}
                            >
                                All
                            </a>
                        </li>
                    </ul>
                </ul>
            </div>
            <div id="box" style={{ display: `${hidden}` }}>
                {emo}
            </div>

            <div style={{ display: showProjects }}>
                <Projects />
            </div>
            <div style={{ display: showTasks30 }}>
                <h2>Tasks latest 30 days</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Project</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {task_30.map((element, i) => {
                            const filtered: Project | undefined = project.find((obj) => {
                                return obj.id === element.projectId;
                            });
                            let time: string = timeSpanFormat(element.timeElapsed);
                            return (
                                <tr key={`taks_${element.id}`} className="container">
                                    <td key={`title_${element.id}`}>{element.title}</td>
                                    <td key={`date_${element.id}`}>
                                        {filtered ? filtered.name : ""}
                                    </td>
                                    <td key={`delete2_${element.id}`}>
                                        <button
                                            onClick={() => {
                                                deletePost(element.id, "tasks");
                                                fetchAll();
                                            }}
                                        >
                                            x
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div style={{ display: showTasks }}>
                <h2>All tasks</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Project</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {task.map((element) => {
                            const filtered: Project | undefined = project.find((obj) => {
                                return obj.id === element.projectId;
                            });
                            let time: string = timeSpanFormat(element.timeElapsed);
                            return (
                                <tr key={`all_taks_${element.id}`} className="container">
                                    <td key={`all_title_${element.id}`}>{element.title}</td>
                                    <td key={`date_${element.id}`}>
                                        {filtered ? filtered.name : ""}
                                    </td>
                                    <td key={`all_delete2_${element.id}`}>
                                        <button
                                            onClick={() => {
                                                deletePost(element.id, "tasks");
                                                fetchAll();
                                            }}
                                        >
                                            x
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div style={{ display: showTimelogs30 }}>
                <h2>Timelogs latest 30 days</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Date </th>
                            <th>Duration</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timelog_30.map((element) => {
                            return (
                                <tr key={`timelog_${element.id}`} className="container">
                                    <td key={`date2_${element.id}`}>{element.date}</td>
                                    <td key={`timeElapsed_${element.id}`}>{element.timeElapsed}</td>
                                    <td key={`delete3_${element.id}`}>
                                        <button
                                            onClick={() => {
                                                deletePost(element.id, "timelogs");
                                                fetchAll();
                                            }}
                                        >
                                            x
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div style={{ display: showTimelogs }}>
                <h2>All timelogs</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Date </th>
                            <th>Duration</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timelog.map((element) => {
                            return (
                                <tr key={`timelog_${element.id}`} className="container">
                                    <td key={`date2_${element.id}`}>{element.date}</td>
                                    <td key={`timeElapsed_${element.id}`}>{element.timeElapsed}</td>
                                    <td key={`delete3_${element.id}`}>
                                        <button
                                            onClick={() => {
                                                deletePost(element.id, "timelogs");
                                                fetchAll();
                                            }}
                                        >
                                            x
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div style={{ display: showCreateInvoice }}>
                <CreateInvoice />
            </div>
            <div style={{ display: showInvoices }}>
                <Invoices />
            </div>
        </div>
    );
}

export default App;
