import { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [points, setPoints] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const getQuestion = async () => {
    const response = await fetch("http://jservice.io/api/random");
    const data = await response.json();
    setQuestion(data[0].question);
    setCategory(data[0].category.title);
    setPoints(data[0].value);
    setAnswer(data[0].answer.toLowerCase());
    setShowAnswer(false);
    setFeedback("");
    setUserAnswer(""); // Reset the user's answer input
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleUserAnswerChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmitAnswer = (event) => {
    event.preventDefault();
    const formattedUserAnswer = userAnswer.toLowerCase();
    if (formattedUserAnswer === answer) {
      setScore(score + points);
      setFeedback(`Correct! You got ${points} points.`);
    } else {
      setFeedback("That answer is incorrect.");
    }
    setShowAnswer(true);
    setUserAnswer(""); // Reset the user's answer input
  };

  return (
    <div>
      <div className="questionDiv">
        <h1>Jeopardy</h1>
        <div className="getQuestion">
          <button onClick={getQuestion} className="questionButton">
           New Question
          </button>
        </div>
        <h4>Category: {category}</h4>
        <h4>Points: {points}</h4>
        <h2>{question}</h2>
        {showAnswer && <p className="answer">{answer.toUpperCase()}</p>}
        {!showAnswer && (
          <form onSubmit={handleSubmitAnswer}>
            <h3>
              Guess the Answer:
              <input
                type="text"
                value={userAnswer}
                onChange={handleUserAnswerChange}
                className="answerInput"
              />
            </h3>
            <button type="submit">Submit Answer</button>
          </form>
        )}
        {feedback && <p className="feedback">{feedback}</p>}
      </div>
      <div>
        <h2>
          Score: <span>{score}</span>
        </h2>
      </div>
    </div>
  );
}

export default App;
