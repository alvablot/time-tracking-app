import { useState, useEffect, Children } from "react";
import { Project, Task, Timelog } from "./lib/interfaces";
import { useProjectContext } from "./contexts/ProjContext";
import "./App.css";

function App() {
    const { project, setProject, task, setTask, timelog, setTimelog, fetchData } = useProjectContext();
    const [lastTasks, setLastTasks] = useState<Task[]>([]);
    useEffect(() => {
        fetchData("projects");
        fetchData("tasks");
        fetchData("timelogs");
        task.map((element, i) => {
            console.log(element.date);
            // newDates = element.date.split("-");
            // console.log(newDates[0]);
            // console.log(newDates[1]);
            // console.log(newDates[2]);
        });
    }, []);

    return (
        <div className="App">
            <h2>Projects</h2>
            {project.map((element) => {
                return (
                    <div key={`project_${element.id}`} className="container">
                        <div key={`name_${element.id}`}>Name {element.name}</div>
                        <div key={`color_${element.id}`}>Color {element.color}</div>
                        <div key={`id_${element.id}`}>Id {element.id}</div>
                    </div>
                );
            })}
            <h2>Tasks</h2>
            {task.map((element) => {
                return (
                    <div key={`taks_${element.id}`} className="container">
                        <div key={`date${element.id}`}>Date {element.date}</div>
                        <div key={`projectId${element.id}`}>Proj-id{element.projectId}</div>
                        <div key={`title${element.id}`}>Title {element.title}</div>
                        <div key={`start${element.id}`}>Start {element.start}</div>
                        <div key={`end${element.id}`}>End {element.end}</div>
                        <div key={`timeElapsed${element.id}`}>Duration {element.timeElapsed}</div>
                        <div key={`active${element.id}`}>Active {element.active}</div>
                        <div key={`task_id_${element.id}`}>Id {element.id}</div>
                    </div>
                );
            })}
            <h2>Timelogs</h2>
            {timelog.map((element) => {
                return (
                    <div key={`timelog_${element.id}`} className="container">
                        <div key={`taskId${element.id}`}>Task-id{element.taskId}</div>
                        <div key={`timeElapsed${element.id}`}>Duration {element.timeElapsed}</div>
                        <div key={`date2${element.id}`}>Date {element.date}</div>
                        <div key={`timelog_id_${element.id}`}>Id {element.id}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default App;
