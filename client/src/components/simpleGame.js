import React from 'react';
import Game from './game.js';
import Board from './board.js'

class SimpleGame extends Game {
    render() {
        return (<div className="game">
        <div className="game-board">
            {this.renderBoard()}
        </div>
        <div className="game-info">
          <div>{this.renderButton()}</div>
        </div>
      </div>
        );
    }
}

export default SimpleGame;
