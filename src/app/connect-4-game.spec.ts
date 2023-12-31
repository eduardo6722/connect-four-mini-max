import { Connect4Game, TABLE_HEIGHT } from './connect-4-game';

describe('Connect4 Game', function () {
  let connect4: Connect4Game;

  beforeEach(() => {
    connect4 = new Connect4Game(['red', 'yellow']);
  });

  it('Should init the game', () => {
    expect(connect4.getNodes()).toHaveLength(TABLE_HEIGHT);
    expect(connect4.getNodes()[0][0].player).toBe(null);
  });

  it('Should add a node', () => {
    connect4.addNode({ player: 'red' }, 0);
    expect(connect4.getNodes()[5][0].player).toBe('red');
  });

  it('Should not replace the node', () => {
    connect4.addNode({ player: 'red' }, 1);
    expect(connect4.getNodes()[5][1].player).toBe('red');
    connect4.addNode({ player: 'yellow' }, 2);
    expect(connect4.getNodes()[5][2].player).toBe('yellow');
  });

  it('Should not permit the same player move twice', () => {
    connect4.addNode({ player: 'red' }, 6);
    expect(connect4.getNodes()[5][6].player).toBe('red');
    connect4.addNode({ player: 'red' }, 1);
    expect(connect4.getNodes()[0][1].player).toBe(null);
  });

  it('Should not permit invalid move', () => {
    connect4.addNode({ player: 'red' }, 0);
    expect(connect4.getNodes()[0][0].player).toBe(null);
    connect4.addNode({ player: 'red' }, 0);
    expect(connect4.getNodes()[5][0].player).toBe('red');
  });

  it('Should be able to stack movements', () => {
    connect4.addNode({ player: 'red' }, 0);
    connect4.addNode({ player: 'yellow' }, 0);
    connect4.addNode({ player: 'red' }, 0);
    connect4.addNode({ player: 'yellow' }, 0);
    expect(connect4.getNodes()[5][0].player).toBe('red');
    expect(connect4.getNodes()[4][0].player).toBe('yellow');
    expect(connect4.getNodes()[3][0].player).toBe('red');
    expect(connect4.getNodes()[2][0].player).toBe('yellow');
  });

  it('Should win the game with a stack', () => {
    connect4.addNode({ player: 'red' }, 0);
    connect4.addNode({ player: 'yellow' }, 1);
    connect4.addNode({ player: 'red' }, 0);
    connect4.addNode({ player: 'yellow' }, 2);
    connect4.addNode({ player: 'red' }, 0);
    connect4.addNode({ player: 'yellow' }, 3);
    connect4.addNode({ player: 'red' }, 0);
    expect(connect4.getWinner()).toBe('red');
  });

  it('Should not win the game with a stack', () => {
    connect4.addNode({ player: 'red' }, 0);
    connect4.addNode({ player: 'yellow' }, 0);
    connect4.addNode({ player: 'red' }, 0);
    connect4.addNode({ player: 'yellow' }, 2);
    connect4.addNode({ player: 'red' }, 0);
    connect4.addNode({ player: 'yellow' }, 3);
    connect4.addNode({ player: 'red' }, 0);
    expect(connect4.getWinner()).toBe(null);
  });

  it('Should win the game with a row', () => {
    connect4.addNode({ player: 'red' }, 0);
    connect4.addNode({ player: 'yellow' }, 0);
    connect4.addNode({ player: 'red' }, 1);
    connect4.addNode({ player: 'yellow' }, 0);
    connect4.addNode({ player: 'red' }, 2);
    connect4.addNode({ player: 'yellow' }, 0);
    connect4.addNode({ player: 'red' }, 3);
    expect(connect4.getWinner()).toBe('red');
  });

  it('Should win the game with a row-reverse', () => {
    connect4.addNode({ player: 'red' }, 3);
    connect4.addNode({ player: 'yellow' }, 3);
    connect4.addNode({ player: 'red' }, 2);
    connect4.addNode({ player: 'yellow' }, 2);
    connect4.addNode({ player: 'red' }, 1);
    connect4.addNode({ player: 'yellow' }, 1);
    connect4.addNode({ player: 'red' }, 0);
    expect(connect4.getWinner()).toBe('red');
  });

  it('Should have isWinner flag set to true', () => {
    connect4.addNode({ player: 'red' }, 0);
    connect4.addNode({ player: 'yellow' }, 0);
    connect4.addNode({ player: 'red' }, 1);
    connect4.addNode({ player: 'yellow' }, 0);
    connect4.addNode({ player: 'red' }, 2);
    connect4.addNode({ player: 'yellow' }, 0);
    connect4.addNode({ player: 'red' }, 3);
    expect(connect4.getNodes()[5][3].isWinner).toBe(true);
  });

  it('Should win with leading diagonal', () => {
    connect4.addNode({ player: 'red' }, 2);
    connect4.addNode({ player: 'yellow' }, 3);
    connect4.addNode({ player: 'red' }, 4);
    connect4.addNode({ player: 'yellow' }, 5);
    connect4.addNode({ player: 'red' }, 2);
    connect4.addNode({ player: 'yellow' }, 4);
    connect4.addNode({ player: 'red' }, 3);
    connect4.addNode({ player: 'yellow' }, 3);
    connect4.addNode({ player: 'red' }, 2);
    connect4.addNode({ player: 'yellow' }, 2);
    expect(connect4.getWinner()).toBe('yellow');
  });

  it('Should win the game with a row', () => {
    connect4.addNode({ player: 'red' }, 0);
    connect4.addNode({ player: 'yellow' }, 0);
    connect4.addNode({ player: 'red' }, 1);
    connect4.addNode({ player: 'yellow' }, 1);
    connect4.addNode({ player: 'red' }, 2);
    connect4.addNode({ player: 'yellow' }, 2);
    connect4.addNode({ player: 'red' }, 4);
    connect4.addNode({ player: 'yellow' }, 4);
    connect4.addNode({ player: 'red' }, 3);
    expect(connect4.getWinner()).toBe('red');
  });
});
