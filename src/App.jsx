import './styles.scss';
import Board from './components/Board';
import { useState } from 'react';
import { calculateWinner } from './CalculateWinner';
import StatusMessage from './components/statusMessage';
import History from './components/History';

const NEW_GAME = [
  {
    squares: Array(9).fill(null),
    isXNext: false,
  },
];

function App() {
  const [history, setHistory] = useState(NEW_GAME);

  const [currentMove, setCurrentMove] = useState(0);

  const gamingBoard = history[currentMove];

  const winner = calculateWinner(gamingBoard.squares);

  console.log({ history, currentMove });

  const handleSquareClick = clickedPosition => {
    if (gamingBoard.squares[clickedPosition] || winner) {
      return;
    }

    setHistory(currentHistory => {
      const isTraversing = currentMove + 1 !== currentHistory.length;

      const lastGamingState = isTraversing
        ? currentHistory[currentMove]
        : currentHistory[currentHistory.length - 1];

      const nextSquareState = lastGamingState.squares.map(
        (squareValue, position) => {
          if (clickedPosition === position) {
            return lastGamingState.isXNext ? 'X' : 'O';
          }
          return squareValue;
        }
      );

      const base = isTraversing
        ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
        : currentHistory;

      return base.concat({
        squares: nextSquareState,
        isXNext: !lastGamingState.isXNext,
      });
    });
    setCurrentMove(move => move + 1);
  };

  const moveTo = move => {
    setCurrentMove(move);
  };

  const onNewGameStart = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };

  return (
    <>
      <div className="app">
        <StatusMessage gamingBoard={gamingBoard} winner={winner} />
        <Board
          squares={gamingBoard.squares}
          handleSquareClick={handleSquareClick}
        />
        <button
          type="button"
          className={`btn-reset ${winner ? 'active' : ''}`}
          onClick={onNewGameStart}
        >
          Start new game
        </button>
        <h2>Current game history</h2>
        <History history={history} moveTo={moveTo} currentMove={currentMove} />
      </div>
    </>
  );
}

export default App;
