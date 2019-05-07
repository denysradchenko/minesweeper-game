import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
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
    openedCells: 0
  }

  GameFieldGenerator = new GameFieldGenerator();

  handleInput = ({ target }) => {
    this.setState({
      [target.name]: parseInt(target.value)
    });
  }

  handleForm = (e) => {
    e.preventDefault();
    const { colsnum, rowsnum, difficulty } = this.state;
    const game = this.GameFieldGenerator.generateField(colsnum, rowsnum, difficulty);
    this.setState(game)
  }

  handleRightClick = (e) => {
    e.preventDefault();
    const col = e.currentTarget.getAttribute('data-col');
    const row = e.currentTarget.getAttribute('data-row');
    const { field } = this.state;
    field[col][row].marked = !field[col][row].marked;
    this.setState({ field });
  }

  handleLeftClick = (e) => {
    const col = e.currentTarget.getAttribute('data-col');
    const row = e.currentTarget.getAttribute('data-row');
    const { field, allCells } = this.state;

    if (field[col][row].open) return;

    field[col][row].open = true;
    this.setState({ field });
    if (field[col][row].value === 'b') {
      this.openAllCells(col, row);
      this.setState({ gameOver: true });
      return;
    }

    if (field[col][row].value === 0) {
      this.setState({
        field: this.openAllGreenCells(parseInt(col), parseInt(row), field)
      })
    }

    const openedCells = this.countOpenedCells(field);
    if (allCells === openedCells) this.openAllCells();
    this.setState({ openedCells });

  }

  countOpenedCells = (field) => {
    return field.reduce((acc, el) => {
      return acc + el.filter(cell => cell.open).length;
    }, 0)
  }

  openAllGreenCells = (c, r, f) => {
    const { colsnum, rowsnum } = this.state;
    let field = f;

    const leftCol = c > 0;
    const rightCol = c < colsnum - 1;
    const topRow = r > 0;
    const bottomRow = r < rowsnum - 1;
    if (leftCol) {
      if (topRow) {
        if (field[c - 1][r - 1].value === 0 && !field[c - 1][r - 1].open) {
          field[c - 1][r - 1].open = true;
          field = this.openAllGreenCells(c - 1, r - 1, field);
        } else {
          field[c - 1][r - 1].open = true;
        }
      }

      if (field[c - 1][r].value === 0 && !field[c - 1][r].open) {
        field[c - 1][r].open = true;
        field = this.openAllGreenCells(c - 1, r, field);
      } else {
        field[c - 1][r].open = true;
      }

      if (bottomRow) {
        if (field[c - 1][r + 1].value === 0 && !field[c - 1][r + 1].open) {
          field[c - 1][r + 1].open = true;
          field = this.openAllGreenCells(c - 1, r + 1, field);
        } else {
          field[c - 1][r + 1].open = true;
        }
      }
    }

    if (topRow) {
      if (field[c][r - 1].value === 0 && !field[c][r - 1].open) {
        field[c][r - 1].open = true;
        field = this.openAllGreenCells(c, r - 1, field);
      } else {
        field[c][r - 1].open = true;
      }
    }
    if (bottomRow) {
      if (field[c][r + 1].value === 0 && !field[c][r + 1].open) {
        field[c][r + 1].open = true;
        field = this.openAllGreenCells(c, r + 1, field);
      } else {
        field[c][r + 1].open = true;
      }
    }

    if (rightCol) {
      if (topRow) {
        if (field[c + 1][r - 1].value === 0 && !field[c + 1][r - 1].open) {
          field[c + 1][r - 1].open = true;
          field = this.openAllGreenCells(c + 1, r - 1, field);
        } else {
          field[c + 1][r - 1].open = true;
        }
      }

      if (field[c + 1][r].value === 0 && !field[c + 1][r].open) {
        field[c + 1][r].open = true;
        field = this.openAllGreenCells(c + 1, r, field);
      } else {
        field[c + 1][r].open = true;
      }

      if (bottomRow) {
        if (field[c + 1][r + 1].value === 0 && !field[c + 1][r + 1].open) {
          field[c + 1][r + 1].open = true;
          field = this.openAllGreenCells(c + 1, r + 1, field);
        } else {
          field[c + 1][r + 1].open = true;
        }
      }
    }

    return field;
  }

  openAllCells = (col = null, row = null) => {
    const { field, colsnum, rowsnum } = this.state;
    if (col !== null && row !== null) field[col][row].detonated = true;
    for (let i = 0; i < colsnum; i++) {
      for (let j = 0; j < rowsnum; j++) {
        field[i][j].open = true;
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
      openedCells: 0
    })
  }

  render() {
    const { colsnum, rowsnum, difficulty, startGame, field, gameOver, allCells, openedCells } = this.state;
    return (
      <div className="App">
        {startGame ?
          <Game
            field={field}
            rowsnum={rowsnum}
            onContextMenu={this.handleRightClick}
            onClick={this.handleLeftClick}
          /> :
          <SettingsForm
            colsnum={colsnum}
            rowsnum={rowsnum}
            difficulty={difficulty}
            onChange={this.handleInput}
            onSubmit={this.handleForm}
          />
        }
        {gameOver ? <GameOver newGame={this.newGame} /> : null}
        {startGame && allCells === openedCells ? <Winner newGame={this.newGame} /> : null}
      </div>
    );
  }
}

export default App;
