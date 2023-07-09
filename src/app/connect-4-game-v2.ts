export const TABLE_WIDTH = 7;
export const TABLE_HEIGHT = 6;
export const CONNECT_LENGTH = 4;

export type Player = 'red' | 'yellow' | null;

export interface IGameNode {
  player: Player;
  isWinner?: boolean;
}

export class Connect4Game {
  private players: Player[];
  private game: IGameNode[][];
  private lastPlayerMoved: Player;
  private winner: Player;

  constructor(players: Player[]) {
    this.players = players;
    this.game = this.init();
    this.lastPlayerMoved = null;
    this.winner = null;
  }

  private init() {
    this.game = [];
    for (let i = 0; i < TABLE_HEIGHT; i++) {
      this.game.push([]);
      for (let j = 0; j < TABLE_WIDTH; j++) {
        this.game[i].push({ player: null });
      }
    }
    return this.game;
  }

  private isValidMove(node: IGameNode, [i, j]: number[]) {
    if (this.lastPlayerMoved === node.player) {
      return false;
    }
    if (this.game[i][j].player !== null) {
      return false;
    }
    if (i < 0 || j < 0) return false;
    if (i >= TABLE_HEIGHT || j >= TABLE_WIDTH) {
      return false;
    }
    if (i === TABLE_HEIGHT - 1) {
      return true;
    }
    if (this.game[i + 1][j].player === null) {
      return false;
    }
    return true;
  }

  private checkEndGame(node: IGameNode, [i, j]: number[]) {
    const directions: [number, number][] = [
      [1, 0], // vertical
      [0, 1], // horizontal
      [1, 1], // diagonal (top-left to bottom-right)
      [-1, 1], // diagonal (bottom-left to top-right)
    ];

    for (const [dx, dy] of directions) {
      let count = 1; // count for the current direction
      let x = i + dx;
      let y = j + dy;

      // Check in the positive direction
      while (
        x >= 0 &&
        x < TABLE_HEIGHT &&
        y >= 0 &&
        y < TABLE_WIDTH &&
        this.game[x][y].player === node.player
      ) {
        count++;
        x += dx;
        y += dy;
      }

      // Check in the negative direction
      x = i - dx;
      y = j - dy;
      while (
        x >= 0 &&
        x < TABLE_HEIGHT &&
        y >= 0 &&
        y < TABLE_WIDTH &&
        this.game[x][y].player === node.player
      ) {
        count++;
        x -= dx;
        y -= dy;
      }

      // If count reaches the required CONNECT_LENGTH, the current player is the winner
      if (count >= CONNECT_LENGTH) {
        node.isWinner = true;
        this.winner = node.player;
        return;
      }
    }

    // Check if the game board is full (draw)
    const isBoardFull = this.game.every((row) =>
      row.every((cell) => cell.player !== null)
    );

    if (isBoardFull) {
      this.winner = null;
    }
  }

  getGame() {
    return this.game;
  }

  getPlayers() {
    return this.players;
  }

  getWinner() {
    return this.winner;
  }

  addNode(node: IGameNode, [i, j]: number[]) {
    if (!this.isValidMove(node, [i, j])) {
      return;
    }
    this.game[i][j] = node;
    this.lastPlayerMoved = node.player;
    this.checkEndGame(node, [i, j]);
  }
}
