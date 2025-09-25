
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Dimensions, GameMode, Challenge, ChallengeType } from './types';
import ShapeVisualizer from './components/ShapeVisualizer';
import ControlPanel from './components/ControlPanel';
import CalculationDisplay from './components/CalculationDisplay';
import GameUI from './components/GameUI';

const App: React.FC = () => {
  const [dimensions, setDimensions] = useState<Dimensions>({ length: 5, width: 5, height: 5 });
  const [isUnfolded, setIsUnfolded] = useState(false);
  
  // Game State
  const [mode, setMode] = useState<GameMode>(GameMode.Explore);
  const [score, setScore] = useState(0);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const { volume, surfaceArea } = useMemo(() => {
    const { length, width, height } = dimensions;
    const vol = length * width * height;
    const sa = 2 * (length * width + length * height + width * height);
    return { volume: vol, surfaceArea: sa };
  }, [dimensions]);

  const generateNewChallenge = useCallback(() => {
    const type = Math.random() > 0.5 ? ChallengeType.Volume : ChallengeType.SurfaceArea;
    let targetValue = 0;
    
    // Generate reasonable random dimensions to calculate a target value
    const l = Math.floor(Math.random() * 10) + 2;
    const w = Math.floor(Math.random() * 10) + 2;
    const h = Math.floor(Math.random() * 10) + 2;

    if (type === ChallengeType.Volume) {
        targetValue = l * w * h;
    } else {
        targetValue = 2 * (l*w + l*h + w*h);
    }
    
    setChallenge({ type, targetValue });
    setFeedback('');
    setIsCorrect(null);
  }, []);

  useEffect(() => {
    if (mode === GameMode.Challenge && !challenge) {
      generateNewChallenge();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, challenge]);

  useEffect(() => {
    if (mode === GameMode.Challenge && challenge) {
      const currentValue = challenge.type === ChallengeType.Volume ? volume : surfaceArea;
      if (currentValue === challenge.targetValue) {
        setFeedback('You got it! Perfect match!');
        setIsCorrect(true);
        setScore(s => s + 10);
        setTimeout(() => generateNewChallenge(), 2000);
      } else if (Math.abs(currentValue - challenge.targetValue) < 10) {
        setFeedback(currentValue > challenge.targetValue ? 'A little too high...' : 'So close, a bit more!');
        setIsCorrect(false);
      } else {
        setFeedback(currentValue > challenge.targetValue ? 'Too high!' : 'Too low!');
        setIsCorrect(false);
      }
    }
  }, [dimensions, challenge, mode, volume, surfaceArea, generateNewChallenge]);
  
  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">Shape Shifter</h1>
          <p className="mt-2 text-lg text-slate-600">Your Gamified 3D Geometry Playground</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl shadow-inner border border-slate-200/50 flex items-center justify-center">
             <ShapeVisualizer dimensions={dimensions} isUnfolded={isUnfolded} isCorrect={mode === GameMode.Challenge ? isCorrect : null}/>
          </div>
          
          <div className="space-y-8">
            <GameUI 
              mode={mode}
              setMode={setMode}
              score={score}
              challenge={challenge}
              onNewChallenge={generateNewChallenge}
              feedback={feedback}
              isCorrect={isCorrect}
            />
            <ControlPanel
              dimensions={dimensions}
              onDimensionsChange={setDimensions}
              isUnfolded={isUnfolded}
              onToggleUnfold={() => setIsUnfolded(prev => !prev)}
              disabled={isCorrect === true}
            />
            <CalculationDisplay
              dimensions={dimensions}
              volume={volume}
              surfaceArea={surfaceArea}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
