'use client';

import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { Connect4Game, IGameNode, Player } from '../../app/connect-4-game';
import { GameLevel, GameMode } from './Connect4';

interface GameProps {
  gameMode: GameMode;
  gameLevel: GameLevel;
}

function Game({ gameMode, gameLevel }: GameProps) {
  const [game, setGame] = useState<Connect4Game>();
  const [nodes, setNodes] = useState<IGameNode[][]>([[]]);
  const [player, setPlayer] = useState<Player>('red');
  const [hoverColumn, setHoverColumn] = useState<number>();
  const [winner, setWinner] = useState<Player>();
  const [isGameTied, setIsGameTied] = useState(false);

  const isTied = () => {
    let tied = true;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes[i].length; j++) {
        if (nodes[i][j].player === null) {
          tied = false;
        }
      }
    }
    return tied;
  };

  const handleMove = (j: number) => {
    if (!game || winner || isGameTied) return;
    game.addNode({ player }, j);
    const checkWinner = game.getWinner();
    if (checkWinner) {
      setWinner(checkWinner);
    }
    setNodes(game.getNodes());
    setPlayer((current) => (current === 'red' ? 'yellow' : 'red'));
    const tied = isTied();
    setIsGameTied(tied);
  };

  const getWinnerAnimationClass = (node: IGameNode) => {
    if (!winner || !node.isWinner) return '';
    if (winner === 'red') return 'blink-red';
    return 'blink-yellow';
  };

  const getNextIndexColor = (indexI: number, j: number) => {
    if (!game) return undefined;
    const i = game.getNextIndexI(j);
    if (nodes[i][j].player !== null) return undefined;
    if (i === indexI && hoverColumn === j) {
      return player;
    }
    return undefined;
  };

  useEffect(() => {
    const newGame = new Connect4Game(['red', 'yellow']);
    setGame(newGame);
    setNodes(newGame.getNodes());
  }, []);

  if (isGameTied) {
    console.log('empate');
  }

  return (
    <div>
      {winner ? (
        <ReactConfetti width={window.innerWidth} height={window.innerHeight} />
      ) : undefined}
      <div className='grid bg-[#3f6cea] justify-center rounded-md px-3 py-3'>
        {nodes.map((row, i) => (
          <div key={i} className='flex flex-row'>
            {row.map((node, j) => (
              <div
                onMouseOver={() => !winner && setHoverColumn(j)}
                onMouseLeave={() => setHoverColumn(undefined)}
                className={`${
                  hoverColumn === j ? 'bg-[#154eeb]' : 'bg-[#3f6cea]'
                } w-[42px] md:w-[72px] h-[42px] md:h-[72px] flex justify-center items-center relative p-2 cursor-pointer`}
                key={j}
                onClick={() => handleMove(j)}
              >
                <div
                  style={{
                    border: getNextIndexColor(i, j)
                      ? `12px solid ${getNextIndexColor(i, j) as string}`
                      : undefined,
                    backgroundColor: node.player || 'white',
                  }}
                  className={`${getWinnerAnimationClass(
                    node
                  )} w-full h-full rounded-full duration-100 transition-all`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;
