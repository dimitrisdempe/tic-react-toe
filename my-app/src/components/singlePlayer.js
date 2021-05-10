import React from 'react';
import Game from './game.js';
import Board from './board.js'

const aux = require("../aux");

class SinglePlayer extends Game {
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
        if( !this.state.xIsNext ) {
            //console.log( aux.nextMove( 'O', this.state.squares ) ) 
            var move = aux.nextMove( 'O', this.state.squares ); 
            console.log( move );
            this.handleClick( move );
            return (
                <div className="game">
                <div className="game-board">
                <Board
                squares = {this.state.squares}
                boardSize = {this.state.boardSize}
                onClick={(i) => this.handleClick( i )}
                />
                </div>
                <div className="game-info">
                <div>{status}</div>
                <ol>{/* TODO */}</ol>
                </div>
                </div>
            );
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
            <div className="game-info">
            <div>{status}</div>
            <ol>{/* TODO */}</ol>
            </div>
            </div>
        );
    }
}

export default SinglePlayer;
