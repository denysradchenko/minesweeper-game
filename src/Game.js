import React from 'react';
import Cell from './Cell';
import './Game.css'

const Game = (props) => {
  const cells = props.field.map((el, index) => {
    const result = [];

    const columWidth = {
      width: `calc(75vh/${props.rowsnum})`
    }

    for (let i = 0; i < el.length; i++) {
      const key = `${index}${i}`
      result.push(< Cell cell={el[i]} key={key} onContextMenu={props.onContextMenu} onClick={props.onClick} col={index} row={i} rowsnum={props.rowsnum} />);
    }

    return <div key={index} style={columWidth}>{result}</div>;
  })
  return (
    <div className="Game">
      {cells}
    </div>
  );
}

export default Game;
