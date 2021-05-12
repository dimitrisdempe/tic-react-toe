import React from 'react';
import Game from './game.js';
import Board from './board.js'

const aux = require("../aux/aux");

class SinglePlayer extends Game {
    render() {
        const winner = aux.calculateWinner(this.state.squares);
        if( !this.state.xIsNext ) {
            //console.log( aux.nextMove( 'O', this.state.squares ) ) 
            var move = aux.nextMove( 'O', this.state.difficulty, this.state.squares ); 
            console.log( move );
            this.handleClick( move );
            return (<div className="game">
            <div className="game-board">
                {this.renderBoard()}
            </div>
            <div className="game-info">
              <div>{this.renderButton()}</div>
            </div>
          </div>
            );
        } else {
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
}

export default SinglePlayer;
