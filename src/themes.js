// src/themes.js
import { createTheme } from '@mui/material/styles';

const commonStyles = {
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: 'inherit', // Input text color
          },
          '& .MuiInputLabel-root': {
            color: 'inherit', // Label color
          },
          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'inherit', // Outline color
          },
          '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'inherit', // Outline color on hover
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'inherit', // Outline color when focused
          },
        },
      },
    },
  },
  typography: {
    // fontFamily: "'Poppins', sans-serif",
    fontFamily: "'Luckiest Guy'",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 400,
    },
    button: {
      textTransform: 'none', // Remove uppercase transformation
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    text: {
      primary: '#000000',
    },
  },
  ...commonStyles,
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    text: {
      primary: '#ffffff',
    },
  },
  ...commonStyles,
});
