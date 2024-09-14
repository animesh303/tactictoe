// src/Footer.js

import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function Footer() {
    const theme = useTheme();  // Get the current theme

    return (
        <Box
            component="footer"
            sx={{
                padding: '10px',
                textAlign: 'center',
                backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#333',
                color: theme.palette.text.secondary,
            }}
        >
            <Typography variant="body2" color="textSecondary">
                © {new Date().getFullYear()} TacticToe. All rights reserved.
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Licensed under the{' '}
                <a
                    href="https://opensource.org/licenses/MIT"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    MIT License
                </a>.
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Developed by <strong>Animesh Kumar Naskar</strong>. Contact: <a href="mailto:luge_types.0s@icloud.com">luge_types.0s@icloud.com</a>
            </Typography>
        </Box>
    );
}

export default Footer;
