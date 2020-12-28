import React, { useEffect, useState } from "react";
import "../styles/App.css";

const App = () => {
  const [minutes, setMinutes] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  const [seconds, setSeconds] = useState(0);
  const [newMinutes, setNewMinutes] = useState(minutes);
  const [newBreakDuration, setNewBreakDuration] = useState(breakDuration);
  const [durationTime, setDurationTime] = useState("Work-Time");
  const [start, setStart] = useState(true);
  const [stop, setStop] = useState(false);
  const [reset, setReset] = useState(true);

  const appendZero = (num) => {
    if (num < 10) return `0${num}`;
    return num;
  };

  useEffect(() => {
    if (!start) {
      const intervalId = setInterval(() => {
        if (Number(minutes) === 0 && Number(seconds) === 0) {
          if (durationTime === "Work-Time") {
            alert("work duration is over");
            setMinutes(breakDuration);
            setDurationTime("Break-Time");
          } else {
            alert("break duration is over");
            setMinutes(newMinutes);
            setDurationTime("Work-Time");
          }
        } else if (Number(seconds) === 0 && Number(minutes) > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else if (Number(seconds) > 0) {
          setSeconds(seconds - 1);
        }
      }, 1 * 1000);
      return () => clearInterval(intervalId);
    }
  });

  function resetHandler() {
    setNewMinutes(25);
    setBreakDuration(5);
    setMinutes(25);
    setSeconds(0);
    setNewBreakDuration(5);
  }

  function setHandler() {
    if (newMinutes !== 0 || newBreakDuration !== 0) {
      setMinutes(newMinutes);
      setSeconds(0);
      setBreakDuration(newBreakDuration);
    } else if (newBreakDuration !== 0) {
      setMinutes(newMinutes);
      setSeconds(0);
      setBreakDuration(newBreakDuration);
    } else {
      setNewMinutes(25);
      setBreakDuration(5);
      setMinutes(25);
      setSeconds(0);
      setNewBreakDuration(5);
    }
  }

  function stopHandler() {
    setStart(true);
  }

  return (
    <div id="main" style={{ textAlign: "center" }}>
      <div className="clock">
        <h1 className="timer">{`${appendZero(minutes)}:${appendZero(
          seconds
        )}`}</h1>
        <h3 className="duration">{durationTime}</h3>
      </div>
      <div className="controls">
        <button
          data-testid="start-btn"
          onClick={() => {
            setStart(false);
            setStop(true);
            setReset(false);
          }}
          disabled={!start}
        >
          Start
        </button>
        <button
          data-testid="stop-btn"
          onClick={() => {
            setStart(true);
            setStop(false);
            stopHandler();
          }}
          disabled={start}
        >
          Stop
        </button>
        <button
          data-testid="reset-btn"
          onClick={() => {
            setStart(true);
            setReset(true);
            resetHandler();
          }}
          disabled={reset || (stop && start)}
        >
          Reset
        </button>
      </div>
      <br />
      <div className="parameters">
        <form>
          <input
            data-testid="work-duration"
            placeholder="work-duration"
            required
            type="number"
            min="0"
            onChange={(e) => setNewMinutes(e.target.value)}
            value={newMinutes}
            disabled={!start}
          />
          <input
            data-testid="break-duration"
            placeholder="break-duration"
            required
            type="number"
            min="0"
            onChange={(e) => setNewBreakDuration(e.target.value)}
            value={newBreakDuration}
            disabled={!start}
          />
          <button
            data-testid="set-btn"
            type="button"
            onClick={setHandler}
            disabled={!start}
          >
            Set
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
