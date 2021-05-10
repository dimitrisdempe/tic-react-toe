import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SinglePlayer from './components/singlePlayer.js';

ReactDOM.render(
  <SinglePlayer boardSize={3} />,
  document.getElementById('root')
);
