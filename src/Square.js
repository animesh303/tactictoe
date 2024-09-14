// src/Square.js

import React from 'react';
import { Button } from '@mui/material';
import { Close as CloseIcon, RadioButtonUnchecked as CircleIcon } from '@mui/icons-material';

function Square({ value, onClick, highlight, index }) {
  const renderIcon = () => {
    if (value === 'X') {
      return <CloseIcon style={{ fontSize: 40 }} />;
    } else if (value === 'O') {
      return <CircleIcon style={{ fontSize: 40 }} />;
    } else {
      return null;
    }
  };

  return (
    <Button
      variant="outlined"
      color={highlight ? 'secondary' : 'primary'}
      onClick={onClick}
      style={{ width: '60px', height: '60px', minWidth: '60px', minHeight: '60px', margin: '2px' }}
      tabIndex="0"
      aria-label={`Square ${index}: ${value || 'empty'}`}
      onKeyPress={(e) => {
        if (e.key === 'Enter') onClick();
      }}
    >
      {renderIcon()}
    </Button>
  );
}

export default Square;
