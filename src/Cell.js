import React from 'react';
import './Cell.css';

const Cell = ({ content }) => {
  const cellClass = content === 0 ? 'green-cell' : (content === 'b' ? 'red-cell' : 'blue-cell');
  return (
    <div className={cellClass}>
      {content}
    </div>
  );
}

export default Cell;
