import { React, useState, useEffect, Children } from "react";
import DateObject from "react-date-object";
import Navbar from "../components/Navbar";
import { useProjectContext } from "../context/ProjectContext";
import axios from "axios";
const host = "http://localhost:3000/";

function Calender() {
  const providerValue = useProjectContext();
  const { timelogs, getTimelogs } = useProjectContext();
  const date = new DateObject();
  const [today, setToday] = useState(date.format("YYYY-MM-DD"));

  async function deleteObject(element, id) {
    try {
      const response = await axios.delete(`${host}${element}/${id}`);
      getTimelogs();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getTimelogs();
  }, [today]);

  return (
    <div>
      <h1>Calender</h1>
      Filter timelogs by date
      <br />
      <input
        type="date"
        onChange={(e) => {
          setToday(e.target.value);
        }}
        value={today}
      />
      <div className="visible">
        {timelogs
          .filter((timelog) => timelog.date === today)
          .map((timelog) => {
            return (
              <div key={`timelog_${timelog.id}`} className="calender">
                <span className="calender-item">
                  <strong>{timelog.date}</strong>
                </span>
                <span className="calender-item">Timer id {timelog.id}</span><br />
                <span className="calender-item">
                  Duration: {timelog.timeElapsed}
                </span><br />
                <button
                  className="calender-button"
                  onClick={() => {
                    deleteObject("timelogs", timelog.id);
                  }}
                >
                  x
                </button>
              </div>
            );
          })}
      </div>
      <Navbar />
    </div>
  );
}

export default Calender;
