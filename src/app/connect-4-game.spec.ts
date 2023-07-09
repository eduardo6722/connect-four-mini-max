import { Connect4Game, TABLE_HEIGHT } from './connect-4-game';

describe('Connect4 Game', function () {
  let connect4: Connect4Game;

  beforeEach(() => {
    connect4 = new Connect4Game(['red', 'yellow']);
  });

  it('Should init the game', () => {
    expect(connect4.getGame()).toHaveLength(TABLE_HEIGHT);
    expect(connect4.getGame()[0][0].player).toBe(null);
  });

  it('Should add a node', () => {
    connect4.addNode({ player: 'red' }, [5, 0]);
    expect(connect4.getGame()[5][0].player).toBe('red');
  });

  it('Should not replace the node', () => {
    connect4.addNode({ player: 'red' }, [5, 1]);
    expect(connect4.getGame()[5][1].player).toBe('red');
    connect4.addNode({ player: 'yellow' }, [5, 2]);
    expect(connect4.getGame()[5][2].player).toBe('yellow');
  });

  it('Should not permit the same player move twice', () => {
    connect4.addNode({ player: 'red' }, [5, 6]);
    expect(connect4.getGame()[5][6].player).toBe('red');
    connect4.addNode({ player: 'red' }, [5, 1]);
    expect(connect4.getGame()[0][1].player).toBe(null);
  });

  it('Should not permit invalid move', () => {
    connect4.addNode({ player: 'red' }, [0, 0]);
    expect(connect4.getGame()[0][0].player).toBe(null);
    connect4.addNode({ player: 'red' }, [5, 0]);
    expect(connect4.getGame()[5][0].player).toBe('red');
  });

  it('Should be able to stack movements', () => {
    connect4.addNode({ player: 'red' }, [5, 0]);
    connect4.addNode({ player: 'yellow' }, [4, 0]);
    connect4.addNode({ player: 'red' }, [3, 0]);
    connect4.addNode({ player: 'yellow' }, [2, 0]);
    expect(connect4.getGame()[5][0].player).toBe('red');
    expect(connect4.getGame()[4][0].player).toBe('yellow');
    expect(connect4.getGame()[3][0].player).toBe('red');
    expect(connect4.getGame()[2][0].player).toBe('yellow');
  });

  it('Should win the game with a stack', () => {
    connect4.addNode({ player: 'red' }, [5, 0]);
    connect4.addNode({ player: 'yellow' }, [5, 1]);
    connect4.addNode({ player: 'red' }, [4, 0]);
    connect4.addNode({ player: 'yellow' }, [5, 2]);
    connect4.addNode({ player: 'red' }, [3, 0]);
    connect4.addNode({ player: 'yellow' }, [5, 3]);
    connect4.addNode({ player: 'red' }, [2, 0]);
    expect(connect4.getWinner()).toBe('red');
  });

  it('Should not win the game with a stack', () => {
    connect4.addNode({ player: 'red' }, [5, 0]);
    connect4.addNode({ player: 'yellow' }, [4, 0]);
    connect4.addNode({ player: 'red' }, [3, 0]);
    connect4.addNode({ player: 'yellow' }, [5, 2]);
    connect4.addNode({ player: 'red' }, [2, 0]);
    connect4.addNode({ player: 'yellow' }, [5, 3]);
    connect4.addNode({ player: 'red' }, [1, 0]);
    expect(connect4.getWinner()).toBe(null);
  });

  it('Should win the game with a row', () => {
    connect4.addNode({ player: 'red' }, [5, 0]);
    connect4.addNode({ player: 'yellow' }, [4, 0]);
    connect4.addNode({ player: 'red' }, [5, 1]);
    connect4.addNode({ player: 'yellow' }, [3, 0]);
    connect4.addNode({ player: 'red' }, [5, 2]);
    connect4.addNode({ player: 'yellow' }, [2, 0]);
    connect4.addNode({ player: 'red' }, [5, 3]);
    expect(connect4.getWinner()).toBe('red');
  });

  it('Should win the game with a row-reverse', () => {
    connect4.addNode({ player: 'red' }, [5, 3]);
    connect4.addNode({ player: 'yellow' }, [4, 3]);
    connect4.addNode({ player: 'red' }, [5, 2]);
    connect4.addNode({ player: 'yellow' }, [4, 2]);
    connect4.addNode({ player: 'red' }, [5, 1]);
    connect4.addNode({ player: 'yellow' }, [4, 1]);
    connect4.addNode({ player: 'red' }, [5, 0]);
    expect(connect4.getWinner()).toBe('red');
  });

  it('Should have isWinner flag set to true', () => {
    connect4.addNode({ player: 'red' }, [5, 0]);
    connect4.addNode({ player: 'yellow' }, [4, 0]);
    connect4.addNode({ player: 'red' }, [5, 1]);
    connect4.addNode({ player: 'yellow' }, [3, 0]);
    connect4.addNode({ player: 'red' }, [5, 2]);
    connect4.addNode({ player: 'yellow' }, [2, 0]);
    connect4.addNode({ player: 'red' }, [5, 3]);
    console.table(connect4.getGame());
    expect(connect4.getGame()[5][3].isWinner).toBe(true);
  });

  it('Should win with leading diagonal', () => {
    connect4.addNode({ player: 'red' }, [5, 2]);
    connect4.addNode({ player: 'yellow' }, [5, 3]);
    connect4.addNode({ player: 'red' }, [5, 4]);
    connect4.addNode({ player: 'yellow' }, [5, 5]);
    connect4.addNode({ player: 'red' }, [4, 2]);
    connect4.addNode({ player: 'yellow' }, [4, 4]);
    connect4.addNode({ player: 'red' }, [4, 3]);
    connect4.addNode({ player: 'yellow' }, [3, 3]);
    connect4.addNode({ player: 'red' }, [3, 2]);
    connect4.addNode({ player: 'yellow' }, [2, 2]);
    expect(connect4.getWinner()).toBe('yellow');
  });

  it('Should win the game with a row', () => {
    connect4.addNode({ player: 'red' }, [5, 0]);
    connect4.addNode({ player: 'yellow' }, [4, 0]);
    connect4.addNode({ player: 'red' }, [5, 1]);
    connect4.addNode({ player: 'yellow' }, [4, 1]);
    connect4.addNode({ player: 'red' }, [5, 2]);
    connect4.addNode({ player: 'yellow' }, [4, 2]);
    connect4.addNode({ player: 'red' }, [5, 4]);
    connect4.addNode({ player: 'yellow' }, [4, 4]);
    connect4.addNode({ player: 'red' }, [5, 3]);
    expect(connect4.getWinner()).toBe('red');
  });
});
