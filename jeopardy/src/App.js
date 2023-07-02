import { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [points, setPoints] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const getQuestion = async () => {
    const response = await fetch("http://jservice.io/api/random");
    const data = await response.json();
    setQuestion(data[0].question);
    setCategory(data[0].category.title);
    setPoints(data[0].value);
    setAnswer(data[0].answer);
    setShowAnswer(false);
  };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleAddPoints = () => {
    setScore(score + points);
  };

  const handleSubtractPoints = () => {
    setScore(score - points);
  };

  return (
    <div>
      <div className="questionDiv">
        <h1>Jeopardy</h1>
        <div className="getQuestion">
          <button onClick={getQuestion} className="questionButton">Press For Question</button>
        </div>
        <h4>Category: {category} </h4>
        <h4>Points: {points}</h4>
        <h2>{question}</h2>
        {showAnswer && <p className="answer">{answer.toUpperCase()}</p>}
        <button onClick={handleShowAnswer} className="answerButton">
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
      </div>
      <div>
        <h2>
          Score: <span>{score}</span>
        </h2>
        <div className="points">
        <button onClick={handleAddPoints}>Add Points</button>
        <button onClick={handleSubtractPoints}>Subtract Points</button>
        </div>
      </div>


    </div>
  );
}

export default App;