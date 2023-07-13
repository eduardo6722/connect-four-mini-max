import { IGameNode } from './connect-4-game';

function evaluateBoard(board: IGameNode[][]) {
  // Define the heuristic values for different board configurations
  const heuristicValues = {
    yyyy: 1000, // AI wins
    rrrr: -1000, // Player wins
    yy: 50, // AI has 2 in a row
    rr: -50, // Player has 2 in a row
    y: 10, // AI has 1 in a row
    r: -10, // Player has 1 in a row
  };

  let score = 0;

  // Check rows for heuristic values
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      const slice = board[row].slice(col, col + 4).map((node) => node.player);
      const key = slice.join('');
      score += heuristicValues[key] || 0;
    }
  }

  // Check columns for heuristic values
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 3; row++) {
      const slice = [
        board[row][col].player,
        board[row + 1][col].player,
        board[row + 2][col].player,
        board[row + 3][col].player,
      ];
      const key = slice.join('');
      score += heuristicValues[key] || 0;
    }
  }

  // Check diagonals (positive slope) for heuristic values
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const slice = [
        board[row][col].player,
        board[row + 1][col + 1].player,
        board[row + 2][col + 2].player,
        board[row + 3][col + 3].player,
      ];
      const key = slice.join('');
      score += heuristicValues[key] || 0;
    }
  }

  // Check diagonals (negative slope) for heuristic values
  for (let row = 0; row < 3; row++) {
    for (let col = 3; col < 7; col++) {
      const slice = [
        board[row][col].player,
        board[row + 1][col - 1].player,
        board[row + 2][col - 2].player,
        board[row + 3][col - 3].player,
      ];
      const key = slice.join('');
      score += heuristicValues[key] || 0;
    }
  }

  return score;
}

// Function to check if the game is over and return the winning player
function checkGameOver(board) {
  // Check rows
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      const slice = board[row].slice(col, col + 4).map((node) => node.player);
      if (slice.every((player) => player === 'red')) {
        return 'red';
      } else if (slice.every((player) => player === 'yellow')) {
        return 'yellow';
      }
    }
  }

  // Check columns
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 3; row++) {
      const slice = [
        board[row][col].player,
        board[row + 1][col].player,
        board[row + 2][col].player,
        board[row + 3][col].player,
      ];
      if (slice.every((player) => player === 'red')) {
        return 'red';
      } else if (slice.every((player) => player === 'yellow')) {
        return 'yellow';
      }
    }
  }

  // Check diagonals (positive slope)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const slice = [
        board[row][col].player,
        board[row + 1][col + 1].player,
        board[row + 2][col + 2].player,
        board[row + 3][col + 3].player,
      ];
      if (slice.every((player) => player === 'red')) {
        return 'red';
      } else if (slice.every((player) => player === 'yellow')) {
        return 'yellow';
      }
    }
  }

  // Check diagonals (negative slope)
  for (let row = 0; row < 3; row++) {
    for (let col = 3; col < 7; col++) {
      const slice = [
        board[row][col].player,
        board[row + 1][col - 1].player,
        board[row + 2][col - 2].player,
        board[row + 3][col - 3].player,
      ];
      if (slice.every((player) => player === 'red')) {
        return 'red';
      } else if (slice.every((player) => player === 'yellow')) {
        return 'yellow';
      }
    }
  }

  // Check for a tie
  const isTie = board.every((row) => row.every((node) => node.player !== null));
  if (isTie) {
    return 'tie';
  }

  // Game is not over
  return null;
}

// Minimax function with alpha-beta pruning
function minimax(board, depth, alpha, beta, maximizingPlayer) {
  const gameOver = checkGameOver(board);

  if (depth === 0 || gameOver !== null) {
    if (gameOver === 'yellow') {
      return 1000 - depth; // AI wins
    } else if (gameOver === 'red') {
      return depth - 1000; // Player wins
    } else {
      return evaluateBoard(board); // Heuristic evaluation
    }
  }

  if (maximizingPlayer) {
    let maxEvaluation = -Infinity;
    for (let col = 0; col < 7; col++) {
      if (board[0][col].player === null) {
        const newBoard = JSON.parse(JSON.stringify(board));
        for (let row = 5; row >= 0; row--) {
          if (newBoard[row][col].player === null) {
            newBoard[row][col].player = 'yellow';
            break;
          }
        }
        const evaluation = minimax(newBoard, depth - 1, alpha, beta, false);
        maxEvaluation = Math.max(maxEvaluation, evaluation);
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) {
          break;
        }
      }
    }
    return maxEvaluation;
  } else {
    let minEvaluation = Infinity;
    for (let col = 0; col < 7; col++) {
      if (board[0][col].player === null) {
        const newBoard = JSON.parse(JSON.stringify(board));
        for (let row = 5; row >= 0; row--) {
          if (newBoard[row][col].player === null) {
            newBoard[row][col].player = 'red';
            break;
          }
        }
        const evaluation = minimax(newBoard, depth - 1, alpha, beta, true);
        minEvaluation = Math.min(minEvaluation, evaluation);
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) {
          break;
        }
      }
    }
    return minEvaluation;
  }
}
// Function to get the best move using minimax with alpha-beta pruning
export function bestMove(board: IGameNode[][], depth: number) {
  let bestMove = -1;
  let bestEvaluation = -Infinity;
  const alpha = -Infinity;
  const beta = Infinity;

  for (let col = 0; col < 7; col++) {
    if (board[0][col].player === null) {
      const newBoard = JSON.parse(JSON.stringify(board));
      for (let row = 5; row >= 0; row--) {
        if (newBoard[row][col].player === null) {
          newBoard[row][col].player = 'yellow';
          break;
        }
      }
      const evaluation = minimax(newBoard, depth, alpha, beta, false);
      if (evaluation > bestEvaluation) {
        bestEvaluation = evaluation;
        bestMove = col;
      }
    }
  }

  return bestMove;
}
