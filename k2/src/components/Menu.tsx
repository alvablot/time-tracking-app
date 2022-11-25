import { useProjectContext } from "../contexts/ProjContext";

function Menu() {
    const {
        showCreateInvoice,
        setShowCreateInvoice,
        showProjects,
        setShowProjects,
        showTasks,
        setShowTasks,
        showTasks30,
        setShowTasks30,
        showTimelogs,
        setShowTimelogs,
        showTimelogs30,
        setShowTimelogs30,
        showInvoices,
        setShowInvoices,
        showOverview,
        setShowOverview,
        setShowMenu,
        showMenu,
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
                        {showOverview === "block" ? (
                            <b className="roundLinks">Overview</b>
                        ) : (
                            "Overview"
                        )}
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
                        {showProjects === "block" ? (
                            <b className="roundLinks">Projects</b>
                        ) : (
                            "Projects"
                        )}
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
                            {showTasks30 === "block" ? (
                                <b className="roundLinks">Last 30 days</b>
                            ) : (
                                "Last 30 days"
                            )}
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
                            {showTasks === "block" ? <b className="roundLinks">All</b> : "All"}
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
                            {showTimelogs30 === "block" ? (
                                <b className="roundLinks">Last 30 days</b>
                            ) : (
                                "Last 30 days"
                            )}
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
                            {showTimelogs === "block" ? <b className="roundLinks">All</b> : "All"}
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
                            {showCreateInvoice === "block" ? (
                                <b className="roundLinks">Create new</b>
                            ) : (
                                "Create new"
                            )}
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
                            {showInvoices === "block" ? <b className="roundLinks">All</b> : "All"}
                        </a>
                    </li>
                </ul>
            </ul>
        </div>
    );
}

export default Menu;
