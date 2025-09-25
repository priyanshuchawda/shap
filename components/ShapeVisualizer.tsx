
import React from 'react';
import { Dimensions } from '../types';

interface ShapeVisualizerProps {
  dimensions: Dimensions;
  isUnfolded: boolean;
  isCorrect: boolean | null;
}

const ShapeVisualizer: React.FC<ShapeVisualizerProps> = ({ dimensions, isUnfolded, isCorrect }) => {
  const { length, width, height } = dimensions;
  const maxDim = 20;
  const scale = 12;

  const scaledL = (length / maxDim) * scale;
  const scaledW = (width / maxDim) * scale;
  const scaledH = (height / maxDim) * scale;

  const transitionClass = 'transition-all duration-700 ease-in-out';

  const baseFaceStyle: React.CSSProperties = {
    position: 'absolute',
    border: `1px solid ${isCorrect === true ? 'rgba(34, 197, 94, 0.7)' : isCorrect === false ? 'rgba(239, 68, 68, 0.7)' : 'rgba(100, 116, 139, 0.5)'}`,
  };

  const getFaceStyle = (face: 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom'): React.CSSProperties => {
    const commonStyles: React.CSSProperties = {
      ...baseFaceStyle,
      transformOrigin: 'center center',
      background: 'rgba(59, 130, 246, 0.7)',
    };
    
    if (isUnfolded) {
      switch (face) {
        case 'front': return { ...commonStyles, width: `${scaledL}rem`, height: `${scaledH}rem`, transform: `translateY(${scaledW / 2}rem)` };
        case 'back': return { ...commonStyles, width: `${scaledL}rem`, height: `${scaledH}rem`, transform: `translateY(-${scaledW / 2 + scaledH}rem)` };
        case 'top': return { ...commonStyles, width: `${scaledL}rem`, height: `${scaledW}rem`, background: 'rgba(96, 165, 250, 0.7)', transform: `translateY(-${scaledW / 2}rem) rotateX(90deg)`};
        case 'bottom': return { ...commonStyles, width: `${scaledL}rem`, height: `${scaledW}rem`, background: 'rgba(37, 99, 235, 0.7)', transform: `translateY(${scaledW / 2 + scaledH}rem) rotateX(-90deg)`};
        case 'left': return { ...commonStyles, width: `${scaledW}rem`, height: `${scaledH}rem`, background: 'rgba(147, 197, 253, 0.7)', transform: `translateX(-${scaledW}rem) translateY(${scaledW / 2}rem)`};
        case 'right': return { ...commonStyles, width: `${scaledW}rem`, height: `${scaledH}rem`, background: 'rgba(147, 197, 253, 0.7)', transform: `translateX(${scaledL}rem) translateY(${scaledW / 2}rem)`};
        default: return {};
      }
    }

    switch (face) {
      case 'front': return { ...commonStyles, width: `${scaledL}rem`, height: `${scaledH}rem`, transform: `translateZ(${scaledW / 2}rem)` };
      case 'back': return { ...commonStyles, width: `${scaledL}rem`, height: `${scaledH}rem`, transform: `rotateY(180deg) translateZ(${scaledW / 2}rem)` };
      case 'left': return { ...commonStyles, width: `${scaledW}rem`, height: `${scaledH}rem`, background: 'rgba(147, 197, 253, 0.7)', transform: `rotateY(-90deg) translateZ(${scaledL / 2}rem)` };
      case 'right': return { ...commonStyles, width: `${scaledW}rem`, height: `${scaledH}rem`, background: 'rgba(147, 197, 253, 0.7)', transform: `rotateY(90deg) translateZ(${scaledL / 2}rem)` };
      case 'top': return { ...commonStyles, width: `${scaledL}rem`, height: `${scaledW}rem`, background: 'rgba(96, 165, 250, 0.7)', transform: `rotateX(90deg) translateZ(${scaledH / 2}rem)` };
      case 'bottom': return { ...commonStyles, width: `${scaledL}rem`, height: `${scaledW}rem`, background: 'rgba(37, 99, 235, 0.7)', transform: `rotateX(-90deg) translateZ(${scaledH / 2}rem)` };
      default: return {};
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center min-h-[30rem] p-4">
      <div
        className={`${transitionClass}`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isUnfolded ? 'translateY(5rem) rotateX(-20deg) rotateY(25deg)' : 'rotateX(-20deg) rotateY(35deg)',
          perspective: '1000px',
        }}
      >
        <div style={getFaceStyle('front')} className={transitionClass}></div>
        <div style={getFaceStyle('back')} className={transitionClass}></div>
        <div style={getFaceStyle('left')} className={transitionClass}></div>
        <div style={getFaceStyle('right')} className={transitionClass}></div>
        <div style={getFaceStyle('top')} className={transitionClass}></div>
        <div style={getFaceStyle('bottom')} className={transitionClass}></div>
      </div>
    </div>
  );
};

export default ShapeVisualizer;
