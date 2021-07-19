import React from 'react';

const CreateGame = ({gameID}) => {
  console.log(gameID)
  if(gameID == null){
    return (<div> Creating game.. </div>)
  }
  else {
    return (<div> Waiting for an opponent to join.. Game ID = {gameID} </div>)
  }
}
export {CreateGame}
