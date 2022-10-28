import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

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
    errorElement: <Overview />,
    children: [
      {
        path: "",
        element: <Overview />,
      },
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
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
