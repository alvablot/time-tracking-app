import { useEffect } from "react";
import { Project, Task, Timelog } from "./lib/interfaces";
import { useProjectContext } from "./contexts/ProjContext";
import timeSpanFormat from "time-span-format";
const now: Date = new Date();
const thisTime: number = now.getTime();
const thisYear: number = now.getFullYear();

import "./App.css";
import Projects from "./components/Projects";
import CreateInvoice from "./components/CreateInvoice";
import Invoices from "./components/Invoices";
import Menu from "./components/Menu";

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
        showMenu,
        setShowMenu,
        get30B,
        showHideContent,
    } = useProjectContext();

    function fetchAll(): void {
        fetchData("projects");
        fetchData("tasks");
        fetchData("timelogs");
        fetchData("invoices");
    }
    
    useEffect(() => {
        fetchAll();
    }, []);

    useEffect(() => {
        const days: Task[] = task.filter((element) => get30B(element.date) < 32);
        setTask_30(days);
    }, [task]);

    useEffect(() => {
        const days: Timelog[] = timelog.filter((element) => get30B(element.date) < 32);
        setTimelog_30(days);
    }, [timelog]);

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
            <Menu />
            <div id="box" style={{ display: `${hidden}` }}>
                {emo}
            </div>
            {showHideContent[0] === "block" &&
            showHideContent[showHideContent.length - 1] === "block" ? (
                <h1>Overview</h1>
            ) : (
                ""
            )}
            <div style={{ display: showHideContent[6] }}>
                <CreateInvoice />
            </div>
            <div style={{ display: showHideContent[0] }}>
                <Projects />
            </div>
            <div style={{ display: showHideContent[1] }}>
                <h2>Tasks last 30 days</h2>
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

            <div id="fwefger" style={{ display: showHideContent[2] }}>
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

            <div id="sf" style={{ display: showHideContent[3] }}>
                <h2>Timelogs last 30 days</h2>
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

            <div style={{ display: showHideContent[4] }}>
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
            <div style={{ display: showHideContent[5] }}>
                <Invoices />
            </div>
        </div>
    );
}

export default App;
