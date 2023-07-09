'use client';

import { useState } from 'react';
import Game from './Game';
import Level from './Level';
import Mode from './Mode';

export type GameMode = 'human-vs-robot' | 'human-vs-human';
export type GameLevel = 'easy' | 'normal' | 'hard';
type GameStep = 'game-mode' | 'level' | 'game';

function Connect4() {
  const [gameMode, setGameMode] = useState<GameMode>();
  const [gameLevel, setGameLevel] = useState<GameLevel>();
  const [step, setStep] = useState<GameStep>('game-mode');

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
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
        />
      ) : undefined}
    </div>
  );
}

export default Connect4;
