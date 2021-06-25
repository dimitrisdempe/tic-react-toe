import React from 'react';
import {Row} from './Row';


const Board = ({squares, boardSize, onClick}) => (
  <div className='board-row'>
  {
    [...Array(boardSize).keys()].map( i =>
      <Row
        squares={squares}
        boardSize={boardSize}
        onClick={onClick}
        rowNumber={i}
      />
    )
  }
  </div>
);

export {Board};
