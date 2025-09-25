
import React from 'react';
import { GameMode, Challenge, ChallengeType } from '../types';
import { CubeIcon, TargetIcon, TrophyIcon } from './icons';

interface GameUIProps {
  mode: GameMode;
  setMode: (mode: GameMode) => void;
  score: number;
  challenge: Challenge | null;
  onNewChallenge: () => void;
  feedback: string;
  isCorrect: boolean | null;
}

const GameUI: React.FC<GameUIProps> = ({ mode, setMode, score, challenge, onNewChallenge, feedback, isCorrect }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200 space-y-4">
      <div className="flex items-center justify-between">
         <h2 className="text-xl font-bold text-slate-700">Game Zone</h2>
         <div className="flex items-center gap-2 font-bold text-amber-600">
             <TrophyIcon className="w-6 h-6"/>
             <span className="text-2xl">{score}</span>
         </div>
      </div>
      
      {/* Mode Toggle */}
      <div className="flex bg-slate-200 rounded-lg p-1">
        <button
          onClick={() => setMode(GameMode.Explore)}
          className={`w-1/2 py-2 px-4 text-center rounded-md font-semibold transition-colors ${mode === GameMode.Explore ? 'bg-white shadow' : 'text-slate-500'}`}
        >
          <CubeIcon className="w-5 h-5 inline-block mr-2"/>
          Explore
        </button>
        <button
          onClick={() => setMode(GameMode.Challenge)}
          className={`w-1/2 py-2 px-4 text-center rounded-md font-semibold transition-colors ${mode === GameMode.Challenge ? 'bg-white shadow' : 'text-slate-500'}`}
        >
          <TargetIcon className="w-5 h-5 inline-block mr-2"/>
          Challenge
        </button>
      </div>

      {/* Challenge Section */}
      {mode === GameMode.Challenge && (
        <div className="text-center pt-4 space-y-3">
          {challenge && (
            <div className="bg-blue-100 text-blue-800 p-4 rounded-lg">
              <p className="font-semibold">Your Target:</p>
              <p className="text-2xl font-bold">
                {challenge.type === ChallengeType.Volume ? 'Volume' : 'Surface Area'} of {challenge.targetValue}
              </p>
            </div>
          )}
          
          <div className="h-8 flex items-center justify-center">
            {feedback && (
                <p className={`font-bold text-lg transition-all duration-300 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>
            )}
          </div>

          <button
            onClick={onNewChallenge}
            className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            New Challenge
          </button>
        </div>
      )}

       {mode === GameMode.Explore && (
        <div className="text-center pt-4 text-slate-500 h-[140px] flex items-center justify-center">
            <p>Freely adjust the sliders to see how volume and surface area change. Unfold the shape to understand its surfaces!</p>
        </div>
       )}
    </div>
  );
};

export default GameUI;
