import {getIndex} from './utils';
import {
  checkHorizontal,
  checkVertical,
  checkMainDiagonal,
  checkSecondaryDiagonal
} from './checks';

function bestMove( my_symbol, other_symbol, player, board, depth ) {
    if( calculateWinner( board )[0] == my_symbol ) return { index: null, score: 10 };
    else if( isTie( board ) ) return { index: null, score: 0 };
    else if( calculateWinner( board )[0] == other_symbol ) return { index: null, score: -10 };
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

function nextMove( symbol, difficulty, board ) {
    switch( difficulty ) {
        case 0: return bestMove( 'O', 'X', true, board, 2 ).index;
        case 1: return bestMove( 'O', 'X', true, board, 4 ).index;
        case 2: return bestMove( 'O', 'X', true, board, 7 ).index;
    }
}

function calculateWinner(squares) {
    let mainDiagCondition = checkMainDiagonal( squares )[0];
    let winningMainDiagonal = checkMainDiagonal(squares)[1];
    if( mainDiagCondition ) return [mainDiagCondition,winningMainDiagonal];

    let secondaryDiagCondition = checkSecondaryDiagonal( squares )[0];
    let winningDiagonal = checkSecondaryDiagonal(squares)[1];
    if( secondaryDiagCondition ) return [secondaryDiagCondition,winningDiagonal];

    let horCondition = checkHorizontal( squares )[0];
    let winningHorizontal = checkHorizontal(squares)[1];
    if( horCondition ) return [horCondition,winningHorizontal];

    let vertCondition = checkVertical( squares )[0];
    let winningVertical = checkVertical(squares)[1];
    if( vertCondition ) return [vertCondition,winningVertical];
    return [null,null];
}

function isTie( squares ) {
    var countNulls = 0;
    for( let i = 0; i < squares.length; i++ ) {
        if( squares[ i ] == null ) countNulls++;
    }
    if( calculateWinner( squares )[0] == null && !countNulls ) return true;
    return false;
}

export {nextMove, calculateWinner};
