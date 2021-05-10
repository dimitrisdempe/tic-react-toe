import React from 'react';
import Game from './game.js';
import Board from './board.js'

const aux = require("../aux");

class SimpleGame extends Game {
    constructor(props){
        super(props);
        this.state = {
            boardSize: this.props.boardSize,
            squares: Array( this.props.boardSize * this.props.boardSize ).fill( null ),
            xIsNext: true,
        };
    }  
    render() {
        const winner = aux.calculateWinner(this.state.squares);
        let status;
        if (winner){
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
            <div className="game-board">
            <Board
            squares = {this.state.squares}
            boardSize = {this.state.boardSize}
            onClick={(i) => this.handleClick( i )}
            />
            </div>
        );
    }
}

export default SimpleGame;
