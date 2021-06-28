import React from 'react';
import {Row} from './Row';


const Board = ({squares, boardSize, onClick, winningSquares}) => (
  <div className='board-row'>
  {
    [...Array(boardSize).keys()].map( i =>
      <Row
        squares={squares}
        boardSize={boardSize}
        onClick={onClick}
        rowNumber={i}
        winningSquares={winningSquares}
      />
    )
  }
  </div>
);

export {Board};
