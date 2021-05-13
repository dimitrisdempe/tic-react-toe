import React from 'react';
import Game from './game.js';
import Board from './board.js'

class SimpleGame extends Game {
    render() {
        return this.renderBoard();
    }
}

export default SimpleGame;
