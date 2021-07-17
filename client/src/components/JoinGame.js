import React from 'react';
const JoinGame = ({joinGameOnClick}) => (
    <div>
        <p>Enter socket.id</p>
        <input type = "number"/>
        <br/>
        <br/>
        <button onClick = {() => joinGameOnClick()}>Enter the game</button>
    </div>
)
export {JoinGame}