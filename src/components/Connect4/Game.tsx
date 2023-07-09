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

  const handleMove = (j: number) => {
    if (!game || winner) return;
    game.addNode({ player }, j);
    const checkWinner = game.getWinner();
    if (checkWinner) {
      setWinner(checkWinner);
    }
    setNodes(game.getNodes());
    setPlayer((current) => (current === 'red' ? 'yellow' : 'red'));
  };

  const getWinnerAnimationClass = (node: IGameNode) => {
    if (!winner || !node.isWinner) return '';
    if (winner === 'red') return 'blink-red';
    return 'blink-yellow';
  };

  const getNextIndexColor = (indexI: number, j: number) => {
    if (!game) return 'white';
    const i = game.getNextIndexI(j);
    if (i === indexI && hoverColumn === j) {
      return player;
    }
    return 'white';
  };

  useEffect(() => {
    const newGame = new Connect4Game(['red', 'yellow']);
    setGame(newGame);
    setNodes(newGame.getNodes());
    for (let i = 0; i < newGame.getNodes().length; i++) {
      console.log(newGame.getNodes()[i]);
    }
  }, []);

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
                } w-[72px] h-[72px] flex justify-center items-center relative p-2 cursor-pointer`}
                key={j}
                onClick={() => handleMove(j)}
              >
                <div
                  style={{
                    backgroundColor:
                      node.player || (getNextIndexColor(i, j) as string),
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
