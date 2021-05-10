import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './components/game.js';


ReactDOM.render(
  <Game boardSize={6} />,
  document.getElementById('root')
);
