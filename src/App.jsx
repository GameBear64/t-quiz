import React, { useEffect, useState } from 'react';

import './App.css';

import DifficultySelect from './components/DifficultySelect';
import questions from './assets/questions.json';

function App() {
  const [maxDifficulty, setMaxDifficulty] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [displayAnswer, setDisplayAnswer] = useState(false);

  useEffect(() => {
    pickQuestion();
  }, [maxDifficulty]);

  function pickQuestion() {
    let availableQuestions = questions.filter(q => q.difficulty <= maxDifficulty);
    let chosenQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    setCurrentQuestion(chosenQuestion);
  }

  function resetQuestion(hardReset = false) {
    pickQuestion();
    setDisplayAnswer(false);
    if (hardReset) setMaxDifficulty(null);
  }

  function controlButtons() {
    if (!maxDifficulty) return <DifficultySelect setMaxDifficulty={setMaxDifficulty} />;

    if (!displayAnswer) return <button onClick={() => setDisplayAnswer(true)}>Show answer</button>;

    if (maxDifficulty && displayAnswer)
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
