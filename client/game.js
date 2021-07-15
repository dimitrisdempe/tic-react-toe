import React from 'react';
import {Board} from './Board';
import {calculateWinner} from '../aux/aux';
import { fillWinningSquares } from '../aux/utils';

class Game extends React.Component {
    constructor(props){
        super(props);
        const size = ( typeof this.props.boardSize === 'undefined') ? 3 : this.props.boardSize;
        const diff = ( typeof this.props.difficulty === 'undefined') ? 2: this.props.difficulty;
        this.state = {
            boardSize: size,
            squares: Array( size * size ).fill( null ),
            winningSquares: Array( size * size ).fill( false ),
            xIsNext: true,
            difficulty: diff,
        };
    }
    resetGame() {
        this.setState({
            squares: Array( this.state.boardSize * this.state.boardSize).fill( null ),
            winningSquares: Array( this.state.boardSize * this.state.boardSize).fill( false ),
            xIsNext: true,
        });
    }
    handleClick( index ) {
        let boardSquares = this.state.squares;
        let winningSquares = this.state.winningSquares;

        if( calculateWinner( boardSquares )[0] || boardSquares[ index ] ) return;

        boardSquares[ index ] = this.state.xIsNext ? 'X' : 'O';

        if (calculateWinner(boardSquares)[0]){
            let winningLine = calculateWinner(boardSquares)[1];
            winningSquares = fillWinningSquares(winningSquares, winningLine[0], winningLine[1], winningLine[2]);

        }


        this.setState({
            squares: boardSquares,
            xIsNext: !this.state.xIsNext,
            winningSquares: winningSquares,
        });
    }
    renderButton(){
        return(
                    <div><button onClick = {() => this.resetGame()}>Reset</button></div>
        );
    }
    renderEasyButton(){
        return(
            <button onClick = {()=>this.changeToEasy()}>Easy</button>
        );
    }
    renderMediumButton(){
        return(
             <button onClick = {()=>this.changeToMedium()}>Medium</button>
        );
    }
    renderHardButton(){
        return(
             <button onClick = {()=>this.changeToHard()}>Hard</button>
        );
    }
    changeToEasy(){
        this.setState({
            difficulty: 0,
        });
    }
    changeToMedium(){
        this.setState({
            difficulty: 1,
        });
    }
    changeToHard(){
        this.setState({
            difficulty: 2,
        });
    }
    renderBoard() {
         return (
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
          <div>{this.renderEasyButton}</div>
        </div>
        
                </div>
            );
    }
}


export default Game;
