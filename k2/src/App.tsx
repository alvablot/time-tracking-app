import { useState, useEffect, Children } from "react";
// import { Project, Task, Timelog } from "./lib/interfaces";
import { useProjectContext } from "./contexts/ProjContext";
import timeSpanFormat from "time-span-format";

import "./App.css";

function App() {
    const {
        project,
        setProject,
        task,
        setTask,
        task_30,
        setTask_30,
        timelog,
        setTimelog,
        invoice,
        setInvoice,
        fetchData,
    } = useProjectContext();
    useEffect(() => {
        fetchData("projects", false);
        fetchData("tasks", true);
        fetchData("timelogs", false);
        fetchData("tasks", false);
        fetchData("invoices", false);
    }, []);

    return (
        <div className="App">
            <h2>Projects</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Color</th>
                        <th>Price</th>
                        <th>Invoice</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {project.map((element, i) => {
                        let isInvoice: boolean = invoice.some((inv) => inv.project === element.id);
                        return (
                            <tr key={`project_${element.id}`} className="container">
                                <td key={`id_${element.id}`}>{element.id}</td>
                                <td key={`name_${element.id}`}>{element.name}</td>
                                <td key={`color_${element.id}`}>{element.color}</td>
                                <td key={`price_${element.id}`}>
                                    <input
                                        type="text"
                                        className="readOnlyInput"
                                        readOnly
                                        value={element.price}
                                    />
                                </td>
                                <td>
                                    {isInvoice ? <button>Show</button> : <button>Create</button>}
                                </td>
                                <td key={`delete1_${element.id}`}>
                                    <button>x</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <h2>Tasks latest 30 days</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Proj-id</th>
                        <th>Duration</th>
                        <th>Id</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {task_30.map((element) => {
                        let time: string = timeSpanFormat(element.timeElapsed);
                        return (
                            <tr key={`taks_${element.id}`} className="container">
                                <td key={`title_${element.id}`}>{element.title}</td>
                                <td key={`date_${element.id}`}>{element.date}</td>
                                <td key={`projectId_${element.id}`}>{element.projectId}</td>
                                <td key={`timeElapsed_${element.id}`}>{time}</td>
                                <td key={`task_id_${element.id}`}>{element.id}</td>
                                <td key={`delete2_${element.id}`}>
                                    <button>x</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <h2>All tasks</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Proj-id</th>
                        <th>Duration</th>
                        <th>Id</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {task.map((element) => {
                        let time: string = timeSpanFormat(element.timeElapsed);
                        return (
                            <tr key={`all_taks_${element.id}`} className="container">
                                <td key={`all_title_${element.id}`}>{element.title}</td>
                                <td key={`all_date_${element.id}`}>{element.date}</td>
                                <td key={`all_projectId_${element.id}`}>{element.projectId}</td>
                                <td key={`all_timeElapsed_${element.id}`}>{time}</td>
                                <td key={`all_task_id_${element.id}`}>{element.id}</td>
                                <td key={`all_delete2_${element.id}`}>
                                    <button>x</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <h2>Timelogs</h2>
            <table>
                <thead>
                    <tr>
                        <th>Task-id</th>
                        <th>Duration</th>
                        <th>Date </th>
                        <th>Id </th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {timelog.map((element) => {
                        return (
                            <tr key={`timelog_${element.id}`} className="container">
                                <td key={`taskId_${element.id}`}>{element.taskId}</td>
                                <td key={`timeElapsed_${element.id}`}>{element.timeElapsed}</td>
                                <td key={`date2_${element.id}`}>{element.date}</td>
                                <td key={`timelog_id_${element.id}`}>{element.id}</td>
                                <td key={`delete3_${element.id}`}>
                                    <button>x</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <h2>Invoices</h2>
            <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Due_date</th>
                        <th>Project</th>
                        <th>customer_name</th>
                        <th>created_date</th>
                        <th>Id</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.map((element) => {
                        return (
                            <tr key={`invoice_${element.id}`} className="container">
                                <td key={`status_${element.id}`}>{element.status}</td>
                                <td key={`due_date_${element.id}`}>{element.due_date}</td>
                                <td key={`project2_${element.id}`}>{element.project}</td>
                                <td key={`customer_name_${element.id}`}>{element.customer_name}</td>
                                <td key={`created_date_${element.id}`}>{element.created_date}</td>
                                <td key={`invoice_id_${element.id}`}>{element.id}</td>
                                <td key={`delete4_${element.id}`}>
                                    <button>x</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default App;
