import React from "react";

function Navbar() {
    return (
        <div>
            <nav className="crumbs">
                <ol>
                    <li className="crumb"><a></a></li>
                    <li className="crumb">
                        <a href="/oveview">Overview</a>
                    </li>
                    <li className="crumb">
                        <a href="/timer">Timer</a>
                    </li>
                    <li className="crumb">
                        <a href="/calender">Calender</a>
                    </li>
                </ol>
            </nav>
        </div>
    );
}

export default Navbar;
