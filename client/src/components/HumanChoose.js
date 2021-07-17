import React from 'react';
const HumanChoose = ({createOnClick, joinOnClick}) => (
    <div>
        <button onClick = {() => createOnClick()}>Create a game</button>
        <br/>
        <br/>
        <button onClick = {() => joinOnClick()}>Join a game</button>
    </div>
)
export {HumanChoose}