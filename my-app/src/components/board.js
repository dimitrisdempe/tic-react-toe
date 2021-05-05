import React from 'react';
import Square from './square';
const aux = require('../aux');



class Board extends React.Component {
    renderSquare( row, column ) {
        return (<Square value={this.props.squares[aux.getIndex( row, column, this.props.boardSize )]} onClick = {() => this.props.onClick(aux.getIndex( row, column, this.props.boardSize ))} />);
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
export default Board;