import React, { useEffect, useState } from "react";
import "../styles/App.css";

const App = () => {
  const [minutes, setMinutes] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [newMinutes, setNewMinutes] = useState(minutes);
  const [newBreakDuration, setNewBreakDuration] = useState(breakDuration);
  const [durationTime, setDurationTime] = useState("Work");
  const [start, setStart] = useState(true);
  const [stop, setStop] = useState(false);
  const [reset, setReset] = useState(true);

  const appendZero = (num) => {
    if (num < 10) return `0${num}`;
    return num;
  };

  useEffect(() => {
    if (!start) {
      let intervalId = setInterval(() => {
        if (Number(minutes) === 0 && Number(seconds) === 0) {
          console.log(seconds);
          if (durationTime === "Work") {
            alert("work duration is over");
            setMinutes(breakDuration);
            setSeconds(0);
            setDurationTime("Break");
          } else {
            alert("break duration is over");
            setMinutes(newMinutes);
            setSeconds(0);
            setDurationTime("Work");
          }
        } else if (Number(seconds) > 0) {
          setSeconds(seconds - 1);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  });

  // useEffect(() => {
  //   if (!start && durationTime === "Work") {
  //     if (seconds > 0) {
  //       const timer = setTimeout(() => {
  //         setSeconds(seconds - 1);
  //       }, 1000);
  //       return () => clearTimeout(timer);
  //     }
  //     if (seconds === 0 && minutes === 0) {
  //       setDurationTime("Break");
  //       setMinutes(breakDuration);
  //       alert("work duration is over");
  //     } else {
  //       setMinutes(minutes - 1);
  //       setSeconds(59);
  //     }
  //   }
  //   if (!start && durationTime === "Break") {
  //     if (seconds > 0) {
  //       const timer = setTimeout(() => {
  //         setSeconds(seconds - 1);
  //       }, 1000);
  //       return () => clearTimeout(timer);
  //     }
  //     if (seconds === 0 && minutes === 0) {
  //       setDurationTime("Work");
  //       setMinutes(newMinutes);
  //       alert("break duration is over");
  //     } else {
  //       setMinutes(minutes - 1);
  //       setSeconds(59);
  //     }
  //   }
  // }, [seconds, minutes, durationTime, start, stop]);

  function resetHandler() {
    setNewMinutes(25);
    setBreakDuration(5);
    setMinutes(25);
    setSeconds(0);
    setNewBreakDuration(5);
    setDurationTime("Work");
  }

  function setHandler() {
    if (newMinutes != 0 || newBreakDuration != 0) {
      setMinutes(newMinutes);
      setSeconds(0);
      setBreakDuration(newBreakDuration);
      setDurationTime("Work");
    } else {
      resetHandler();
    }
  }

  function stopHandler() {
    setStart(true);
  }

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <div className="clock">
        <h1 className="timer">{`${appendZero(minutes)}:${appendZero(
          seconds
        )}`}</h1>
        <h3>{durationTime}-Time</h3>
      </div>
      <div className="controls">
        <button
          data-testid="start-btn"
          key="start"
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
          key="stop"
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
          key="reset"
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
            type="Number"
            min="0"
            onChange={(e) => setNewMinutes(e.target.value)}
            value={newMinutes}
            disabled={!start}
          />
          <input
            data-testid="break-duration"
            placeholder="break-duration"
            required
            type="Number"
            min="0"
            onChange={(e) => setNewBreakDuration(e.target.value)}
            value={newBreakDuration}
            disabled={!start}
          />
          <button
            data-testid="set-btn"
            key="set"
            type="button"
            onClick={() => {
              setReset(false);
              setHandler();
            }}
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


