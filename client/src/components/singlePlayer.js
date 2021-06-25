import React from 'react';
import Game from './game.js';

import {calculateWinner, nextMove} from '../aux/aux';

class SinglePlayer extends Game {
    render() {
        const winner = calculateWinner(this.state.squares);
        if( !this.state.xIsNext ) {
            //console.log( aux.nextMove( 'O', this.state.squares ) )
            var move = nextMove( 'O', this.state.difficulty, this.state.squares );
            console.log( move );
            this.handleClick( move );
            return this.renderBoard();
        } else {
            return this.renderBoard();
        }
    }
}

export default SinglePlayer;
