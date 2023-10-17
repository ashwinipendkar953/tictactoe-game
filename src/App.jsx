import './styles.scss';
import Board from './components/Board';
import { useState } from 'react';
import { calculateWinner } from './CalculateWinner';
import StatusMessage from './components/statusMessage';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(false);

  const winner = calculateWinner(squares);

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
        <StatusMessage squares={squares} isXNext={isXNext} winner={winner} />
        <Board squares={squares} handleSquareClick={handleSquareClick} />
      </div>
    </>
  );
}

export default App;
