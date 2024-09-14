// src/Board.js

import React from 'react';
import Square from './Square';
import { Grid } from '@mui/material';

function Board({ squares, onClick, winningLine }) {
  function renderSquare(i) {
    const highlight = winningLine && winningLine.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        highlight={highlight}
        index={i}
      />
    );
  }

  return (
    <div>
      {[0, 1, 2].map((row) => (
        <Grid container key={row} justifyContent="center">
          {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
        </Grid>
      ))}
    </div>
  );
}

export default Board;
