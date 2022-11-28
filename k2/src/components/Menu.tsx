import { useProjectContext } from "../contexts/ProjContext";
import { useState, useEffect } from "react";

function Menu() {
    const { setShowMenu, showMenu, showHideContent, setShowHideContent } = useProjectContext();
    let [linkTrigger, setLinkTrigger] = useState<boolean>(true);
    function toggleContent(index: number, all: boolean): void {
        const newArr: string[] = [];
        showHideContent.map((element, i) => {
            if (all) {
                newArr[i] = "block";
                setLinkTrigger(true);
            } else {
                if(index === i) newArr[index] = "block";
                else newArr[i] = "none";
                setLinkTrigger(false);
            }
        });
        setShowHideContent(newArr);
    }

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
                            toggleContent(-1, true);
                        }}
                    >
                        {linkTrigger ? (
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
                            toggleContent(0, false);
                        }}
                    >
                        {showHideContent[0] === "block" ? (
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
                                toggleContent(1, false);
                            }}
                        >
                            {showHideContent[1] === "block" ? (
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
                                toggleContent(2, false);
                            }}
                        >
                            {showHideContent[2] === "block" ? (
                                <b className="roundLinks">All</b>
                            ) : (
                                "All"
                            )}
                        </a>
                    </li>
                </ul>
                <li>Timelogs</li>
                <ul>
                    <li>
                        <a
                            href="#"
                            onClick={() => {
                                toggleContent(3, false);
                            }}
                        >
                            {showHideContent[3] === "block" ? (
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
                                toggleContent(4, false);
                            }}
                        >
                            {showHideContent[4] === "block" ? (
                                <b className="roundLinks">All</b>
                            ) : (
                                "All"
                            )}
                        </a>
                    </li>
                </ul>
                <li>Invoices</li>
                <ul>
                    <li>
                        <a
                            href="#"
                            onClick={() => {
                                toggleContent(6, false);
                            }}
                        >
                            {showHideContent[6] === "block" ? (
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
                                toggleContent(5, false);
                            }}
                        >
                            {showHideContent[5] === "block" ? (
                                <b className="roundLinks">All</b>
                            ) : (
                                "All"
                            )}
                        </a>
                    </li>
                </ul>
            </ul>
        </div>
    );
}

export default Menu;
