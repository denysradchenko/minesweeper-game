import React from 'react';
import './SettingsForm.css';

const SettingsForm = ({ colsnum, difficulty, onSubmit, updateFieldSettigns, updateLevelSettings }) => {

  const difficultyValue = difficulty === 1 ? 'easy' : (difficulty === 2 ? 'medium' : 'hard');
  const fieldSizeValue = `${colsnum}x${colsnum}`;

  return (
    <form action="" className="input-form" onSubmit={onSubmit}>
      <h1>Minesweeper</h1>

      <label>
        <div>Field size</div>
        <div>
          <i className="fa fa-chevron-left" onClick={() => updateFieldSettigns(-5)}></i>
          {fieldSizeValue}
          <i className="fa fa-chevron-right" onClick={() => updateFieldSettigns(5)}></i>
        </div>
      </label>
      <label>
        <div>Difficulty</div>
        <div>
          <i className="fa fa-chevron-left" onClick={() => updateLevelSettings(-1)}></i>
          <span>{difficultyValue}</span>
          <i className="fa fa-chevron-right" onClick={() => updateLevelSettings(1)}></i>
        </div>
      </label>

      <button className="btn btn-success">Start game</button>
    </form>
  );
}

export default SettingsForm;
