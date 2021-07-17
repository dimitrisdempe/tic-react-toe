import React from 'react';
import Game from './Game.js';
// import Board from './Board.js'

class SimpleGame extends Game {
    render() {
        return this.renderBoard();
    }
}

export default SimpleGame;
