import React, { useEffect, useState } from 'react';

import './App.css';

import DifficultySelect from './components/DifficultySelect';
import questions from './assets/questions.json'; // i have my data in a separate file

function App() {
  const [maxDifficulty, setMaxDifficulty] = useState(null); // this will be an array with 2 items [minimum, maximum]
  const [currentQuestion, setCurrentQuestion] = useState(null); // this will save the chosen question state
  const [displayAnswer, setDisplayAnswer] = useState(false); // this determines if we should show the answer

  // this choses a random question when maxDifficulty changes (becomes a value [] or null)
  useEffect(() => {
    pickQuestion();
  }, [maxDifficulty]);

  function pickQuestion() {
    // here we filter out the question by 2 conditions, difficulty more or equal (>=) than the minimum ([0]) and difficulty less or equal (<=) than the maximum ([1])
    let availableQuestions = questions.filter(q => q.difficulty >= maxDifficulty?.[0] && q.difficulty <= maxDifficulty?.[1]);

    // if we already have a question, exclude it from the available ones (to avoid picking the same question twice)
    if (currentQuestion) availableQuestions = availableQuestions.filter(que => que.question !== currentQuestion.question);

    // chose a random question from the available ones and set it as currentQuestion
    let chosenQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    setCurrentQuestion(chosenQuestion);
  }

  // notice what "hardReset" is doing and why we have a default value for it
  function resetQuestion(hardReset = false) {
    pickQuestion();
    setDisplayAnswer(false);
    if (hardReset) setMaxDifficulty(null);
  }

  // this function returns a jsx element conditionally, take some time to follow the logic
  function controlButtons() {
    if (!maxDifficulty) return <DifficultySelect setMaxDifficulty={setMaxDifficulty} />;

    if (!displayAnswer) return <button onClick={() => setDisplayAnswer(true)}>Show answer</button>;

    if (maxDifficulty && displayAnswer)
      // using fragments (<></>) is good when you don't really want a <div> but you need to return multiple elements
      // btw you cant return multiple elements in 1 return, it don't like arrays
      return (
        <>
          <button onClick={() => resetQuestion()}>Next Question</button>
          <button onClick={() => resetQuestion(true)}>Exit</button>
        </>
      );
  }

  return (
    <div className="App">
      <h1>{currentQuestion?.question || 'Chose difficulty:'}</h1>
      {maxDifficulty && <p>Difficulty: {currentQuestion?.difficulty}</p>}
      {controlButtons()}
      {displayAnswer && (
        <>
          <h2>Answer:</h2>
          <p>{currentQuestion?.answer}</p>
        </>
      )}
    </div>
  );
}

export default App;
