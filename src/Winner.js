import React from 'react';
import './Winner.css';

const Winner = ({ newGame }) => {
  return (
    <div className="Winner">
      <p>
        Congratulations, You won!
      <button className="btn btn-primary" onClick={newGame}>Try new game</button>
      </p>

    </div>
  );
}

export default Winner;
