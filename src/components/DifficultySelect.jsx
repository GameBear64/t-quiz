import React from 'react';

export default function DifficultySelect({ setMaxDifficulty }) {
  return (
    <div>
      <button onClick={() => setMaxDifficulty(3)}>1 - 3</button>
      <button onClick={() => setMaxDifficulty(6)}>4 - 6</button>
      <button onClick={() => setMaxDifficulty(10)}>7 - 10</button>
    </div>
  );
}
