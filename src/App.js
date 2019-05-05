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

  newGame = () => {
    console.log('New Game!');
    this.setState({
      startGame: false,
      gameOver: false
    })
  }

  render() {
    const { colsnum, rowsnum, difficulty, startGame, field, gameOver } = this.state;
    return (
      <div className="App">
        {startGame ?
          <Game field={field} /> :
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
