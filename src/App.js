import React from "react";
import { useState } from "react";

export function Square({win=false, value, onSquareClick }) {
  return (
    <button className={"square"+(win?" win-cell":"")} onClick={() => onSquareClick()}>
      {value}
    </button>
  );
}

export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [win, setWin] = useState(false);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [move, setMove] = useState(0);
  const [winLine, setWinLine] = useState([-1, -1, -1]);

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (i) => {
    if (win || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    if (isX) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    setSquares(nextSquares);
    checkWin(nextSquares);

    const nextHistory = [...history.slice(0, move + 1), nextSquares];
    setHistory(nextHistory);
    setMove(history.length);
    setIsX(!isX);
  };

  const jumpTo = (move) => {
    setSquares(history[move]);
    setMove(move);
    checkWin(history[move]);
    setIsX(move % 2 === 0);
  };

  const checkWin = (squares) => {
    setWin(null);
    setWinLine([-1, -1, -1]);
    lines.forEach((line) => {
      const [i1, i2, i3] = line;
      if (
        squares[i1] &&
        squares[i1] === squares[i2] &&
        squares[i1] === squares[i3]
      ) {
        setWin(squares[i1]);
        // eslint-disable-next-line
        setWinLine(line);
      }
    });
  };

  let status;
  const winner = win;
  if (win) {
    status = "WINNER: " + winner;
  } else {
    status = "Turn: " + (isX ? "X" : "O");
  }

  const moves = history.map((squares, move) => {
    let desc;
    if (move > 0) {
      desc = "Turn to step #" + move;
    } else {
      desc = "Turn to START";
    }

    return (
      <li
        key={move}
        onClick={() => {
          jumpTo(move);
        }}
      >
        {desc}
      </li>
    );
  });

  return (
    <div className="game">
      <h3 className="heading">TicTacToe</h3>

      <div className="main-board">
        <div>
          <div className="board-row">
            <Square
              win={winLine.includes(0)}
              onSquareClick={() => handleClick(0)}
              value={squares[0]}
            />
            <Square
              win={winLine.includes(1)}
              onSquareClick={() => handleClick(1)}
              value={squares[1]}
            />
            <Square
              win={winLine.includes(2)}
              onSquareClick={() => handleClick(2)}
              value={squares[2]}
            />
          </div>
          <div className="board-row">
            <Square
              win={winLine.includes(3)}
              onSquareClick={() => handleClick(3)}
              value={squares[3]}
            />
            <Square
              win={winLine.includes(4)}
              onSquareClick={() => handleClick(4)}
              value={squares[4]}
            />
            <Square
              win={winLine.includes(5)}
              onSquareClick={() => handleClick(5)}
              value={squares[5]}
            />
          </div>
          <div className="board-row">
            <Square
              win={winLine.includes(6)}
              onSquareClick={() => handleClick(6)}
              value={squares[6]}
            />
            <Square
              win={winLine.includes(7)}
              onSquareClick={() => handleClick(7)}
              value={squares[7]}
            />
            <Square
              win={winLine.includes(8)}
              onSquareClick={() => handleClick(8)}
              value={squares[8]}
            />
          </div>
          <p className="status">{status}</p>
        </div>

        <ol className="history">{moves}</ol>
      </div>
    </div>
  );
}
