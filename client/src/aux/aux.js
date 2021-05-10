const utils = require("./utils");
const checks = require("./checks");

function bestMove( my_symbol, other_symbol, player, board, depth ) {
    if( calculateWinner( board ) == my_symbol ) return { index: null, score: 10 };
    else if( isTie( board ) ) return { index: null, score: 0 };
    else if( calculateWinner( board ) == other_symbol ) return { index: null, score: -10 };
    else if( depth == 0 ) return { index: null, score: 0 };
    var boardSize = Math.floor( Math.sqrt( board.length ) );
    var all_moves = [];
    for( let row = 0; row < boardSize; row++ ) {
        for( let column = 0; column < boardSize; column++ ) {
            let curIndex = utils.getIndex( row, column, boardSize );
            if( board[ curIndex ] != null ) continue;
            if( player ) board[ curIndex ] = my_symbol;
            else board[ curIndex ] = other_symbol;
            let returned = bestMove( my_symbol, other_symbol, !player, board, depth - 1 );
            all_moves.push( { index: curIndex, score: returned.score } );
            board[ utils.getIndex( row, column, boardSize ) ] = null;
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
    return bestMove( 'O', 'X', true, board, 5 ).index;
}

function calculateWinner(squares) {
    let mainDiagCondition = checks.checkMainDiagonal( squares );
    if( mainDiagCondition ) return mainDiagCondition;

    let secondaryDiagCondition = checks.checkSecondaryDiagonal( squares );
    if( secondaryDiagCondition ) return secondaryDiagCondition;
    
    let horCondition = checks.checkHorizontal( squares );
    if( horCondition ) return horCondition;
    
    let vertCondition = checks.checkVertical( squares );
    if( vertCondition ) return vertCondition;
    return null;
}

function isTie( squares ) {
    var countNulls = 0;
    for( let i = 0; i < squares.length; i++ ) {
        if( squares[ i ] == null ) countNulls++;
    }
    if( calculateWinner( squares ) == null && !countNulls ) return true;
    return false;
}


module.exports = {nextMove, calculateWinner};
