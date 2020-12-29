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
              setHandler;
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

// import React, { useState, useEffect } from "react";

// function App() {
//   const [workingdurations, Setworkintimes] = useState(25);
//   const [breakDuration, setRestTime] = useState(5);
//   const [flag, setFlag] = useState(false);
//   const [worksecond, setWorkinSecs] = useState(1500);
//   const [breaksecond, setBreakSecs] = useState(300);
//   const [currentStateofEmp, setCurrentStatus] = useState("work");
//   const [resetFlag, ResetFlag] = useState(true);

//   useEffect(() => {
//     if (flag && currentStateofEmp === "work") {
//       if (worksecond > 0) {
//         const timer = setTimeout(() => {
//           setWorkinSecs(worksecond - 1);
//         }, 1000);
//         return () => clearTimeout(timer);
//       }
//       if (worksecond === 0) {
//         setCurrentStatus("break");
//         setWorkinSecs(workingdurations * 60);
//         alert("work duration is over");
//       }
//     }
//     if (flag && currentStateofEmp === "break") {
//       if (breaksecond > 0) {
//         const timer = setTimeout(() => {
//           setBreakSecs(breaksecond - 1);
//         }, 1000);
//         return () => clearTimeout(timer);
//       }
//       if (breaksecond === 0) {
//         setBreakSecs(breakDuration * 60);
//         alert("break duration is over");
//         setCurrentStatus("work");
//       }
//     }
//   }, [
//     workingdurations,
//     breakDuration,
//     breaksecond,
//     flag,
//     currentStateofEmp,
//     worksecond,
//   ]);

//   function reset() {
//     console.log("INSIDE RESET");
//     ResetFlag(true);
//     setFlag(false);
//     setCurrentStatus("work");
//     Setworkintimes(25);
//     setRestTime(5);
//     setBreakSecs(300);
//     setWorkinSecs(1500);
//   }
//   const sectomins = (secs) => {
//     console.log(secs);
//     // console.log(parseInt(secs/60))
//     // console.log(parseInt(secs%60))
//     let minis = parseInt(secs / 60) + "";
//     let secos = parseInt(secs % 60) + "";
//     if (minis.length === 1) {
//       minis = "0" + minis;
//     }
//     if (secos.length === 1) {
//       secos = "0" + secos;
//     }
//     return minis + ":" + secos;
//   };
//   const validateData = (d) => {
//     try {
//       if (!isNaN(d) && parseInt(d) >= 0) {
//         return parseInt(d);
//       } else return "";
//     } catch (err) {}
//   };
//   const setEnteredTime = (e) => {
//     console.log(e);
//     if (breakDuration + workingdurations <= 0) {
//       reset();
//       return;
//     }
//     ResetFlag(false);
//     setCurrentStatus("work");
//     setWorkinSecs(workingdurations * 60);
//     setBreakSecs(breakDuration * 60);
//   };
//   return (
//     <div className="App" style={{ textAlign: "center" }}>
//       <div className="clock">
//         <h1 className="timer">
//           {currentStateofEmp === "work"
//             ? sectomins(worksecond)
//             : sectomins(breaksecond)}
//         </h1>
//         <h3>{currentStateofEmp === "work" ? "Work" : "Break"}-Time</h3>
//       </div>
//       <div>
//         <button
//           data-testid="stop-btn"
//           key="stop"
//           onClick={() => {
//             setFlag(false);
//             ResetFlag(false);
//           }}
//           disabled={!flag}
//         >
//           Stop
//         </button>
//         <button
//           data-testid="start-btn"
//           key="start"
//           onClick={() => {
//             setFlag(true);
//             ResetFlag(false);
//           }}
//           disabled={flag}
//         >
//           start
//         </button>
//         <button
//           data-testid="reset-btn"
//           key="reset"
//           onClick={() => {
//             reset();
//           }}
//           disabled={resetFlag}
//         >
//           Reset
//         </button>
//       </div>
//       <br></br>
//       <div>
//         <input
//           data-testid="work-duration"
//           placeholder="work duration"
//           required
//           type="Number"
//           value={workingdurations}
//           disabled={flag}
//           onChange={(e) => Setworkintimes(validateData(e.target.value))}
//         ></input>
//         <input
//           data-testid="break-duration"
//           placeholder="break duration"
//           required
//           type="Number"
//           value={breakDuration}
//           disabled={flag}
//           onChange={(e) => setRestTime(validateData(e.target.value))}
//         ></input>
//         <button
//           onClick={setEnteredTime}
//           data-testid="set-btn"
//           type="submit"
//           disabled={flag}
//         >
//           set
//         </button>
//       </div>
//     </div>
//   );
// }
// export default App;
