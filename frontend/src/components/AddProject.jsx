import { useState, useEffect, useContext } from "react";
import axios from "axios";
const host = "http://localhost:3000/";

function AddProject(props) {
    const [projectName, setProjectName] = useState("");
    const [color, setColor] = useState("#7d34dc");
    const [showHideProjectInput, setShowHideProjectInput] = useState("hidden");
    const [createButton, setCreateButton] = useState("visible");
    let [errorMsg, setErrorMsg] = useState("");
    async function postProject(e) {
        let id = new Date();
        id = Math.round(id.getTime() * (Math.random() * 666));
        try {
            const response = await axios.post(`${host}projects`, {
                id: id,
                name: projectName,
                color: color,
            });
            props.getData("projects");
        } catch (error) {
            console.log(error);
        }
    }
    async function viewInput(element) {
        if (element === "create") {
            setShowHideProjectInput("visible");
            setCreateButton("hidden");
        }
        if (element === "abort") {
            setShowHideProjectInput("hidden");
            setCreateButton("visible");
        }
    }
    return (
        <div>
            <div className={showHideProjectInput}>
                Name
                <br />
                <input
                    onChange={(e) => setProjectName(e.target.value)}
                    name="name"
                    type="text"
                    style={{ borderColor: color }}
                    value={projectName}
                />
                <br />
                <input
                    onChange={(e) => setColor(e.target.value)}
                    name="color"
                    type="hidden"
                    value={color}
                />
                <div
                    className="color-cube blue"
                    onClick={() => {
                        setColor("#5650ff");
                    }}
                ></div>
                <div
                    className="color-cube purple"
                    onClick={() => {
                        setColor("#af3bee");
                    }}
                ></div>
                <div
                    className="color-cube yellow"
                    onClick={() => {
                        setColor("#e3da3b");
                    }}
                ></div>
                <div
                    className="color-cube green"
                    onClick={() => {
                        setColor("#34dc3a");
                    }}
                ></div>
                <div
                    className="color-cube red"
                    onClick={() => {
                        setColor("#fb3a64");
                    }}
                ></div>
                <div
                    className="color-cube pink"
                    onClick={() => {
                        setColor("#fc83cc");
                    }}
                ></div>
                <div
                    className="color-cube orange"
                    onClick={() => {
                        setColor("#ffb651");
                    }}
                ></div>
                <br />
                <button onClick={postProject}>Add project</button>
                <button
                    onClick={() => {
                        viewInput("abort");
                    }}
                >
                    Abort
                </button>
            </div>
            <button
                className={createButton}
                onClick={() => {
                    viewInput("create");
                }}
            >
                Create new project
            </button>
        </div>
    );
}
export default AddProject;
