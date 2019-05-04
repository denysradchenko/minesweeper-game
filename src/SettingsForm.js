import React from 'react';
import './SettingsForm.css';

const SettingsForm = ({ colsnum, rowsnum, difficulty, onChange, onSubmit }) => {
  return (
    <form action="" className="input-form" onSubmit={onSubmit}>
      <label><span>Number of cols:</span><input type="number" name="colsnum" value={colsnum} onChange={onChange} /></label>
      <label><span>Number of rows:</span><input type="number" name="rowsnum" value={rowsnum} onChange={onChange} /></label>
      <label><span>Difficulty:</span>
        <select name="difficulty" onChange={onChange} value={difficulty} >
          <option value="1">easy</option>
          <option value="2">medium</option>
          <option value="3">hard</option>
        </select>
      </label>
      <button>Start game</button>
    </form>
  );
}

export default SettingsForm;
