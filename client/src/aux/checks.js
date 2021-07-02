import {getIndex} from './utils';

const consecutive = 3;

function checkHorizontal( squares ) {
    var boardSize = Math.floor( Math.sqrt( squares.length ) );
    for( let row = 0; row < boardSize; row++ ) {
        for( let column = 0; column < boardSize - consecutive + 1; column++ ) {
            let result = Array(3).fill(null);
            var win = true;
            let index = getIndex( row, column, boardSize );
            if( !squares[ index ] ) continue;
            result[0] = index;
            for( var offset = 0; offset < consecutive; offset++ ) {
                let new_index = getIndex( row, column + offset, boardSize );
                result[offset] = new_index;
                if( squares[ index ] !== squares[ new_index ] ) {
                    win = false;
                    break;
                }
            }
            if( win ) return [squares[ index ],result];
        }
    }
    return [null,null];
}

function checkVertical( squares ) {
    var boardSize = Math.floor( Math.sqrt( squares.length ) );
    for( let column = 0; column < boardSize; column++ ) {
        for( let row = 0; row < boardSize - consecutive + 1; row++ ) {
            let result = Array(3).fill(null);
            let win = true;
            let index = getIndex( row, column, boardSize );
            if( !squares[ index ] ) continue;
            result[0] = index;
            for( let offset = 0; offset < consecutive; offset++ ) {
                let new_index = getIndex( row + offset, column, boardSize );
                result[offset] = new_index;
                if( squares[ index ] !== squares[ new_index ] ) {
                    win = false;
                    break;
                }
            }
            if( win ) return [squares[ index ],result];
        }
    }
    return [null,null];
}

function checkMainDiagonal( squares ) {
    var boardSize = Math.floor( Math.sqrt( squares.length ) );
    for( let row = 0; row < boardSize - consecutive + 1; row++ ) {
        for( let column = 0; column < boardSize - consecutive + 1; column++ ) {
            let result = Array(3).fill(null);
            var win = true;
            let index = getIndex( row, column, boardSize );
            if( !squares[ index ] ) continue;
            result[0] = index;
            for( var offset = 0; offset < consecutive; offset++ ) {
                let new_index = getIndex( row + offset, column + offset, boardSize );
                result[offset] = new_index;
                if( squares[ index ] !== squares[ new_index ] ) {
                    win = false;
                    break;
                }
            }
            if( win ) return [squares[ index ],result];
        }
    }
    return [null, null];
}

function checkSecondaryDiagonal( squares ) {
    var boardSize = Math.floor( Math.sqrt( squares.length ) );
    for( let row = 0; row < boardSize - consecutive + 1; row++ ) {
        for( let column = consecutive - 1; column < boardSize; column++ ) {
            let result = Array(3).fill(null);
            var win = true;
            let index = getIndex( row, column, boardSize );
            if( !squares[ index ] ) continue;
            result[0] = index;
            for( var offset = 0; offset < consecutive; offset++ ) {
                let new_index = getIndex( row + offset, column - offset, boardSize );
                result[offset] = new_index;
                if( squares[ index ] !== squares[ new_index ] ) {
                    win = false;
                    break;
                }
            }
            if( win ) return [squares[ index ],result];
        }
    }
    return [null,null];
}

export { checkHorizontal, checkVertical, checkMainDiagonal, checkSecondaryDiagonal };
