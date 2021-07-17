import React from 'react';
const DiffScreen = ({changeToEasy, changeToMedium, changeToHard}) => (<div>
    
    <button onClick = {()=> changeToEasy()}>Easy</button>
    <br/>
    <br/>
    <button onClick = {()=> changeToMedium()}>Medium</button>
    <br/>
    <br/>
    <button onClick = {()=>changeToHard()}>Hard</button>

</div>

)

export {DiffScreen}