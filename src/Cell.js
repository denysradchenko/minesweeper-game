import React from 'react';
import './Cell.css';

const Cell = ({ cell, onContextMenu, onClick, col, row }) => {

  let cellClass = cell.value === 0 ? 'green-cell' : (cell.value === 'b' ? 'red-cell' : 'blue-cell');

  if (!cell.open) cellClass = 'blocked-cell';
  if (cell.marked) cellClass = 'marked-cell';

  const cellValue = cell.open ?
    (cell.value === 0 ?
      null :
      (cell.detonated ?
        <i className="fa fa-bomb detonated"></i> :
        (cell.value === 'b' ?
          <i className="fa fa-bomb grey"></i> :
          cell.value
        )
      )
    ) :
    (cell.marked ?
      <i className="fa fa-flag red"></i> :
      null)

  return (
    <div className={cellClass} onContextMenu={onContextMenu} onClick={onClick} data-col={col} data-row={row}>
      <span className="cell-value">{cellValue}</span>
    </div>
  );
}

export default Cell;
