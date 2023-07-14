'use client';

import { useState } from 'react';
import Game from './Game';
import Level from './Level';
import Mode from './Mode';

export enum GameLevels {
  easy = 2,
  medium = 5,
  hard = 7,
}
export type GameMode = 'human-vs-robot' | 'human-vs-human';
export type GameLevel = GameLevels.easy | GameLevels.medium | GameLevels.hard;

type GameStep = 'game-mode' | 'level' | 'game';

function Connect4() {
  const [gameMode, setGameMode] = useState<GameMode>();
  const [gameLevel, setGameLevel] = useState<GameLevel>();
  const [step, setStep] = useState<GameStep>('game-mode');

  return (
    <div className='flex flex-col items-center justify-center h-screen relative'>
      <h1 className='text-[20px] md:text-[36px] mb-8 font-bold absolute top-[4%]'>
        <span className='text-[#436ee6]'>Connect</span>
        <span className='text-[#ff0000]'>4</span> Minimax
      </h1>
      {step === 'game-mode' ? (
        <Mode
          onClick={(mode: GameMode) => {
            if (mode === 'human-vs-human') {
              setStep('game');
            } else {
              setStep('level');
            }
            setGameMode(mode);
          }}
        />
      ) : undefined}
      {step === 'level' ? (
        <Level
          onClick={(level: GameLevel) => {
            setStep('game');
            setGameLevel(level);
          }}
        />
      ) : undefined}
      {step === 'game' ? (
        <Game
          gameMode={gameMode as GameMode}
          gameLevel={gameLevel as GameLevel}
          handleNewGame={() => setStep('game-mode')}
        />
      ) : undefined}
    </div>
  );
}

export default Connect4;
