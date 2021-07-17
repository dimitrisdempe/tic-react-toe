import React from 'react';
const ResetButton = ({resetGame}) => (
    <div>
        <button onClick = {() => resetGame()}>Reset</button>
    </div>
)
export {ResetButton}