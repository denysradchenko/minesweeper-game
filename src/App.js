import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import SettingsForm from './SettingsForm';
import Game from './Game';
import GameFieldGenerator from './services/GameFieldGenerator';
import GameOver from './GameOver';

class App extends Component {
  state = {
    colsnum: 10,
    rowsnum: 10,
    difficulty: 1,
    field: null,
    startGame: false,
    gameOver: false
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
    const field = this.GameFieldGenerator.generateField(colsnum, rowsnum, difficulty);
    this.setState({
      startGame: true,
      field
    })
  }

  handleRightClick = (e) => {
    e.preventDefault();
    const col = e.target.getAttribute('data-col');
    const row = e.target.getAttribute('data-row');
    console.log(`The cell in ${col} column and ${row} row was right clicked`);
  }

  handleLeftClick = (e) => {
    const col = e.currentTarget.getAttribute('data-col');
    const row = e.currentTarget.getAttribute('data-row');
    const { field } = this.state;
    field[col][row].open = true;
    this.setState({ field })
  }

  newGame = () => {
    this.setState({
      startGame: false,
      gameOver: false,
      field: null,
    })
  }

  render() {
    const { colsnum, rowsnum, difficulty, startGame, field, gameOver } = this.state;
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
      </div>
    );
  }
}

export default App;
