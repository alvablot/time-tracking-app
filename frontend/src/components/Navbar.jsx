import React from "react";
import { Outlet, NavLink, Link, useLoaderData, Form, redirect } from "react-router-dom";

function Navbar() {
    return (
        <div>
            <nav className="crumbs">
                <ol>
                    <li className="crumb">
                    <NavLink
                            to={`/overview`}
                            className={({ isActive, isPending }) =>
                                isActive ? "active" : isPending ? "pending" : ""
                            }
                        >
                            overview
                        </NavLink>
                    </li>
                    <li className="crumb">
                    <NavLink
                            to={`/timer`}
                            className={({ isActive, isPending }) =>
                                isActive ? "active" : isPending ? "pending" : ""
                            }
                        >
                            timer
                        </NavLink>
                    </li>
                    <li className="crumb">
                        <NavLink
                            to={`/calender`}
                            className={({ isActive, isPending }) =>
                                isActive ? "active" : isPending ? "pending" : ""
                            }
                        >
                            calender
                        </NavLink>
                    </li>
                </ol>
            </nav>
        </div>
    );
}

export default Navbar;
