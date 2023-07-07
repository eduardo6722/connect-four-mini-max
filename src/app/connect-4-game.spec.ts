import { Connect4Game, TABLE_WIDTH } from './connect-4-game';

describe('Connect4 Game', function () {
  let connect4: Connect4Game;

  beforeEach(() => {
    connect4 = new Connect4Game(['red', 'yellow']);
  });

  it('Should init the game', () => {
    expect(connect4.getGame()).toHaveLength(TABLE_WIDTH);
    expect(connect4.getGame()[0][0].player).toBe(null);
  });

  it('Should add a node', () => {
    const currentGame = connect4.addNode({ player: 'red' }, [0, 0]);
    expect(currentGame[0][0].player).toBe('red');
  });

  it('Should not replace the node', () => {
    let currentGame = connect4.addNode({ player: 'red' }, [0, 0]);
    expect(currentGame[0][0].player).toBe('red');
    currentGame = connect4.addNode({ player: 'yellow' }, [0, 0]);
    expect(currentGame[0][0].player).toBe('red');
  });

  it('Should not permit the same player move twice', () => {
    let currentGame = connect4.addNode({ player: 'red' }, [0, 0]);
    expect(currentGame[0][0].player).toBe('red');
    currentGame = connect4.addNode({ player: 'red' }, [0, 1]);
    expect(currentGame[0][1].player).toBe(null);
  });
});
