import React from 'react';
import Cell from './Cell';
import './Game.css'

const Game = (props) => {
  const cells = props.field.map((el, index) => {
    const result = [];

    for (let i = 0; i < el.length; i++) {
      const key = `${index}${i}`
      result.push(< Cell content={el[i]} key={key} />);
    }

    return <div className="column">{result}</div>;
  })
  return (
    <div className="Game">
      {cells}
    </div>
  );
}

export default Game;
