import React from 'react';

const StartScreen = ({humanOnClick, botOnClick}) => (
  <div>
    <button onClick = {() => humanOnClick()} > Play against a human </button>
    <br/>
    <br/>
    <button onClick = {() => botOnClick()} > Play againt a bot </button>
  </div>
)

export {StartScreen}
