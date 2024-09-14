// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from './Game';

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);
