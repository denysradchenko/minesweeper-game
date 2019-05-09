import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import SettingsForm from './SettingsForm';
import Game from './Game';
import GameFieldGenerator from './services/GameFieldGenerator';
import GameOver from './GameOver';
import Winner from './Winner';

class App extends Component {
  state = {
    colsnum: 10,
    rowsnum: 10,
    difficulty: 1,
    field: null,
    startGame: false,
    gameOver: false,
    allCells: null,
    openedCells: 0,
    sensorFlag: false
  }

  GameFieldGenerator = new GameFieldGenerator();

  // Game settings
  handleInput = ({ target }) => {
    this.setState({
      [target.name]: parseInt(target.value)
    });
  }

  handleSensorFlag = () => {
    this.setState(prevState => ({
      sensorFlag: !prevState.sensorFlag
    }))
  }

  updateFieldSettigns = (number) => {
    const newSize = this.state.rowsnum + number;
    if (newSize > 20 || newSize < 10) return;
    this.setState({
      rowsnum: newSize,
      colsnum: newSize
    })
  }

  updateLevelSettings = (number) => {
    const newLevel = this.state.difficulty + number;
    if (newLevel > 3 || newLevel < 1) return;
    this.setState({
      difficulty: newLevel
    })
  }

  // New game launching
  handleForm = (e) => {
    e.preventDefault();
    const { colsnum, rowsnum, difficulty } = this.state;
    const game = this.GameFieldGenerator.generateField(colsnum, rowsnum, difficulty);
    this.setState(game)
  }

  // Right mouse button click (flag/unflag cell)
  handleRightClick = (e) => {
    e.preventDefault();
    const col = e.currentTarget.getAttribute('data-col');
    const row = e.currentTarget.getAttribute('data-row');
    const { field } = this.state;
    if (field[col][row].open) return; // if cell is already opened
    field[col][row].marked = !field[col][row].marked;
    this.setState({ field });
  }

  // Left mouse button click (opening of cell)
  handleLeftClick = (e) => {
    const col = e.currentTarget.getAttribute('data-col');
    const row = e.currentTarget.getAttribute('data-row');
    const { field, allCells, sensorFlag } = this.state;

    if (sensorFlag) {
      this.handleRightClick(e)
      return;
    }

    if (field[col][row].open || field[col][row].marked) return; // if cell is already opened or flagged

    if (field[col][row].value === 0) {
      this.setState({
        field: this.openAllCellsBeside(parseInt(col), parseInt(row), field)
      })
    }

    if (field[col][row].value === 'b') {
      this.openAllCells(col, row);
      this.setState({ gameOver: true });
      return;
    }

    field[col][row].open = true;
    const openedCells = this.countOpenedCells(field);
    if (allCells === openedCells) this.openAllCells();

    this.setState({ openedCells, field });
  }

  // Counting the number of already open cells
  countOpenedCells = (field) => {
    return field.reduce((acc, el) => {
      return acc + el.filter(cell => cell.open).length;
    }, 0)
  }

  // Opening of all cells beside the empty cell
  openAllCellsBeside = (c, r, f) => {
    const { colsnum, rowsnum } = this.state;
    let field = f;
    field[c][r].open = true;

    const openUnmarkCell = (x, y) => {
      field[x][y].open = true;
      field[x][y].marked = false;
      return;
    }

    const leftCol = c > 0;
    const rightCol = c < colsnum - 1;
    const topRow = r > 0;
    const bottomRow = r < rowsnum - 1;
    if (leftCol) {
      if (topRow) {
        if (field[c - 1][r - 1].value === 0 && !field[c - 1][r - 1].open) {
          field = this.openAllCellsBeside(c - 1, r - 1, field);
        } else {
          openUnmarkCell(c - 1, r - 1);
        }
      }

      if (field[c - 1][r].value === 0 && !field[c - 1][r].open) {
        field = this.openAllCellsBeside(c - 1, r, field);
      } else {
        openUnmarkCell(c - 1, r);
      }

      if (bottomRow) {
        if (field[c - 1][r + 1].value === 0 && !field[c - 1][r + 1].open) {
          field = this.openAllCellsBeside(c - 1, r + 1, field);
        } else {
          openUnmarkCell(c - 1, r + 1);
        }
      }
    }

    if (topRow) {
      if (field[c][r - 1].value === 0 && !field[c][r - 1].open) {
        field = this.openAllCellsBeside(c, r - 1, field);
      } else {
        openUnmarkCell(c, r - 1);
      }
    }
    if (bottomRow) {
      if (field[c][r + 1].value === 0 && !field[c][r + 1].open) {
        field = this.openAllCellsBeside(c, r + 1, field);
      } else {
        openUnmarkCell(c, r + 1);
      }
    }

    if (rightCol) {
      if (topRow) {
        if (field[c + 1][r - 1].value === 0 && !field[c + 1][r - 1].open) {
          field = this.openAllCellsBeside(c + 1, r - 1, field);
        } else {
          openUnmarkCell(c + 1, r - 1);
        }
      }

      if (field[c + 1][r].value === 0 && !field[c + 1][r].open) {
        field = this.openAllCellsBeside(c + 1, r, field);
      } else {
        openUnmarkCell(c + 1, r);
      }

      if (bottomRow) {
        if (field[c + 1][r + 1].value === 0 && !field[c + 1][r + 1].open) {
          field = this.openAllCellsBeside(c + 1, r + 1, field);
        } else {
          openUnmarkCell(c + 1, r + 1);
        }
      }
    }

    return field;
  }

  // Opening of all the cells in the game field
  openAllCells = (col = null, row = null) => {
    const { field, colsnum, rowsnum } = this.state;
    if (col !== null && row !== null) field[col][row].detonated = true;
    for (let i = 0; i < colsnum; i++) {
      for (let j = 0; j < rowsnum; j++) {
        field[i][j].open = true;
        if (col === null && row === null && field[i][j].value === 'b') {
          field[i][j].marked = true;
        }
      }
    }
    this.setState({ field })
  }

  newGame = () => {
    this.setState({
      startGame: false,
      gameOver: false,
      field: null,
      allCells: null,
      openedCells: 0,
      sensorFlag: false
    })
  }

  render() {
    const { colsnum, rowsnum, difficulty, startGame, field, gameOver, allCells, openedCells, sensorFlag } = this.state;
    return (
      <div className="App">
        {startGame ?
          <Game
            field={field}
            rowsnum={rowsnum}
            sensorFlag={sensorFlag}
            onContextMenu={this.handleRightClick}
            onClick={this.handleLeftClick}
            handleSensorFlag={this.handleSensorFlag}
          /> :
          <SettingsForm
            colsnum={colsnum}
            difficulty={difficulty}
            onChange={this.handleInput}
            onSubmit={this.handleForm}
            updateFieldSettigns={this.updateFieldSettigns}
            updateLevelSettings={this.updateLevelSettings}
          />
        }
        {gameOver ? <GameOver newGame={this.newGame} /> : null}
        {startGame && allCells === openedCells ? <Winner newGame={this.newGame} /> : null}
      </div>
    );
  }
}

export default App;
