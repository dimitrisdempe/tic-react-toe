const consecutive = 3;

function getIndex( row, column, rowSize ) {
    return row * rowSize + column;
}

function calculateWinner(squares) {
    let mainDiagCondition = checkMainDiagonal( squares );
    if( mainDiagCondition ) return mainDiagCondition;
    let secondaryDiagCondition = checkSecondaryDiagonal( squares );
    if( secondaryDiagCondition ) return secondaryDiagCondition;
    let horCondition = checkHorizontal( squares );
    if( horCondition ) return horCondition;
    let vertCondition = checkVertical( squares );
    if( vertCondition ) return vertCondition;
    return null;
}

function checkHorizontal( squares ) {
    var boardSize = Math.floor( Math.sqrt( squares.length ) );
    for( let row = 0; row < boardSize; row++ ) {
        for( let column = 0; column < boardSize - consecutive + 1; column++ ) {
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
    return null;
}

function checkVertical( squares ) {
    var boardSize = Math.floor( Math.sqrt( squares.length ) ); 
    for( let column = 0; column < boardSize; column++ ) {
        for( let row = 0; row < boardSize - consecutive + 1; row++ ) {
            let win = true;
            let index = getIndex( row, column, boardSize );
            if( !squares[ index ] ) continue;
            for( let offset = 0; offset < consecutive; offset++ ) {
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

function checkMainDiagonal( squares ) { 
    var boardSize = Math.floor( Math.sqrt( squares.length ) );
    for( let row = 0; row < boardSize - consecutive + 1; row++ ) {
        for( let column = 0; column < boardSize - consecutive + 1; column++ ) { 
            var win = true;
            let index = getIndex( row, column, boardSize );
            if( !squares[ index ] ) continue;
            for( var offset = 0; offset < consecutive; offset++ ) {
                let new_index = getIndex( row + offset, column + offset, boardSize );
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

function checkSecondaryDiagonal( squares ) {
    var boardSize = Math.floor( Math.sqrt( squares.length ) );
    for( let row = 0; row < boardSize - consecutive + 1; row++ ) {
        for( let column = consecutive - 1; column < boardSize; column++ ) { 
            var win = true;
            let index = getIndex( row, column, boardSize );
            if( !squares[ index ] ) continue;
            for( var offset = 0; offset < consecutive; offset++ ) {
                let new_index = getIndex( row + offset, column - offset, boardSize );
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

