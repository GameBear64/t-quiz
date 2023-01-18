import React from 'react';

export default function DifficultySelect({ setMaxDifficulty }) {
  return (
    <div>
      <button onClick={() => setMaxDifficulty([1, 3])}>1 - 3</button>
      <button onClick={() => setMaxDifficulty([4, 6])}>4 - 6</button>
      <button onClick={() => setMaxDifficulty([7, 10])}>7 - 10</button>
    </div>
  );
}
