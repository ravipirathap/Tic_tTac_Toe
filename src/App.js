import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(() =>
    Array(3)
      .fill(0)
      .map(() => Array(3).fill(0))
  );
  const [currentPlayer, setCurrentPlayer] = useState(1);

  useEffect(() => {
    if (currentPlayer === 2 && !checkWinner() && board.flat().some((cell) => cell === 0)) {
      aiMove();
    }
  }, [board, currentPlayer]);

  const playerMove = (row, col) => {
    if (board[row][col] === 0 && currentPlayer === 1) {
      const updatedBoard = [...board];
      updatedBoard[row][col] = 1;
      setBoard(updatedBoard);
      setCurrentPlayer(2);
    }
  };

  const aiMove = () => {
    const emptyCells = [];
    board.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (col === 0) {
          emptyCells.push([rowIndex, colIndex]);
        }
      });
    });

    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const [row, col] = emptyCells[randomIndex];

      setTimeout(() => {
        const updatedBoard = [...board];
        updatedBoard[row][col] = 2;
        setBoard(updatedBoard);
        setCurrentPlayer(1);
      }, 500);
    }
  };

  const checkWinner = () => {
    // Check rows
    for (let row = 0; row < 3; row++) {
      if (
        board[row][0] !== 0 &&
        board[row][0] === board[row][1] &&
        board[row][1] === board[row][2]
      ) {
        return board[row][0]; // Return the winning player number
      }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
      if (
        board[0][col] !== 0 &&
        board[0][col] === board[1][col] &&
        board[1][col] === board[2][col]
      ) {
        return board[0][col]; // Return the winning player number
      }
    }

    // Check diagonals
    if (
      board[0][0] !== 0 &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      return board[0][0]; // Return the winning player number
    }
    if (
      board[0][2] !== 0 &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      return board[0][2]; // Return the winning player number
    }

    return 0; // Return 0 if there is no winner
  };

  const renderCell = (row, col) => {
    const cellValue = board[row][col];
    let displayValue = '';
    if (cellValue === 1) {
      displayValue = 'X';
    } else if (cellValue === 2) {
      displayValue = 'O';
    }
    return (
      <div className="cell" onClick={() => playerMove(row, col)}>
        {displayValue}
      </div>
    );
  };

  const resetGame = () => {
    setBoard(() =>
      Array(3)
        .fill(0)
        .map(() => Array(3).fill(0))
    );
    setCurrentPlayer(1);
  };

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((col, colIndex) => (
              <React.Fragment key={colIndex}>
                {renderCell(rowIndex, colIndex)}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
      {checkWinner() && (
        <div className="result">
          {checkWinner() === 1 ? 'Congratulations! You win!' : 'You lose! Better luck next time.'}
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
      {!checkWinner() && board.flat().every((cell) => cell !== 0) && (
        <div className="result">
          It's a tie!
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default App;
