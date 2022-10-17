import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import axios from "axios";
import "./App.css";

import Overview from "./pages/Overview";
import Timer from "./pages/Timer";
import Calender from "./pages/Calender";

function Root() {
    return (
        <div>
            <Outlet />
        </div>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "overview",
                element: <Overview />,
            },
            {
                path: "timer",
                element: <Timer />,
            },
            {
                path: "calender",
                element: <Calender />,
            },
            {
                path: "*",
                element: <Overview />,
            },
        ],
    },
]);

function App() {
    async function getData(e) {
        //e.preventDefault();
        try {
            const response = await axios.get("http://localhost:3000/projects/");
            console.log(response.data);
        } catch (error) {}
    }
    return (
        <div className="App">
            <button onClick={getData}>Tryck</button>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
