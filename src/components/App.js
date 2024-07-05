import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState = {
  questions: [],

  // Loading, Error, Ready, Active, Finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  second: 0,
};
const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "active":
      return {
        ...state,
        status: "active",
        second: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        question: state.question,
      };
    case "timer":
      return {
        ...state,
        second: state.second - 1,
        status: state.second === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action Unkonwn");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions } = state;
  const { status } = state;
  const { index } = state;
  const { answer } = state;
  const { points } = state;
  const { highscore } = state;
  const { second } = state;
  const numQuestion = questions.length;
  const maxPossiblePoint = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    async function fatchingFakeAPI() {
      try {
        const res = await fetch("http://localhost:9000/questions");
        if (!res.ok) throw new Error("Something went wrong with fatching data");

        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: "dataFailed" });
      }
    }
    fatchingFakeAPI();
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestion={numQuestion}
              points={points}
              maxPossiblePoint={maxPossiblePoint}
              answer={answer}
            />
            <Question
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} second={second} />
              {state.answer !== null ? (
                <NextButton
                  dispatch={dispatch}
                  numQuestion={numQuestion}
                  index={index}
                />
              ) : null}
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            highscore={highscore}
            maxPossiblePoints={maxPossiblePoint}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
