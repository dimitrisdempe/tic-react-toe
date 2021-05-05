function getIndex( row, column, rowSize ) {
    return row * rowSize + column;
}
function calculateWinner(squares) {
    const consecutive = 3;
    var boardSize = Math.floor( Math.sqrt( squares.length ) );
    for( var row = 0; row < boardSize; row++ ) {
        for( var column = 0; column < boardSize - consecutive + 1; column++ ) {
            var win = true;
            let index = getIndex( row, column, boardSize );
            if( !squares[ index ] ) continue;
            for( var offset = 0; offset < consecutive; offset++ ) {
                let new_index = getIndex( row, column + offset, boardSize );
                if( squares[ index ] !== squares[ new_index ] ) {
                    win = false;
                    break;
                }
            }
            if( win ) return squares[ index ];
        }
    }
    for( var column = 0; column < boardSize; column++ ) {
        for( var row = 0; row < boardSize - consecutive + 1; row++ ) {
            var win = true;
            let index = getIndex( row, column, boardSize );
            if( !squares[ index ] ) continue;
            for( var offset = 0; offset < consecutive; offset++ ) {
                let new_index = getIndex( row + offset, column, boardSize );
                if( squares[ index ] !== squares[ new_index ] ) {
                    win = false;
                    break;
                }
            }
            if( win ) return squares[ index ];
        }
    }
    return null;
}

module.exports = {getIndex, calculateWinner};
