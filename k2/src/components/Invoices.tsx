import { useEffect, useState } from "react";
import { useProjectContext } from "../contexts/ProjContext";
import { Project, Task, Invoice } from "../lib/interfaces";
const host: string = "http://localhost:3000/";
const now: Date = new Date();
const thisYear: number = now.getFullYear();

function Invoices() {
    const [monthlyAmount, setMonthlyAmount] = useState<number[]>([]);
    const monthAmountArr: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const { invoice, fetchData, deletePost, get30B, emo } = useProjectContext();
    const now: Date = new Date();
    const year: string = now.getFullYear().toString();
    let filteredYear: number[];
    let totalCash: number = 0;
    let result: string[] = [];
    function checkStatus(status: string, days: number): string[] {
        if (status === "Betald") {
            result[0] = "✅";
            result[1] = "PAID!";
        } else if (status === "Ej betald" && days > 0) {
            result[0] = "⚠️";
            result[1] = "LATE!";
        } else if (status === "Ej betald") {
            result[0] = "⏱";
            result[1] = "NOT YET PAID!";
        }
        return result;
    }
    function calculateMonth(date: string, amount: number): number[] {
        const year: number = parseInt(date.split("-")[0]);
        const month: number = parseInt(date.split("-")[1]);

        if (year === thisYear) {
            if (month === 1) monthAmountArr[0] += amount;
            if (month === 2) monthAmountArr[1] += amount;
            if (month === 3) monthAmountArr[2] += amount;
            if (month === 4) monthAmountArr[3] += amount;
            if (month === 5) monthAmountArr[4] += amount;
            if (month === 6) monthAmountArr[5] += amount;
            if (month === 7) {
                // console.log(month);
                monthAmountArr[6] += amount;
            }
            if (month === 8) monthAmountArr[7] += amount;
            if (month === 9) monthAmountArr[8] += amount;
            if (month === 10) monthAmountArr[9] += amount;
            if (month === 11) monthAmountArr[10] += amount;
            if (month === 12) monthAmountArr[11] += amount;
        }
        setMonthlyAmount(monthAmountArr);
        return monthAmountArr;
    }

    useEffect(() => {
        invoice.map((element, i) => {
            calculateMonth(element.created_date, element.amount);
        });
    }, [invoice, emo]);

    // useEffect(() => {
    //     console.log(monthlyAmount);
    // }, [monthlyAmount]);

    return (
        <div>
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
                    {invoice.map((element, i) => {
                        const status: string[] = checkStatus(
                            element.status,
                            get30B(element.due_date)
                        );

                        element.created_date.split("-")[0] === year
                            ? (totalCash += element.amount)
                            : (totalCash += 0);
                        return (
                            <tr key={`invoice_${element.id}`} className="container">
                                <td key={`status_${element.id}`} className="status">
                                    <a className="status" title={status[1]}>
                                        {status[0]}
                                    </a>
                                </td>
                                <td key={`customer_name_${element.id}`}>{element.customer_name}</td>
                                <td key={`due_date_${element.id}`}>{element.due_date}</td>
                                <td key={`amount_${element.id}`}>{element.amount} kr</td>
                                <td key={`delete4_${element.id}`}>
                                    <button
                                        onClick={() => {
                                            deletePost(element.id, "invoices");
                                            fetchData("invoices");
                                        }}
                                    >
                                        x
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td className="totalCash" colSpan={8}>
                            <b>
                                Total amount {year}: <u>{totalCash}</u> kr
                            </b>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="dia-container">
                {monthlyAmount.map((month, i) => {
                    return (
                        <div key={i} style={{ height: month / 10 + 50 }}>
                            <span className="twisted-text"> </span>
                        </div>
                    );
                })}
            </div>
            <div className="dia-container2">
                {monthlyAmount.map((month, i) => {
                    return (
                        <div key={`a${i}`}>
                            <span key={`b${i}`} className="twisted-text">
                                {month}&nbsp;kr
                            </span>
                        </div>
                    );
                })}
            </div>
            <div className="dia-container2">
                <div>JAN</div>
                <div>FEB</div>
                <div>MAR</div>
                <div>APR</div>
                <div>MAY</div>
                <div>JUN</div>
                <div>JUL</div>
                <div>AUG</div>
                <div>SEP</div>
                <div>OCT</div>
                <div>NOV</div>
                <div>DEC</div>
            </div>
        </div>
    );
}

export default Invoices;
