function getIndex( row, column, rowSize ) {
    return row * rowSize + column;
}

module.exports = { getIndex };
