import { useState, useEffect, Children, ChangeEvent } from "react";
import { Project, Task, Timelog, Invoice } from "./lib/interfaces";
import { useProjectContext } from "./contexts/ProjContext";
import timeSpanFormat from "time-span-format";
import axios from "axios";
const host: string = "http://localhost:3000/";
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
        inputs,
        setInputs,
    } = useProjectContext();
    let totalSeconds: number = 0;
    const hideInput: string = "hidden";
    const showInput: string = "visible";

    const [invoiceProj, setInvoiceProj] = useState<Project>();
    const [invoiceTasks, setInvoiceTasks] = useState<Task[]>([]);
    const [paid, setPaid] = useState<boolean>(false);
    const [inputName, setInputName] = useState<string>("");

    useEffect(() => {
        fetchData("projects", false);
        fetchData("tasks", true);
        fetchData("timelogs", false);
        fetchData("tasks", false);
        fetchData("invoices", false);
    }, []);

    // useEffect(() => {
    //     console.log(paid);
    // }, [paid]);

    function selectProj(e: React.ChangeEvent<HTMLSelectElement>): void {
        const id: number = parseInt(e.target.value);
        if (id === -1) return;
        setInvoiceProj(project.find((proj) => proj.id === id));
    }
    function selectTask(e: React.ChangeEvent<HTMLSelectElement>): void {
        const id: number = parseInt(e.target.value);
        if (id === -1) return;
        const taskToPush: Task[] = task.filter((proj) => proj.id === id);
        setInvoiceTasks((invoiceTasks) => [...invoiceTasks, taskToPush[0]]);
    }
    function deleteTaskFromInvoice(id: number): void {
        const newArr: Task[] = invoiceTasks.filter((task) => task.id !== id);
        setInvoiceTasks(newArr);
    }
    function makeHours(sec: number): number {
        const hours: number = Math.round((sec / 60 / 60) * 1000) / 1000;
        return hours;
    }
    async function postInvoice(
        projId: number,
        customerName: string,
        paid: boolean,
        amount: number,
        created: string,
        due: string
    ): Promise<void> {
        let status: string;
        paid ? (status = "Betald") : (status = "Ej betald");
        try {
            const response = await axios.post(`${host}invoices`, {
                status: status,
                due_date: due,
                amount: amount,
                project: projId,
                customer_name: customerName,
                created_date: created,
            });
            const data: Invoice = response.data;
            fetchData("invoices", false);
        } catch (error: unknown) {
            throw error;
        }
    }
    function saveInvoice(): void {
        if (invoiceProj && invoiceTasks) {
            console.log(invoiceProj.id);
            // const tasksIds: number[] = [];
            // invoiceTasks.forEach((element, i) => {
            //     tasksIds.push(element.id);
            // });
            console.log(paid);
            const now: Date = new Date();
            const year: number = now.getFullYear();
            const month: number = now.getMonth();
            const date: number = now.getDate();
            const created: string = `${year.toString()}-${month.toString()}-${date.toString()}`;
            const due: string = `${year.toString()}-${(month + 1).toString()}-${date.toString()}`;
            const amount: number = Math.ceil(makeHours(totalSeconds) * invoiceProj.price)
            console.log(created);
            console.log(due);
            postInvoice(invoiceProj.id, inputName, paid, amount, created, due);
        } else return;
    }

    return (
        <div className="App">
            <div className="newInvoice">
                <h2>Create invoice</h2>
                <form>
                    <select
                        onChange={(e) => {
                            selectProj(e);
                        }}
                    >
                        <option value={-1}>Choose project</option>
                        {project.map((element) => {
                            return (
                                <option value={element.id} key={`projOpt_${element.id}`}>
                                    {element.name}
                                </option>
                            );
                        })}
                    </select>
                    <div className="proj">
                        <div>{invoiceProj ? invoiceProj.name : ""}</div>
                        <div>{invoiceProj ? invoiceProj.price : ""} kr/h</div>
                    </div>
                    <select
                        onChange={(e) => {
                            selectTask(e);
                        }}
                    >
                        <option value="-1">Add task to invoice</option>
                        {task.map((element) => {
                            return (
                                <option value={element.id} key={`taskOpt_${element.id}`}>
                                    {element.title}
                                </option>
                            );
                        })}
                    </select>
                </form>
                <div className="proj">
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th colSpan={2}>Time</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceTasks.map((task, i: number) => {
                                totalSeconds += task.timeElapsed;
                                return (
                                    <tr key={i}>
                                        <td className="taskinv">{task.title}</td>
                                        <td className="taskinv">{makeHours(task.timeElapsed)}</td>
                                        <td className="taskinv">hours</td>
                                        <td>
                                            <button onClick={() => deleteTaskFromInvoice(task.id)}>
                                                x
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    Customer{" "}
                    <input
                        type="text"
                        value={inputName}
                        onChange={(e) => {
                            setInputName(e.target.value);
                        }}
                    />
                    <br />
                    Paid{" "}
                    <input
                        type="checkbox"
                        onChange={(e) => {
                            e.target.checked ? setPaid(true) : setPaid(false);
                        }}
                    />
                    <br />
                    Total time {makeHours(totalSeconds)} hours
                    <br />
                    Total price{" "}
                    {invoiceProj ? Math.ceil(makeHours(totalSeconds) * invoiceProj.price) : 0} kr
                </div>
                <button onClick={() => saveInvoice()}>Save</button>
            </div>

            <h2>Projects</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Invoice</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {project.map((element, i: number) => {
                        let isInvoice: boolean = invoice.some((inv) => inv.project === element.id);
                        return (
                            <tr key={`project_${element.id}`} className="container">
                                <td key={`id_${element.id}`}>{element.id}</td>
                                <td key={`name_${element.id}`}>{element.name}</td>
                                {/* <td key={`color_${element.id}`}>{element.color}</td> */}
                                <td key={`price_${element.id}`}>
                                    <input
                                        type="number"
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            setInputs((previous) => {
                                                const newInputs: number[] = [...previous];
                                                newInputs[i] = parseInt(e.target.value);
                                                return newInputs;
                                            });
                                        }}
                                        className="normalInput"
                                        value={inputs[i]}
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
                        <th>Proj</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Date ex.</th>
                        <th>Id</th>
                        <th>Amount</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.map((element) => {
                        return (
                            <tr key={`invoice_${element.id}`} className="container">
                                <td key={`status_${element.id}`}>{element.status}</td>
                                <td key={`project2_${element.id}`}>{element.project}</td>
                                <td key={`customer_name_${element.id}`}>{element.customer_name}</td>
                                <td key={`created_date_${element.id}`}>{element.created_date}</td>
                                <td key={`due_date_${element.id}`}>{element.due_date}</td>
                                <td key={`invoice_id_${element.id}`}>{element.id}</td>
                                <td key={`amount_${element.id}`}>{element.amount} kr</td>
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
