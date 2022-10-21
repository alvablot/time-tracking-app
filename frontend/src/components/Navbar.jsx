import { React } from "react";

function Navbar() {
    return (
        <div>
            <nav className="crumbs">
                <button
                    className="crumb"
                    onClick={(e) => {
                        window.location = "/oveview";
                    }}
                >
                    Overview
                </button>
                <button
                    className="crumb"
                    onClick={(e) => {
                        window.location = "/timer";
                    }}
                >
                    Timer
                </button>
                <button
                    className="crumb"
                    onClick={(e) => {
                        window.location = "/calender";

                    }}
                >
                    Calender
                </button>
            </nav>
        </div>
    );
}

export default Navbar;
