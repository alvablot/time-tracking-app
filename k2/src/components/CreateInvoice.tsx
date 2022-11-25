import { useEffect, useState } from "react";
import { Project, Task, Invoice } from "../lib/interfaces";
import { useProjectContext } from "../contexts/ProjContext";
import axios from "axios";
const host: string = "http://localhost:3000/";

function CreateInvoice() {
    const { project, task, fetchData, showEmo } = useProjectContext();
    let totalSeconds: number = 0;
    let roundTimeMin: number;

    const [roundedTime, setRoundedTime] = useState<number[]>([]);
    const [invoiceProj, setInvoiceProj] = useState<Project>();
    const [invoiceTasks, setInvoiceTasks] = useState<Task[]>([]);
    const [invoiceTasksOptions, setInvoiceTasksOptions] = useState<Task[]>([]);
    const [paid, setPaid] = useState<boolean>(false);
    const [inputName, setInputName] = useState<string>("");

    function selectProj(e: React.ChangeEvent<HTMLSelectElement>): void {
        const id: number = parseInt(e.target.value);
        if (id > -1) {
            setInvoiceProj(project.find((proj) => proj.id === id));
            setInvoiceTasks(task.filter((task) => task.projectId === id));
        } 
    }

    function selectTask(e: React.ChangeEvent<HTMLSelectElement>): void {
        const id: number = parseInt(e.target.value);
        if (id > -1) {
            const taskToPush: Task[] = task.filter((proj) => proj.id === id);
            setInvoiceTasksOptions((invoiceTasksOptions) => [...invoiceTasksOptions, taskToPush[0]]);
        }
    }

    function deleteTaskFromInvoice(id: number): void {
        const newArr: Task[] = invoiceTasksOptions.filter((task) => task.id !== id);
        setInvoiceTasksOptions(newArr);
    }

    function roundTime(step: number, min: number, id: number): number {
        const remain: number = min % step;
        const rest: number = min - remain;
        const result: number = rest + step;
        return result;
    }

    function makeHours(sec: number): number {
        const hours: number = Math.round((sec / 60 / 60) * 1000) / 1000;
        return hours;
    }

    function saveInvoice(): void {
        if (invoiceProj && invoiceTasks && inputName) {
            const now: Date = new Date();
            const year: number = now.getFullYear();
            const month: number = now.getMonth();
            const date: number = now.getDate();
            const created: string = `${year.toString()}-${month.toString()}-${date.toString()}`;
            const due: string = `${year.toString()}-${(month + 1).toString()}-${date.toString()}`;
            const amount: number = Math.ceil(makeHours(totalSeconds) * invoiceProj.price);
            postInvoice(invoiceProj.id, inputName, paid, amount, created, due);
        } else {
            showEmo("🙅🏻‍♀️");
        }
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
            showEmo("👍🏼");
            setInvoiceTasks([]);
            setPaid(false);
            setInputName("");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error);
            } else {
                console.log(error);
            }
        }
    }
    return (
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
                    {invoiceTasks.map((element) => {
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
                            {invoiceProj ? <th>Time</th> : ""}
                            {invoiceProj ? <th>Remove</th> : ""}
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceTasksOptions.map((task, i: number) => {
                            roundedTime[i]
                                ? (totalSeconds += roundedTime[i] * 60)
                                : (totalSeconds += task.timeElapsed);
                            roundTimeMin = Math.round((task.timeElapsed / 60) * 100) / 100;
                            return (
                                <tr key={i}>
                                    <td className="taskinv">{task.title}</td>
                                    <td className="taskinv">
                                        {makeHours(
                                            roundedTime[i] ? roundedTime[i] * 60 : task.timeElapsed
                                        )}{" "}
                                        h<br />
                                        <span className="roundLinks2">
                                            ({roundedTime[i] ? roundedTime[i] : roundTimeMin} min)
                                        </span>
                                        <br />
                                        Round up{" "}
                                        <span
                                            className="roundLinks"
                                            onClick={() => {
                                                setRoundedTime((previous) => {
                                                    const newInputs: number[] = [...previous];
                                                    newInputs[i] = roundTime(
                                                        1,
                                                        Math.round((task.timeElapsed / 60) * 100) /
                                                            100,
                                                        task.id
                                                    );
                                                    return newInputs;
                                                });
                                            }}
                                        >
                                            1,
                                        </span>
                                        <span
                                            className="roundLinks"
                                            onClick={() => {
                                                setRoundedTime((previous) => {
                                                    const newInputs: number[] = [...previous];
                                                    newInputs[i] = roundTime(
                                                        5,
                                                        Math.round((task.timeElapsed / 60) * 100) /
                                                            100,
                                                        task.id
                                                    );
                                                    return newInputs;
                                                });
                                            }}
                                        >
                                            5,
                                        </span>
                                        <span
                                            className="roundLinks"
                                            onClick={() => {
                                                setRoundedTime((previous) => {
                                                    const newInputs: number[] = [...previous];
                                                    newInputs[i] = roundTime(
                                                        15,
                                                        Math.round((task.timeElapsed / 60) * 100) /
                                                            100,
                                                        task.id
                                                    );
                                                    return newInputs;
                                                });
                                            }}
                                        >
                                            15
                                        </span>
                                        <span className="or">or</span>
                                        <span
                                            className="roundLinks"
                                            onClick={() => {
                                                setRoundedTime((previous) => {
                                                    const newInputs: number[] = [...previous];
                                                    newInputs[i] = roundTime(
                                                        30,
                                                        Math.round((task.timeElapsed / 60) * 100) /
                                                            100,
                                                        task.id
                                                    );
                                                    return newInputs;
                                                });
                                            }}
                                        >
                                            30 min
                                        </span>
                                    </td>
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
                            checked={paid}
                        />
                    </div>
                    <div>Total time</div>
                    <div>{makeHours(totalSeconds)} hours</div>
                    <div>Total price</div>
                    <div>
                        {invoiceProj ? Math.ceil(makeHours(totalSeconds) * invoiceProj.price) : 0}{" "}
                        kr
                    </div>
                </div>
            </div>
            <button onClick={() => saveInvoice()}>Save</button>
        </div>
    );
}

export default CreateInvoice;
