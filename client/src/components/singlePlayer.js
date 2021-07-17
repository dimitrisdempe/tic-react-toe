import React from 'react';
import Game from './Game.js';
import {Board} from './Board'
import {calculateWinner, nextMove} from '../aux/aux';

class SinglePlayer extends Game {
    render() {
        const winner = calculateWinner(this.state.squares);
        if( !this.state.xIsNext ) {
            //console.log( aux.nextMove( 'O', this.state.squares ) )
            var move = nextMove( 'O', this.state.difficulty, this.state.squares );
            console.log( move );
            this.handleClick( move );
            return <div className="game">
            <div className="game-board">
              <Board
                squares = {this.state.squares}
                boardSize = {this.state.boardSize}
                winningSquares = {this.state.winningSquares}
                onClick={i => this.handleClick(i)}
              />
            </div>
            <div className="game-info">
              <div>{this.renderButton()}</div>
              <div>{this.renderEasyButton()}</div>
              <div>{this.renderMediumButton()}</div>
              <div>{this.renderHardButton()}</div>
            </div>
          </div>
        } else {
            <div className="game">
            <div className="game-board">
              <Board
                squares = {this.state.squares}
                boardSize = {this.state.boardSize}
                winningSquares = {this.state.winningSquares}
                onClick={i => this.handleClick(i)}
              />
            </div>
            <div className="game-info">
              <div>{this.renderButton()}</div>
              <div>{this.renderEasyButton()}</div>
              <div>{this.renderMediumButton()}</div>
              <div>{this.renderHardButton()}</div>
            </div>
          </div>
        }
    }
}

export default SinglePlayer;
