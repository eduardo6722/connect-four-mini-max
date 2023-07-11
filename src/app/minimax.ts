import { IGameNode, Player, TABLE_HEIGHT, TABLE_WIDTH } from './connect-4-game';

const scores: { [key: string]: number } = {
  red: Infinity,
  yellow: -Infinity,
};

function countPieces(
  board: IGameNode[][],
  i: number,
  j: number,
  i2: number,
  j2: number,
  player: Player
) {
  let pieces = 0;

  for (i; i < i2; i++) {
    for (j; j < j2; j++) {
      if (board[i][j].player === player) {
        pieces += 1;
      }
    }
  }
  return pieces;
}

function countDiagonal(
  board: IGameNode[][],
  i: number,
  j: number,
  direction: number,
  player: Player
) {
  let pieces = 0;

  for (let x = 0; x < 4; x++) {
    if (direction === 1) {
      if (i + x < TABLE_HEIGHT && j + x < TABLE_WIDTH) {
        if (board[i + x][j + x].player === player) {
          pieces += 1;
        }
      }
    } else {
      if (i + x < TABLE_HEIGHT && j - x < TABLE_WIDTH && j - x > 0) {
        if (board[i + x][j - x].player === player) {
          pieces += 1;
        }
      }
    }
  }
  return pieces;
}

function player(board: IGameNode[][], y, x) {
  return y < 0 || x < 0 || y >= TABLE_HEIGHT || x >= TABLE_WIDTH
    ? null
    : board[y][x].player;
}

function getWinner(board: IGameNode[][]) {
  //loops through rows, columns, diagonals, etc for win condition

  for (let y = 0; y < TABLE_HEIGHT; y++) {
    for (let x = 0; x < TABLE_WIDTH; x++) {
      if (
        player(board, y, x) !== null &&
        player(board, y, x) === player(board, y, x + 1) &&
        player(board, y, x) === player(board, y, x + 2) &&
        player(board, y, x) === player(board, y, x + 3)
      ) {
        return player(board, y, x);
      }

      if (
        player(board, y, x) !== null &&
        player(board, y, x) === player(board, y + 1, x) &&
        player(board, y, x) === player(board, y + 2, x) &&
        player(board, y, x) === player(board, y + 3, x)
      ) {
        return player(board, y, x);
      }

      for (let d = -1; d <= 1; d += 2) {
        if (
          player(board, y, x) !== null &&
          player(board, y, x) === player(board, y + 1 * d, x + 1) &&
          player(board, y, x) === player(board, y + 2 * d, x + 2) &&
          player(board, y, x) === player(board, y + 3 * d, x + 3)
        ) {
          return player(board, y, x);
        }
      }
    }
  }

  for (let y = 0; y < TABLE_HEIGHT; y++)
    for (let x = 0; x < TABLE_WIDTH; x++)
      if (player(board, y, x) === null) return null;
  return -1; //tie
}

function getScore(
  board: IGameNode[][],
  player: Player,
  player2: Player,
  moveCount: number
) {
  //heuristic could be more in depth, using
  let score = 0;

  for (let i = 1; i < TABLE_HEIGHT; i++) {
    for (let j = 1; j < TABLE_WIDTH; j++) {
      if (
        (countPieces(board, i, j, i + 4, j, player) === 3 &&
          countPieces(board, i, j, i + 4, j, null) === 1) ||
        (countPieces(board, i, j, i, j + 4, player) === 3 &&
          countPieces(board, i, j, i, j + 4, null) === 1) ||
        (countDiagonal(board, i, j, 0, player) === 3 &&
          countDiagonal(board, i, j, 0, null) === 1) ||
        (countDiagonal(board, i, j, 1, player) === 3 &&
          countDiagonal(board, i, j, 1, null) === 1)
      ) {
        score += 1000;
      }

      if (
        (countPieces(board, i, j, i + 4, j, player) === 2 &&
          countPieces(board, i, j, i + 4, j, null) === 2) ||
        (countPieces(board, i, j, i, j + 4, player) === 2 &&
          countPieces(board, i, j, i, j + 4, null) === 2) ||
        (countDiagonal(board, i, j, 0, player) === 2 &&
          countDiagonal(board, i, j, 0, null) === 2) ||
        (countDiagonal(board, i, j, 1, player) === 2 &&
          countDiagonal(board, i, j, 1, null) === 2)
      ) {
        score += 10;
      }

      if (
        (countPieces(board, i, j, i + 4, j, player) === 1 &&
          countPieces(board, i, j, i + 4, j, null) === 3) ||
        (countPieces(board, i, j, i, j + 4, player) === 1 &&
          countPieces(board, i, j, i, j + 4, null) === 3) ||
        (countDiagonal(board, i, j, 0, player) === 1 &&
          countDiagonal(board, i, j, 0, null) === 3) ||
        (countDiagonal(board, i, j, 1, player) === 1 &&
          countDiagonal(board, i, j, 1, null) === 3)
      ) {
        score += 1;
      }

      if (
        (countPieces(board, i, j, i + 4, j, player2) === 3 &&
          countPieces(board, i, j, i + 4, j, null) === 1) ||
        (countPieces(board, i, j, i, j + 4, player2) === 3 &&
          countPieces(board, i, j, i, j + 4, null) === 1) ||
        (countDiagonal(board, i, j, 0, player2) === 3 &&
          countDiagonal(board, i, j, 0, null) === 1) ||
        (countDiagonal(board, i, j, 1, player2) === 3 &&
          countDiagonal(board, i, j, 1, null) === 1)
      ) {
        score -= 1000;
      }

      if (
        (countPieces(board, i, j, i + 4, j, player2) === 2 &&
          countPieces(board, i, j, i + 4, j, null) === 2) ||
        (countPieces(board, i, j, i, j + 4, player2) === 2 &&
          countPieces(board, i, j, i, j + 4, null) === 2) ||
        (countDiagonal(board, i, j, 0, player2) === 2 &&
          countDiagonal(board, i, j, 0, null) === 2) ||
        (countDiagonal(board, i, j, 1, player2) === 2 &&
          countDiagonal(board, i, j, 1, null) === 2)
      ) {
        score -= 10;
      }

      if (
        (countPieces(board, i, j, i + 4, j, player2) === 1 &&
          countPieces(board, i, j, i + 4, j, null) === 3) ||
        (countPieces(board, i, j, i, j + 4, player2) === 1 &&
          countPieces(board, i, j, i, j + 4, null) === 3) ||
        (countDiagonal(board, i, j, 0, player2) === 1 &&
          countDiagonal(board, i, j, 0, null) === 3) ||
        (countDiagonal(board, i, j, 1, player2) === 1 &&
          countDiagonal(board, i, j, 1, null) === 3)
      ) {
        score -= 1;
      }
    }
  }

  return score;
}

function minimax(
  board: IGameNode[][],
  depth: number,
  isMaximizing: boolean,
  movesCount: number,
  alpha: number,
  beta: number
) {
  let winner = getWinner(board);
  if (winner !== -1 && winner !== null) {
    return scores[winner] - 20 * movesCount;
  }

  if (winner === -1) {
    return 0 - 50 * movesCount;
  }

  if (depth === 0) {
    return getScore(board, 'red', 'yellow', movesCount);
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let j = 0; j < TABLE_HEIGHT; j++) {
      let tempI = nextSpace(board, j);

      if (tempI < TABLE_HEIGHT && tempI > -1) {
        board[tempI][j].player = 'yellow';

        let score = minimax(
          board,
          depth - 1,
          false,
          movesCount + 1,
          alpha,
          beta
        );

        board[tempI][j].player = null;

        bestScore = Math.max(score, bestScore);

        alpha = Math.max(bestScore, alpha);
        if (alpha >= beta) {
          break;
        }
      }
    }

    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let j = 0; j < TABLE_WIDTH; j++) {
      // Is the spot available?
      let tempI = nextSpace(board, j);

      if (tempI < TABLE_HEIGHT && tempI > -1) {
        board[tempI][j].player = 'red';

        let score = minimax(
          board,
          depth - 1,
          true,
          movesCount + 1,
          alpha,
          beta
        );

        board[tempI][j].player = null;

        bestScore = Math.min(score, bestScore);

        beta = Math.min(bestScore, beta);
        if (alpha >= beta) {
          break;
        }
      }
    }

    return bestScore;
  }
}

function nextSpace(board: IGameNode[][], index: number) {
  for (let i = TABLE_HEIGHT - 1; i >= 0; i--) {
    if (board[i][index].player === null) {
      return i;
    }
  }
  return -1;
}

export function bestMove(board: IGameNode[][], depth: number) {
  // AI to make its turn
  let bestScore = -Infinity;
  let move: number | null = null;
  let indexI = -1;

  const clonedBoard = JSON.parse(JSON.stringify(board));

  for (let j = 0; j < TABLE_WIDTH; j++) {
    indexI = nextSpace(clonedBoard, j);

    if (indexI >= 0) {
      if (move === null) {
        move = j;
      }

      clonedBoard[indexI][j].player = 'red';

      let score = minimax(clonedBoard, depth, false, 1, -Infinity, Infinity);

      if (score > bestScore) {
        bestScore = score;
        move = j;
      }
    }
  }

  return move;
}
