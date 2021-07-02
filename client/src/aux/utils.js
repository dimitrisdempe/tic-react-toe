const getIndex = ( row, column, rowSize ) => (row * rowSize + column);

const fillWinningSquares = (winningSquares,first, second, third) => {
    winningSquares[first] = true;
    winningSquares[second] = true;
    winningSquares[third] = true;
    return winningSquares;

};
export { getIndex, fillWinningSquares };
