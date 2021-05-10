const consecutive = 3;

function getIndex( row, column, rowSize ) {
    return row * rowSize + column;
}

function bestMove( my_symbol, other_symbol, player, board, depth ) {
    if( calculateWinner( board ) == my_symbol ) return { index: null, score: 10 };
    else if( isTie( board ) ) return { index: null, score: 0 };
    else if( calculateWinner( board ) == other_symbol ) return { index: null, score: -10 };
    else if( depth == 0 ) return { index: null, score: 0 };
    var boardSize = Math.floor( Math.sqrt( board.length ) );
    var all_moves = [];
    for( let row = 0; row < boardSize; row++ ) {
        for( let column = 0; column < boardSize; column++ ) {
            let curIndex = getIndex( row, column, boardSize );
            if( board[ curIndex ] != null ) continue;
            if( player ) board[ curIndex ] = my_symbol;
            else board[ curIndex ] = other_symbol;
            let returned = bestMove( my_symbol, other_symbol, !player, board, depth - 1 );
            all_moves.push( { index: curIndex, score: returned.score } );
            board[ getIndex( row, column, boardSize ) ] = null;
        }
    }
    var score = all_moves[ 0 ].score;
    var move = all_moves[ 0 ].index;
    for( let i = 1; i < all_moves.length; i++ ) {
        if( player && score < all_moves[ i ].score ) {
            move = all_moves[ i ].index;
            score = all_moves[ i ].score; 
        }
        else if( !player && score > all_moves[ i ].score ) { 
            move = all_moves[ i ].index;
            score = all_moves[ i ].score;
        }
    }
    return { index: move, score: score };
}

function nextMove( symbol, board ) {
    return bestMove( 'O', 'X', true, board, 6 ).index;
}

function isTie( squares ) {
    var countNulls = 0;
    for( let i = 0; i < squares.length; i++ ) {
        if( squares[ i ] == null ) countNulls++;
    }
    if( calculateWinner( squares ) == null && !countNulls ) return true;
    return false;
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

module.exports = {getIndex, nextMove, calculateWinner};
