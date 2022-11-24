import { useProjectContext } from "../contexts/ProjContext";
const host: string = "http://localhost:3000/";

function Invoices() {
    const { invoice, fetchData, deletePost } = useProjectContext();
    const now: Date = new Date();
    const year: string = now.getFullYear().toString();
    let totalCash: number = 0;

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
                    {invoice.map((element) => {
                        element.created_date.split("-")[0] === year
                            ? (totalCash += element.amount)
                            : (totalCash += 0);
                        return (
                            <tr key={`invoice_${element.id}`} className="container">
                                <td key={`status_${element.id}`}>
                                    {element.status === "Betald" ? "✅" : "⚠️"}
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
        </div>
    );
}

export default Invoices;
