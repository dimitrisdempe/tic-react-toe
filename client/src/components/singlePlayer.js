import React from 'react';
import Game from './game.js';
import Board from './board.js'

const aux = require("../aux/aux");

class SinglePlayer extends Game {
    constructor(props){
        super(props);
        this.state = {
            boardSize: this.props.boardSize,
            squares: Array( this.props.boardSize * this.props.boardSize ).fill( null ),
            difficulty: this.props.difficulty,
            xIsNext: true,
        };
    }  
    
    renderBoard() { 
         return (
                <div className="game">
                <div className="game-board">
                <Board
                squares = {this.state.squares}
                boardSize = {this.state.boardSize}
                onClick={(i) => this.handleClick( i )}
                />
                </div> 
                </div>
            );
    }
    render() {
        const winner = aux.calculateWinner(this.state.squares);
        if( !this.state.xIsNext ) {
            //console.log( aux.nextMove( 'O', this.state.squares ) ) 
            var move = aux.nextMove( 'O', this.state.difficulty, this.state.squares ); 
            console.log( move );
            this.handleClick( move );
            return this.renderBoard();
        } else {
            return this.renderBoard();
        }
    }
}

export default SinglePlayer;
