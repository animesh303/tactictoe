// src/Game.js

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Board from './Board';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './themes';
import {
    AppBar,
    Avatar,
    Button,
    Card,
    CardContent,
    CssBaseline,
    Grid,
    Switch,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
// import { Close as CloseIcon, RadioButtonUnchecked as CircleIcon } from '@mui/icons-material';
import Confetti from 'react-confetti';
import useSound from 'use-sound';
import clickSoundFile from './sounds/click.mp3';
import winSoundFile from './sounds/win.mp3';
import defaultAvatarX from './assets/default-avatar-x.png';
import defaultAvatarO from './assets/default-avatar-o.png';
import defaultAvatarDraw from './assets/default-avatar-draw.png';
import appIcon from './assets/app-icon.png';
import Footer from './Footer';

// import About from './About';
// import { Link } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function Game() {
    // Game State
    const [history, setHistory] = useState([
        { squares: Array(9).fill(null), lastMove: null },
    ]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXisNext] = useState(true);

    // Player Names and Avatars
    const [playerX, setPlayerX] = useState('Player X');
    const [playerO, setPlayerO] = useState('Player O');


    const [playerXAvatar, setPlayerXAvatar] = useState(defaultAvatarX);
    const [playerOAvatar, setPlayerOAvatar] = useState(defaultAvatarO);

    const [playerDrawAvatar] = useState(defaultAvatarDraw);


    // Scores
    const [scores, setScores] = useState({ X: 0, O: 0, Draws: 0 });

    // Game Mode and Theme
    const [isSinglePlayer, setIsSinglePlayer] = useState(false);
    const [theme, setTheme] = useState('light');

    // Sounds
    const [playClick] = useSound(clickSoundFile);
    const [playWin] = useSound(winSoundFile);

    const current = history[stepNumber];
    const winnerInfo = calculateWinner(current.squares);
    const winner = winnerInfo ? winnerInfo.player : null;
    const winningLine = winnerInfo ? winnerInfo.line : null;

    const playerXInputRef = useRef(null);
    const playerOInputRef = useRef(null);

    // Determine next player based on xIsNext
    // const nextPlayerAvatar = xIsNext ? playerXAvatar : playerOAvatar;
    // const nextPlayerName = xIsNext ? playerX : playerO;



    useEffect(() => {
        if (winner) {
            setScores((prevScores) => ({
                ...prevScores,
                [winner]: prevScores[winner] + 1,
            }));
            playWin();
        } else if (!winner && stepNumber === 9) {
            setScores((prevScores) => ({
                ...prevScores,
                Draws: prevScores.Draws + 1,
            }));
        }
    }, [winner, playWin, stepNumber]);

    const handleClick = useCallback(
        (i) => {
            const historyUpToCurrent = history.slice(0, stepNumber + 1);
            const currentSquares =
                historyUpToCurrent[historyUpToCurrent.length - 1].squares.slice();

            if (currentSquares[i] || winner) {
                return;
            }

            currentSquares[i] = xIsNext ? 'X' : 'O';

            setHistory(
                historyUpToCurrent.concat([{ squares: currentSquares, lastMove: i }])
            );
            setStepNumber(historyUpToCurrent.length);
            setXisNext(!xIsNext);
            playClick();
        },
        [history, stepNumber, xIsNext, winner, playClick] // Dependencies
    );

    useEffect(() => {
        if (isSinglePlayer && !xIsNext && !winner) {
            const timer = setTimeout(() => {
                // AI move logic
                const squares = current.squares;
                const emptySquares = squares
                    .map((val, idx) => (val === null ? idx : null))
                    .filter((val) => val !== null);
                if (emptySquares.length === 0) return;
                const randomIndex =
                    emptySquares[Math.floor(Math.random() * emptySquares.length)];
                handleClick(randomIndex);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isSinglePlayer, xIsNext, winner, current.squares, handleClick]);


    function jumpTo(step) {
        setStepNumber(step);
        setXisNext(step % 2 === 0);
    }

    function resetGame() {
        setHistory([{ squares: Array(9).fill(null), lastMove: null }]);
        setStepNumber(0);
        setXisNext(true);
    }

    function toggleTheme() {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    const moves = history.map((step, move) => {
        const desc = move
            ? `Go to move #${move} (${1 + (step.lastMove % 3)}, ${1 + Math.floor(step.lastMove / 3)
            })`
            : 'Go to game start';
        return (
            <li key={move}>
                <Button
                    variant="outlined"
                    size="small"
                    style={{
                        fontWeight: move === stepNumber ? 'bold' : 'normal',
                        margin: '2px',
                    }}
                    onClick={() => jumpTo(move)}
                >
                    {desc}
                </Button>
            </li>
        );
    });

    let status;
    let nextPlayerAvatar;
    let nextPlayerName;
    if (winner) {
        // status = `Winner: ${winner === 'X' ? playerX : playerO}`;
        status = 'Winner';
        nextPlayerAvatar = xIsNext ? playerOAvatar : playerXAvatar;
        nextPlayerName = xIsNext ? playerO : playerX;
    } else if (stepNumber === 9) {
        status = 'Draw: No Winner';
        nextPlayerAvatar = xIsNext ? playerXAvatar : playerOAvatar;
        nextPlayerName = xIsNext ? playerX : playerO;
    } else {
        // status = `Next player: ${xIsNext ? playerX : playerO}`;
        status = 'Next Player';
        nextPlayerAvatar = xIsNext ? playerXAvatar : playerOAvatar;
        nextPlayerName = xIsNext ? playerX : playerO;
    }

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    {/* Icon on the left */}
                    <Avatar src={appIcon} alt="App Icon" sx={{
                        marginRight: 2, width: 40, height: 40, '&:hover': {
                            transform: 'scale(1.2)',
                            transition: 'transform 0.3s',
                        }
                    }} />
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        ToeTactics
                    </Typography>
                    {/* <Router>
                    <Routes>
                        <Route path="/about" element={<About />} />
                    </Routes>
                    </Router> */}


                    {/* <Button color="inherit" component={Link} to="/about">
                    About
                    </Button> */}
                    <Switch
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                        color="default"
                        inputProps={{ 'aria-label': 'Toggle theme' }}
                    />
                </Toolbar>
            </AppBar>
            <div className={`game ${theme}`}>
                {winner && <Confetti />}
                <div className="main-content">
                    <Grid container spacing={2} justifyContent="center">
                        {/* Game Info Section */}
                        <Grid item xs={12} md={4}>
                            <Card variant="outlined">
                                <CardContent>
                                    {/* Player Inputs */}
                                    <div className="player-inputs">
                                        {/* Player X Inputs */}
                                        <div className="player-section">
                                            <div
                                                onClick={() => playerXInputRef.current.click()}
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        playerXInputRef.current.click();
                                                    }
                                                }}
                                                tabIndex="0"
                                                style={{ outline: 'none', cursor: 'pointer' }}
                                                aria-label="Upload Player X Avatar"
                                            >
                                                <Avatar
                                                    src={playerXAvatar}
                                                    alt={playerX}
                                                    style={{ marginRight: '10px', width: '40px', height: '40px' }}
                                                // onClick={() => playerXInputRef.current.click()}
                                                />
                                            </div>
                                            <TextField
                                                label="Player X Name"
                                                value={playerX}
                                                onChange={(e) => setPlayerX(e.target.value)}
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                margin="normal"
                                                style={{ width: '250px' }}
                                            />
                                            <input
                                                accept="image/*"
                                                type="file"
                                                ref={playerXInputRef}
                                                style={{ display: 'none' }}
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        // Validate file type
                                                        if (!file.type.startsWith('image/')) {
                                                            alert('Please select a valid image file.');
                                                            return;
                                                        }

                                                        // Limit file size to 5MB
                                                        if (file.size > 5 * 1024 * 1024) {
                                                            alert('Please select an image smaller than 5MB.');
                                                            return;
                                                        }

                                                        const reader = new FileReader();
                                                        reader.onload = () => {
                                                            setPlayerXAvatar(reader.result);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                            />
                                        </div>

                                        {/* Player O Inputs (if not single-player mode) */}
                                        {!isSinglePlayer && (
                                            <div className="player-section">
                                                <div
                                                    onClick={() => playerOInputRef.current.click()}
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            playerOInputRef.current.click();
                                                        }
                                                    }}
                                                    tabIndex="0"
                                                    style={{ outline: 'none', cursor: 'pointer' }}
                                                    aria-label="Upload Player O Avatar"
                                                >
                                                    <Avatar
                                                        src={playerOAvatar}
                                                        alt={playerO}
                                                        style={{ marginRight: '10px', width: '40px', height: '40px' }}
                                                    // onClick={() => playerOInputRef.current.click()}
                                                    />
                                                </div>
                                                <TextField
                                                    label="Player O Name"
                                                    value={playerO}
                                                    onChange={(e) => setPlayerO(e.target.value)}
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    margin="normal"
                                                    //   style={{ flex: 1, marginRight: '10px' }}
                                                    style={{ width: '250px' }}
                                                />
                                                <input
                                                    accept="image/*"
                                                    type="file"
                                                    ref={playerOInputRef}
                                                    style={{ display: 'none' }}
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            // Validate file type
                                                            if (!file.type.startsWith('image/')) {
                                                                alert('Please select a valid image file.');
                                                                return;
                                                            }

                                                            // Limit file size to 5MB
                                                            if (file.size > 5 * 1024 * 1024) {
                                                                alert('Please select an image smaller than 5MB.');
                                                                return;
                                                            }

                                                            const reader = new FileReader();
                                                            reader.onload = () => {
                                                                setPlayerOAvatar(reader.result);
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Controls */}
                                    <div className="controls">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={resetGame}
                                            fullWidth
                                            style={{ marginBottom: '10px' }}
                                        >
                                            Restart Game
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => setIsSinglePlayer(!isSinglePlayer)}
                                            fullWidth
                                            style={{ marginBottom: '10px' }}
                                        >
                                            Switch to {isSinglePlayer ? 'Two Player' : 'Single Player'} Mode
                                        </Button>
                                    </div>

                                    {/* Scores */}
                                    <div className="scores">
                                        <Typography variant="h6" align="center" gutterBottom>
                                            Scores
                                        </Typography>
                                        <div className="player-score">
                                            <Avatar src={playerXAvatar} alt={playerX} />
                                            <Typography variant="body1" style={{ marginLeft: '10px' }}>
                                                {playerX}: {scores.X}
                                            </Typography>
                                        </div>
                                        {!isSinglePlayer && (
                                            <div className="player-score">
                                                <Avatar src={playerOAvatar} alt={playerO} />
                                                <Typography variant="body1" style={{ marginLeft: '10px' }}>
                                                    {playerO}: {scores.O}
                                                </Typography>
                                            </div>
                                        )}
                                        <div className="player-score">
                                            <Avatar src={playerDrawAvatar} alt={playerX} />
                                            <Typography variant="body1" style={{ marginLeft: '10px' }}>
                                                Draws: {scores.Draws}
                                            </Typography>
                                        </div>
                                        {/* <Typography variant="body1">
                                            Draws: {scores.Draws}
                                        </Typography> */}
                                    </div>


                                </CardContent>
                            </Card>
                        </Grid>
                        {/* Game Board Section */}
                        <Grid item xs={12} md={3}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" align="center" gutterBottom>
                                        {/* Next Player */}
                                        {status}
                                    </Typography>
                                    <Avatar
                                        src={nextPlayerAvatar}
                                        alt={nextPlayerName}
                                        style={{ width: '120px', height: '120px', margin: '0 auto' }}
                                    />
                                    <Typography variant="subtitle1" align="center">
                                        {nextPlayerName}
                                    </Typography>
                                    {/* Status Message */}
                                    <Typography variant="h5" align="center" gutterBottom>
                                        {/* {status} */}
                                        Arena
                                    </Typography>
                                    {/* Game Board */}
                                    <Board
                                        squares={current.squares}
                                        onClick={handleClick}
                                        winningLine={winningLine}
                                    />

                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Card variant="outlined">
                                <CardContent>
                                    {/* Move History */}
                                    <Typography variant="h6" align="center" gutterBottom>
                                        Move History
                                    </Typography >
                                    <ol>{moves}</ol>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
                {/* Footer Component */}
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default Game;

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], // Rows
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6], // Columns
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8], // Diagonals
        [2, 4, 6],
    ];

    for (let line of lines) {
        const [a, b, c] = line;
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return { player: squares[a], line };
        }
    }
    return null;
}
