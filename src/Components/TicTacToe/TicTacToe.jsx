import { useState, React, useRef } from 'react'
import './TicTacToe.css'
import circle_icon from '../Assets/circle.png'
import cross_icon from '../Assets/cross.png'


let data = ["", "", "", "", "", "", "", "", ""];

export default function TicTacToe() {

    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let titleRef = useRef(null);

    const toggle = (e, num) => {
        if (lock) {
            return 0;
        }
        if (count % 2 === 0) {
            e.target.innerHTML = `<img src='${circle_icon}' />`;
            data[num] = 'x';
            setCount(++count);
        } else {
            e.target.innerHTML = `<img src='${cross_icon}' />`;
            data[num] = 'o';
            setCount(++count);
        }
        checkWin()
    }

    const checkWin = () => {
        // Define the winning combinations
        const winningCombinations = [
            [0, 1, 2], // Top row
            [3, 4, 5], // Middle row
            [6, 7, 8], // Bottom row
            [0, 3, 6], // First column
            [1, 4, 7], // Second column
            [2, 5, 8], // Third column
            [0, 4, 8], // Diagonal from top-left to bottom-right
            [2, 4, 6], // Diagonal from top-right to bottom-left
        ];

        // Using reduce to check for the winning combination
        const winner = winningCombinations.reduce((acc, [a, b, c]) => {
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                return data[a]; // Return the winner if found
            }
            return acc; // Otherwise, keep the accumulator value (null)
        }, null);

        if (winner) {
            won(data);
            return data[winningCombinations.find(([a, b, c]) => data[a] === data[b] && data[a] === data[c])[0]];
        }

        if (!data.includes("")) {
            setLock(true);
            return "draw";
        }

        return null;
    }

    const won = (winner) => {
        setLock(true);
        if (winner === "x") {
            titleRef.current.innerHTML = `Player <img src='${cross_icon}' /> Won`;
        } else {
            titleRef.current.innerHTML = `Player <img src='${circle_icon}' /> Won`;
        }
    }

    const reset = () => {
        data.fill("");
        setCount(0);
        setLock(false);
        const cells = document.querySelectorAll('.boxes');
        cells.forEach(cell => cell.innerHTML = '');
        titleRef.current.innerHTML = `Tic-Tac-Toe using <span>React</span>`;
    }

    return (
        <div className='container'>
            <h1 className='title' ref={titleRef}>Tic-Tac-Toe using <span>React</span></h1>
            <div className="board">
                <div className="row1">
                    <div className="boxes" onClick={(e) => toggle(e, 0)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 1)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 2)}></div>
                </div>
                <div className="row2">
                    <div className="boxes" onClick={(e) => toggle(e, 3)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 4)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 5)}></div>
                </div>
                <div className="row3">
                    <div className="boxes" onClick={(e) => toggle(e, 6)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 7)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 8)}></div>
                </div>
            </div>
            <button className="reset" onClick={reset}>Reset</button>
        </div>
    )
}
