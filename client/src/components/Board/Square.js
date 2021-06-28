import React from 'react';

const Square = ({value, onClick, isWinning}) => {
return (
    <button className={`square ${isWinning ? 'winning' : ''}`} onClick={onClick}>
      {value}
    </button>
)};

export { Square }; // import { Square } from '....';
// export default Square; --> import Square from '....';
