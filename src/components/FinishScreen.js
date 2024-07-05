function FinishScreen({ dispatch, points, maxPossiblePoints, highscore }) {
  const percentage = Math.ceil((points / maxPossiblePoints) * 100);

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "👉👈";
  if (percentage > 0 && percentage < 50) emoji = "🥶";
  if (percentage === 0) emoji = "STUPID";
  return (
    <>
      <p className="result">
        {emoji} You Scored <strong>{points}</strong> out of {maxPossiblePoints}{" "}
        ({percentage}%)
      </p>
      <p className="highscore">HightScore : {highscore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
