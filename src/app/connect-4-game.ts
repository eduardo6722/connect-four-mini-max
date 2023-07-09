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

  private checkEndGameStack(
    game: IGameNode[][],
    node: IGameNode,
    [positionI, j]: number[]
  ) {
    const maxRange = positionI + CONNECT_LENGTH;
    if (maxRange > TABLE_HEIGHT) return;
    for (let i = positionI; i < maxRange; i++) {
      if (game[i][j].player !== node.player) return;
      game[i][j].isWinner = true;
    }
    this.game = game;
    this.winner = node.player;
    return;
  }

  private checkEndGameRow(
    game: IGameNode[][],
    node: IGameNode,
    [i, positionJ]: number[]
  ) {
    let startRange = positionJ - (CONNECT_LENGTH - 1);
    if (startRange < 0) return;
    for (let j = startRange; j < startRange + 4; j++) {
      if (game[i][j].player !== node.player) return;
      game[i][j].isWinner = true;
    }
    this.game = game;
    this.winner = node.player;
    return;
  }

  private checkEndGameRowReverse(
    game: IGameNode[][],
    node: IGameNode,
    [i, positionJ]: number[]
  ) {
    let maxRange = positionJ + CONNECT_LENGTH;
    if (maxRange > TABLE_WIDTH) return;
    for (let j = 0; j < maxRange; j++) {
      if (game[i][j].player !== node.player) {
        return;
      }
      game[i][j].isWinner = true;
    }
    this.game = game;
    this.winner = node.player;
    return;
  }

  private checkEndGame(node: IGameNode, [i, j]: number[]) {
    const deepClone = JSON.parse(JSON.stringify(this.game));
    this.checkEndGameStack(deepClone, node, [i, j]);
    this.checkEndGameRow(deepClone, node, [i, j]);
    this.checkEndGameRowReverse(deepClone, node, [i, j]);
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
