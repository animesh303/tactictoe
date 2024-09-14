// src/About.js

import React from 'react';
import { Container, Typography } from '@mui/material';

function About() {
  return (
    <Container maxWidth="md" sx={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        About TacticToe
      </Typography>
      <Typography variant="body1" paragraph>
        TacticToe is a fun and interactive Tic Tac Toe game developed using React and Material-UI.
        It offers both single-player and multiplayer modes, as well as customizable player avatars.
      </Typography>
      <Typography variant="h5" gutterBottom>
        About the Developer
      </Typography>
      <Typography variant="body1" paragraph>
        This project was developed by <strong>Animesh Kumar Naskar</strong>. I'm a software developer specializing
        in building modern web applications. Feel free to reach out to me at{' '}
        <a href="mailto:luge_types.0s@icloud.com">luge_types.0s@icloud.com</a> for any inquiries or feedback.
      </Typography>
    </Container>
  );
}

export default About;
