import React from 'react';

const Square = ({value, onClick}) => {
return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
)};

export { Square }; // import { Square } from '....';
// export default Square; --> import Square from '....';
