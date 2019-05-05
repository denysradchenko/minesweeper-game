import React from 'react';
import './GameOver.css';

const GameOver = ({ newGame }) => {
  return (
    <div className="GameOver">
      <p>Game Over
        <button className="btn btn-primary" onClick={newGame}>Try new game</button>
      </p>
    </div >
  );
}

export default GameOver;
