'use client';

import { bestMove } from '@/app/minimax';
import { useCallback, useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { Connect4Game, IGameNode, Player } from '../../app/connect-4-game';
import { GameLevel, GameMode } from './Connect4';

interface GameProps {
  gameMode: GameMode;
  gameLevel: GameLevel;
  handleNewGame: () => void;
}

const playerName = {
  red: 'Vermelho',
  yellow: 'Amarelo',
};

function Game({ gameMode, gameLevel, handleNewGame }: GameProps) {
  const [game, setGame] = useState<Connect4Game>();
  const [nodes, setNodes] = useState<IGameNode[][]>([[]]);
  const [player, setPlayer] = useState<Player>('red');
  const [hoverColumn, setHoverColumn] = useState<number>();
  const [winner, setWinner] = useState<Player>();
  const [isGameTied, setIsGameTied] = useState(false);

  const isTied = useCallback(() => {
    let tied = true;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes[i].length; j++) {
        if (nodes[i][j].player === null) {
          tied = false;
        }
      }
    }
    return tied;
  }, [nodes]);

  const handleMove = useCallback(
    (j: number) => {
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
    },
    [game, isGameTied, isTied, player, winner]
  );

  const getWinnerAnimationClass = (node: IGameNode) => {
    if (!winner || !node.isWinner) return '';
    if (winner === 'red') return 'blink-red';
    return 'blink-yellow';
  };

  const getNextIndexColor = (indexI: number, j: number) => {
    if (!game || winner) return undefined;
    const i = game.getNextIndexI(j);
    if (nodes[i][j].player !== null) return undefined;
    if (i === indexI && hoverColumn === j) {
      return player;
    }
    return undefined;
  };

  const handleRestartGame = useCallback(() => {
    const newGame = new Connect4Game(['red', 'yellow']);
    setGame(newGame);
    setNodes(newGame.getNodes());
    setWinner(undefined);
    setIsGameTied(false);
    setPlayer('red');
  }, []);

  useEffect(() => {
    const newGame = new Connect4Game(['red', 'yellow']);
    setGame(newGame);
    setNodes(newGame.getNodes());
  }, []);

  useEffect(() => {
    if (winner) {
      setHoverColumn(undefined);
    }
  }, [winner]);

  useEffect(() => {
    if (player === 'yellow' && !winner && !isGameTied && game) {
      const j = bestMove(game.getNodes(), 5);
      handleMove(j);
      console.log('result', j);
      setPlayer('red');
    }
  }, [game, handleMove, isGameTied, player, winner]);

  return (
    <div>
      {winner ? (
        <ReactConfetti width={window.innerWidth} height={window.innerHeight} />
      ) : undefined}
      <div className='grid bg-[#3f6cea] justify-center rounded-md px-3 pb-3 relative'>
        <div className='flex items-center justify-between h-[56px]'>
          {!winner ? (
            <>
              {isGameTied ? (
                <p className='font-bold'>Empate!</p>
              ) : (
                <>
                  <p className='font-bold'>
                    Rodada do{' '}
                    <span style={{ color: player as string }}>
                      {playerName[player as string]}
                    </span>
                  </p>
                  <div className='flex items-center gap-2'>
                    <span className='font-bold'>Modo debug</span>
                    <Toggle onChange={(e) => console.log(e)} />
                  </div>
                </>
              )}
            </>
          ) : (
            <p className='font-bold'>
              Vencedor:{' '}
              <span style={{ color: winner as string }}>
                {playerName[winner as string]}!
              </span>
            </p>
          )}
          {winner || isGameTied ? (
            <div className='flex items-center gap-2'>
              <button
                className='font-bold px-4 py-2 bg-[red] hover:bg-[#ec0000] rounded-md leading-none duration-300'
                onClick={handleRestartGame}
              >
                Reiniciar jogo
              </button>
              <button
                className='font-bold px-4 py-2 bg-[#154eeb] hover:bg-[#0341eb] rounded-md leading-none duration-300'
                onClick={handleNewGame}
              >
                Novo jogo
              </button>
            </div>
          ) : undefined}
        </div>
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
                  className={`${getWinnerAnimationClass(node)} ${
                    node.player ? 'filled-shadow' : ''
                  } w-full h-full rounded-full duration-100 transition-all`}
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
