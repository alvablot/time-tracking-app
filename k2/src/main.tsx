import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProjectProvider } from "./contexts/ProjContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ProjectProvider>
        <App />
    </ProjectProvider>
);
