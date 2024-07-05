import { useEffect } from "react";

function Timer({ dispatch, second }) {
  const mins = Math.floor(second / 60);
  const seconds = second % 60;

  useEffect(
    function () {
      const idInterval = setInterval(function () {
        dispatch({ type: "timer" });
      }, 1000);

      //   The Clean up Function
      return () => clearInterval(idInterval);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;

// the reason the effect is placed in the timer component is that the timer is set when the status is already active
