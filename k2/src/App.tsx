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
        timelog_30,
        setTimelog_30,
        invoice,
        setInvoice,
        fetchData,
        deletePost,
        inputs,
        setInputs,
    } = useProjectContext();
    let totalSeconds: number = 0;
    let totalCash: number = 0;
    let roundTimeMin: number;
    const hideInput: string = "hidden";
    const showInput: string = "visible";

    const [roundedTime, setRoundedTime] = useState<number[]>([]);
    const [projName, setProjName] = useState<string[]>([]);
    const [invoiceProj, setInvoiceProj] = useState<Project>();
    const [invoiceTasks, setInvoiceTasks] = useState<Task[]>([]);
    const [paid, setPaid] = useState<boolean>(false);
    const [inputName, setInputName] = useState<string>("");
    const [emo, setEmo] = useState<string>("");
    const [hidden, setHidden] = useState<string>("none");

    useEffect(() => {
        fetchData("projects");
        fetchData("tasks");
        fetchData("timelogs");
        fetchData("invoices");
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
        if (id > -1) {
            const taskToPush: Task[] = task.filter((proj) => proj.id === id);
            setInvoiceTasks((invoiceTasks) => [...invoiceTasks, taskToPush[0]]);
        }
    }
    function deleteTaskFromInvoice(id: number): void {
        const newArr: Task[] = invoiceTasks.filter((task) => task.id !== id);
        setInvoiceTasks(newArr);
    }
    function makeHours(sec: number): number {
        const hours: number = Math.round((sec / 60 / 60) * 1000) / 1000;
        return hours;
    }

    async function uppdatePrice(price: number, id: number, i: number): Promise<void> {
        try {
            const response = await axios.patch(`${host}projects/${id}`, {
                price: price,
            });
            fetchData("projects");
            showEmo();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error);
            } else {
                console.log(error);
            }
        }
    }
    function showEmo(): void {
        setEmo("👍");
        setHidden("block");
        setTimeout(() => {
            setEmo("");
            setHidden("none");
        }, 2000);
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
            fetchData("invoices");
            showEmo();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error);
            } else {
                console.log(error);
            }
        }
    }
    function saveInvoice(): void {
        if (invoiceProj && invoiceTasks && inputName) {
            console.log(invoiceProj.id);
            console.log(paid);
            const now: Date = new Date();
            const year: number = now.getFullYear();
            const month: number = now.getMonth();
            const date: number = now.getDate();
            const created: string = `${year.toString()}-${month.toString()}-${date.toString()}`;
            const due: string = `${year.toString()}-${(month + 1).toString()}-${date.toString()}`;
            const amount: number = Math.ceil(makeHours(totalSeconds) * invoiceProj.price);
            console.log(created);
            console.log(due);
            postInvoice(invoiceProj.id, inputName, paid, amount, created, due);
        }
    }
    function roundTime(step: number, min: number, id: number): number {
        const remain: number = min % step;
        const rest: number = min - remain;
        const result: number = rest + step;
        return result;
    }
    return (
        <div className="App">
            <div id="box" style={{ display: `${hidden}` }}>
                {emo}
            </div>
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
                    </select>{" "}
                    *
                    <div className="proj">
                        <div>{invoiceProj ? invoiceProj.name : ""}</div>
                        <div>{invoiceProj ? invoiceProj.price + " kr/h" : ""}</div>
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
                    </select>{" "}
                    *
                </form>
                <div className="proj">
                    <table>
                        <thead>
                            <tr>
                                {invoiceProj ? <th>Title</th> : ""}
                                {invoiceProj ? <th colSpan={2}>Time</th> : ""}
                                {invoiceProj ? <th>Remove</th> : ""}
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceTasks.map((task, i: number) => {
                                totalSeconds += task.timeElapsed;
                                roundTimeMin = Math.round((task.timeElapsed / 60) * 100) / 100;
                                return (
                                    <tr key={i}>
                                        <td className="taskinv">{task.title}</td>
                                        <td className="taskinv">
                                            {makeHours(task.timeElapsed)}h {task.timeElapsed}sec
                                            <br />
                                            <span className="roundLinks2">
                                                {roundedTime[i]} min
                                            </span>{" "}
                                            Round{" "}
                                            <span
                                                className="roundLinks"
                                                onClick={() => {
                                                    setRoundedTime((previous) => {
                                                        const newInputs: number[] = [...previous];
                                                        newInputs[i] = roundTime(
                                                            1,
                                                            Math.round(
                                                                (task.timeElapsed / 60) * 100
                                                            ) / 100,
                                                            task.id
                                                        );
                                                        return newInputs;
                                                    });
                                                }}
                                            >
                                                1
                                            </span>
                                            <span
                                                className="roundLinks"
                                                onClick={() => {
                                                    setRoundedTime((previous) => {
                                                        const newInputs: number[] = [...previous];
                                                        newInputs[i] = roundTime(
                                                            5,
                                                            Math.round(
                                                                (task.timeElapsed / 60) * 100
                                                            ) / 100,
                                                            task.id
                                                        );
                                                        return newInputs;
                                                    });
                                                }}
                                            >
                                                5
                                            </span>
                                            <span
                                                className="roundLinks"
                                                onClick={() => {
                                                    setRoundedTime((previous) => {
                                                        const newInputs: number[] = [...previous];
                                                        newInputs[i] = roundTime(
                                                            15,
                                                            Math.round(
                                                                (task.timeElapsed / 60) * 100
                                                            ) / 100,
                                                            task.id
                                                        );
                                                        return newInputs;
                                                    });
                                                }}
                                            >
                                                15
                                            </span>
                                            <span
                                                className="roundLinks"
                                                onClick={() => {
                                                    setRoundedTime((previous) => {
                                                        const newInputs: number[] = [...previous];
                                                        newInputs[i] = roundTime(
                                                            30,
                                                            Math.round(
                                                                (task.timeElapsed / 60) * 100
                                                            ) / 100,
                                                            task.id
                                                        );
                                                        return newInputs;
                                                    });
                                                }}
                                            >
                                                30
                                            </span>
                                        </td>
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
                    <div className="gridContainer">
                        <div>Customer </div>
                        <div>
                            <input
                                required
                                className="normalInput"
                                type="text"
                                value={inputName}
                                onChange={(e) => {
                                    setInputName(e.target.value);
                                }}
                            />
                            *
                        </div>
                        <div> Paid </div>
                        <div>
                            <input
                                type="checkbox"
                                onChange={(e) => {
                                    e.target.checked ? setPaid(true) : setPaid(false);
                                }}
                            />
                        </div>
                        <div>Total time</div>
                        <div>{makeHours(totalSeconds)} hours</div>
                        <div>Total price</div>
                        <div>
                            {invoiceProj
                                ? Math.ceil(makeHours(totalSeconds) * invoiceProj.price)
                                : 0}{" "}
                            kr
                        </div>
                    </div>
                </div>
                <button onClick={() => saveInvoice()}>Save</button>
            </div>
            <h2>Projects</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price/h</th>
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
                                <td key={`price_${element.id}`} className="priceTd">
                                    <input
                                        type="number"
                                        step="10"
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
                                    <button
                                        onClick={() => {
                                            uppdatePrice(inputs[i], element.id, i);
                                        }}
                                    >
                                        Uppdate
                                    </button>
                                </td>
                                <td>
                                    {isInvoice ? <button>Show</button> : <button>Create</button>}
                                </td>
                                <td key={`delete1_${element.id}`}>
                                    <button onClick={() => deletePost(element.id, "projects")}>
                                        x
                                    </button>
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
                        <th>Project</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {task_30.map((element, i) => {
                        const filtered: Project[] = project.filter((obj) => {
                            return obj.id === element.projectId;
                        });
                        let time: string = timeSpanFormat(element.timeElapsed);
                        return (
                            <tr key={`taks_${element.id}`} className="container">
                                <td key={`title_${element.id}`}>{element.title}</td>
                                <td key={`date_${element.id}`}>
                                    {filtered ? filtered[0].name : ""}
                                </td>
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
                        <th>Project</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {task.map((element) => {
                        const filtered: Project[] = project.filter((obj) => {
                            return obj.id === element.projectId;
                        });
                        let time: string = timeSpanFormat(element.timeElapsed);
                        return (
                            <tr key={`all_taks_${element.id}`} className="container">
                                <td key={`all_title_${element.id}`}>{element.title}</td>
                                <td key={`all_date_${element.id}`}>{filtered[0].name}</td>
                                <td key={`all_delete2_${element.id}`}>
                                    <button>x</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

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
                                    <button onClick={() => deletePost(element.id, "timelogs")}>
                                        x
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

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
                                    <button onClick={() => deletePost(element.id, "timelogs")}>
                                        x
                                    </button>
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
                        <th>Customer</th>
                        <th>Exp. date</th>
                        <th>Amount</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.map((element) => {
                        totalCash += element.amount;
                        return (
                            <tr key={`invoice_${element.id}`} className="container">
                                <td key={`status_${element.id}`}>{element.status}</td>
                                <td key={`customer_name_${element.id}`}>{element.customer_name}</td>
                                <td key={`due_date_${element.id}`}>{element.due_date}</td>
                                <td key={`amount_${element.id}`}>{element.amount} kr</td>
                                <td key={`delete4_${element.id}`}>
                                    <button>x</button>
                                </td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td className="totalCash" colSpan={8}>
                            <b>
                                Total amount: <u>{totalCash}</u> kr
                            </b>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default App;
