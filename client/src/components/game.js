import React from 'react';
import {Board} from './Board';
import {calculateWinner} from '../aux/aux';

class Game extends React.Component {
    constructor(props){
        super(props);
        const size = ( typeof this.props.boardSize === 'undefined') ? 3 : this.props.boardSize;
        const diff = ( typeof this.props.difficulty === 'undefined') ? 2: this.props.difficulty;
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
        if( calculateWinner( boardSquares ) || boardSquares[ index ] ) return;
        boardSquares[ index ] = this.state.xIsNext ? 'X' : 'O';
        this.setState(state => ({
            squares: boardSquares,
            xIsNext: !this.state.xIsNext,
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
                onClick={i => this.handleClick(i)}
                />
                </div>
                <div className="game-info">
          <div>{this.renderButton()}</div>
        </div>
                </div>
            );
    }
}


export default Game;
