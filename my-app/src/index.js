import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

function getIndex( row, column, rowSize ) {
    return row * rowSize + column;
}

class Board extends React.Component {
    renderSquare( row, column ) {
        return (<Square value={this.props.squares[getIndex( row, column, this.props.boardSize )]} onClick = {() => this.props.onClick(getIndex( row, column, this.props.boardSize ))} />);
    }
    renderRow( rowNumber ) {
        var items = [];
        for( var column = 0; column < this.props.boardSize; column++ ) {
            items.push( this.renderSquare( rowNumber, column ) );
        }
        return (
            <div className='board-row'>
                {items}
            </div>
        );
    }
  
    render() {
        var rows = [];
        for( var i = 0; i < this.props.boardSize; i++ ) {
            rows.push( this.renderRow( i ) );
        }
        return (
            <div>{rows}</div>
        );
    }
}

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

// ========================================

ReactDOM.render(
  <Game boardSize={6} />,
  document.getElementById('root')
);

function calculateWinner(squares) {
    const consecutive = 3;
    var boardSize = Math.floor( Math.sqrt( squares.length ) );
    for( var row = 0; row < boardSize; row++ ) {
        for( var column = 0; column < boardSize - consecutive + 1; column++ ) {
            var win = true;
            let index = getIndex( row, column, boardSize );
            if( !squares[ index ] ) continue;
            for( var offset = 0; offset < consecutive; offset++ ) {
                let new_index = getIndex( row, column + offset, boardSize );
                if( squares[ index ] !== squares[ new_index ] ) {
                    win = false;
                    break;
                }
            }
            if( win ) return squares[ index ];
        }
    }
    for( var column = 0; column < boardSize; column++ ) {
        for( var row = 0; row < boardSize - consecutive + 1; row++ ) {
            var win = true;
            let index = getIndex( row, column, boardSize );
            if( !squares[ index ] ) continue;
            for( var offset = 0; offset < consecutive; offset++ ) {
                let new_index = getIndex( row + offset, column, boardSize );
                if( squares[ index ] !== squares[ new_index ] ) {
                    win = false;
                    break;
                }
            }
            if( win ) return squares[ index ];
        }
    }
    return null;
}
