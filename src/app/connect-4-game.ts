export const TABLE_WIDTH = 7;
export const TABLE_HEIGHT = 6;

export type Player = 'red' | 'yellow' | null;

export interface IGameNode {
  player: Player;
}

export class Connect4Game {
  private players: Player[];
  private game: IGameNode[][];
  private lastPlayerMoved: Player;

  constructor(players: Player[]) {
    this.players = players;
    this.game = this.init();
    this.lastPlayerMoved = null;
  }

  getGame() {
    return this.game;
  }

  getPlayers() {
    return this.players;
  }

  addNode(node: IGameNode, [i, j]: number[]) {
    if (!this.isValidMove(node, [i, j])) {
      return this.game;
    }
    this.game[i][j] = node;
    this.lastPlayerMoved = node.player;
    return this.game;
  }

  checkEndGame() {
    return false;
  }

  private init() {
    this.game = [];
    for (let i = 0; i < TABLE_WIDTH; i++) {
      this.game.push([]);
      for (let j = 0; j < TABLE_HEIGHT; j++) {
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
    return true;
  }
}
