import React from 'react';
import Board from './board.js'
class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        boardSize: this.props.boardSize,
        squares: Array( this.props.boardSize * this.props.boardSize ).fill( null ),
        xIsNext: true,
    };
  }  
  handleClick( index ){
    var boardSquares = this.state.squares;
    if( calculateWinner( boardSquares ) || boardSquares[ index ] ) return;
    boardSquares[ index ] = this.state.xIsNext ? 'X' : 'O';
    this.setState(state => ({
        squares: boardSquares,
        xIsNext: !state.xIsNext,
      }));
  }

render() {
    const winner = calculateWinner(this.state.squares);
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
          <div className="game-info">
            <div>{status}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  export default Game;
    