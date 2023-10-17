import './styles.scss';
import Board from './components/Board';
import { useState } from 'react';
import { calculateWinner } from './CalculateWinner';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(false);

  const nextPlayer = isXNext ? 'X' : 'O';

  const winner = calculateWinner(squares);

  const statusMessage = winner
    ? `Winner is ${winner}`
    : `Next player is ${nextPlayer}`;

  const handleSquareClick = clickedPosition => {
    if (squares[clickedPosition] || winner) {
      return;
    }

    setSquares(currentSquares => {
      return currentSquares.map((squareValue, position) => {
        if (clickedPosition === position) {
          return isXNext ? 'X' : 'O';
        }
        return squareValue;
      });
    });
    setIsXNext(currentIsNext => !currentIsNext);
  };

  return (
    <>
      <div className="app">
        <h1> {statusMessage} </h1>
        <Board squares={squares} handleSquareClick={handleSquareClick} />
      </div>
    </>
  );
}

export default App;
