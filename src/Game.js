import React from 'react';
import Cell from './Cell';
import './Game.css'

const Game = (props) => {
  const cells = props.field.map((el, index) => {
    const result = [];

    for (let i = 0; i < el.length; i++) {
      const key = `${index}${i}`
      result.push(< Cell cell={el[i]} key={key} onContextMenu={props.onContextMenu} onClick={props.onClick} col={index} row={i} rowsnum={props.rowsnum} />);
    }

    return <div key={index} className="column">{result}</div>;
  });

  const cellFontSize = props.rowsnum === 10 ? '200%' : (props.rowsnum === 15 ? '150%' : '100%');

  const gameStyle = {
    fontSize: cellFontSize,
  }

  return (
    <div className="Game" style={gameStyle}>
      {cells}
    </div>
  );
}

export default Game;
