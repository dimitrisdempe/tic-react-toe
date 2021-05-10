import React from 'react';
import Board from './board.js'

const aux = require("../aux");

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            boardSize: this.props.boardSize,
            squares: Array( this.props.boardSize * this.props.boardSize ).fill( null ),
            xIsNext: true,
        };
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
}


export default Game;  
