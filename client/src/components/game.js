import React from 'react';
import Board from './board.js'

const aux = require("../aux/aux");

class Game extends React.Component {
    constructor(props){
        super(props);
        const size = ( typeof this.props.boardSize === 'undefined') ? 3 : this.props.boardSize;
        const diff = ( typeof this.props.difficulty === 'undefined') ? 1: this.props.difficulty;
        this.state = {
            boardSize: size,
            squares: Array( size * size ).fill( null ),
            xIsNext: true,
            difficulty: diff,
        };
    }
    resetGame() {
        this.setState({
            squares: Array( this.state.boardSize * this.state.boardSize).fill( null ),
            xIsNext: true,
        });
    }
    handleClick( index ) {
        var boardSquares = this.state.squares;
        if( aux.calculateWinner( boardSquares ) || boardSquares[ index ] ) return;
        boardSquares[ index ] = this.state.xIsNext ? 'X' : 'O';
        this.setState(state => ({
            squares: boardSquares,
            xIsNext: !state.xIsNext,
        }));
    }
    renderButton(){
        return(
                    <div><button onClick = {() => this.resetGame()}>Reset</button></div>
                


        );
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
}


export default Game;  
