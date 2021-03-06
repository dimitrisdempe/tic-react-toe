import React from 'react';
import {Board} from './Board';
import {ResetButton} from './ResetButton'

const GameScreen = ({squares, boardSize, winningSquares, handleClick, opponent}) => (
    <div className="game">
            <div className="game-board">
              <Board
                squares = {squares}
                boardSize = {boardSize}
                winningSquares = {winningSquares}
                onClick={i => handleClick(i)}
              />
            </div>
            <div className="game-info">
              
            </div>
          </div>

)
export {GameScreen}
