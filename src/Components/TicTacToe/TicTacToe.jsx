import { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

export default function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(""));
    const [currentPlayer, setCurrentPlayer] = useState('x');
    const [lock, setLock] = useState(false);
    const titleRef = useRef(null);

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const toggle = (index) => {
        if (lock || board[index]) return;

        const updatedBoard = [...board];
        updatedBoard[index] = currentPlayer;
        setBoard(updatedBoard);

        if (checkWin(updatedBoard)) {
            endGame(currentPlayer);
        } else if (!updatedBoard.includes("")) {
            endGame("draw");
        } else {
            setCurrentPlayer(currentPlayer === 'x' ? 'o' : 'x');
        }
    };

    const checkWin = (updatedBoard) => {
        return winningCombinations.some(([a, b, c]) =>
            updatedBoard[a] && updatedBoard[a] === updatedBoard[b] && updatedBoard[a] === updatedBoard[c]
        );
    };

    const endGame = (winner) => {
        setLock(true);
        if (winner === 'draw') {
            titleRef.current.innerHTML = `It's a Draw! ✨`;
        } else {
            const winnerIcon = winner === 'x' ? circle_icon : cross_icon;
            titleRef.current.innerHTML = `Player <img src='${winnerIcon}' alt='winner'/> Wins!`;
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(""));
        setCurrentPlayer('x');
        setLock(false);
        titleRef.current.innerHTML = `Tic-Tac-Toe using <span>React</span>`;
    };

    const renderBox = (index) => (
        <div
            key={index}
            className={`box ${board[index] ? 'filled' : ''}`}
            role="button"
            tabIndex={0}
            onClick={() => toggle(index)}
            onKeyDown={(e) => e.key === 'Enter' && toggle(index)}
        >
            {board[index] && (
                <img
                    src={board[index] === 'x' ? circle_icon : cross_icon}
                    alt={board[index] === 'x' ? 'Circle' : 'Cross'}
                    className="icon"
                />
            )}
        </div>
    );

    return (
        <>
            <div className="aurora"></div>
            <div className="sparkles" >
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="sparkle" />
                ))}
            </div>
            <div className="falling-stars">
                {Array.from({ length: 20 }).map((_, i) => {
                    const left = Math.random() * 100; // random left 0%-100%
                    const delay = Math.random() * 10; // random delay 0-10s
                    const duration = 8 + Math.random() * 8; // random duration between 8s–16s
                    const size = 50 + Math.random() * 50; // random height between 50px–100px
                    const opacity = 0.4 + Math.random() * 0.5; // random opacity between 0.4–0.9

                    return (
                        <div
                            key={i}
                            className="falling-star"
                            style={{
                                left: `${left}%`,
                                top: `-${Math.random() * 30}%`, // random start higher
                                animationDelay: `${delay}s`,
                                animationDuration: `${duration}s`,
                                height: `${size}px`,
                                opacity: opacity,
                            }}
                        />
                    );
                })}
            </div>
            <div className='container'>

                <h1 className='title' ref={titleRef}>Tic-Tac-Toe using <span>React</span></h1>
                <div className='board'>
                    {board.map((_, index) => renderBox(index))}
                </div>
                <button className='reset' onClick={resetGame}>Reset Game</button>
            </div>
        </>
    );
}