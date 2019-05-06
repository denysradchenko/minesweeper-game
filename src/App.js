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
    const { field } = this.state;

    if (field[col][row].open) return;

    field[col][row].open = true;
    this.setState({ field });
    if (field[col][row].value === 'b') {
      this.setState({ gameOver: true })
    }

    this.setState(prevState => ({
      openedCells: prevState.openedCells + 1
    }));
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
