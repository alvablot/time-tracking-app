import { useProjectContext } from "../contexts/ProjContext";

function Menu() {
    const {
        setShowCreateInvoice,
        setShowProjects,
        setShowTasks,
        setShowTasks30,
        setShowTimelogs,
        setShowTimelogs30,
        setShowInvoices,
        setShowOverview,
        showMenu,
        setShowMenu,
    } = useProjectContext();
    return (
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
                            setShowOverview("block");
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
                            setShowOverview("none");
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
                                setShowOverview("none");
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
                                setShowOverview("none");
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
                                setShowOverview("none");
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
                                setShowOverview("none");
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
                                setShowOverview("none");
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
                                setShowOverview("none");
                            }}
                        >
                            All
                        </a>
                    </li>
                </ul>
            </ul>
        </div>
    );
}

export default Menu;
