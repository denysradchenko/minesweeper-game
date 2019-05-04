import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import SettingsForm from './SettingsForm';

class App extends Component {
  state = {
    colsnum: 10,
    rowsnum: 10,
    difficulty: 1,
    startGame: false,
  }

  handleInput = ({ target }) => {
    this.setState({
      [target.name]: parseInt(target.value)
    });
  }

  handleForm = (e) => {
    e.preventDefault();
    this.setState({
      startGame: true
    })
  }

  render() {
    const { colsnum, rowsnum, difficulty, startGame } = this.state;
    return (
      <div className="App">
        {startGame ?
          null :
          <SettingsForm
            colsnum={colsnum}
            rowsnum={rowsnum}
            difficulty={difficulty}
            onChange={this.handleInput}
            onSubmit={this.handleForm}
          />
        }

      </div>
    );
  }
}

export default App;
