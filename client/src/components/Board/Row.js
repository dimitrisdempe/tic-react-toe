import React from 'react';
import {Square} from './Square';
import {getIndex} from '../../aux/utils';


const Row = ({boardSize, squares, rowNumber, onClick, winningSquares}) => (
    <div className='board-row'>
        {[...Array(boardSize).keys()].map( i =>
            (<Square
              value = {squares[getIndex(rowNumber, i, boardSize)]}
              onClick = {() => onClick(getIndex(rowNumber, i, boardSize))}
              winning = {winningSquares[getIndex(rowNumber, i, boardSize)]}
            />)
        )}
    </div>
);

export {Row};
