
import React from 'react';
import { Dimensions } from '../types';

interface CalculationDisplayProps {
  dimensions: Dimensions;
  volume: number;
  surfaceArea: number;
}

const CalculationDisplay: React.FC<CalculationDisplayProps> = ({ dimensions, volume, surfaceArea }) => {
  const { length, width, height } = dimensions;

  const volumeFormula = `${length} × ${width} × ${height}`;
  const surfaceAreaFormula = `2 × (${length}×${width} + ${length}×${height} + ${width}×${height})`;

  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200 space-y-6">
        <h2 className="text-xl font-bold text-slate-700 text-center">Calculations</h2>
        <div className="space-y-4">
            <CalculationCard 
                title="Volume"
                formula={volumeFormula}
                result={volume}
                units="cubic units"
                bgColor="bg-green-100"
                textColor="text-green-800"
            />
            <CalculationCard 
                title="Surface Area"
                formula={surfaceAreaFormula}
                result={surfaceArea}
                units="square units"
                bgColor="bg-purple-100"
                textColor="text-purple-800"
            />
        </div>
    </div>
  );
};

interface CardProps {
    title: string;
    formula: string;
    result: number;
    units: string;
    bgColor: string;
    textColor: string;
}

const CalculationCard: React.FC<CardProps> = ({ title, formula, result, units, bgColor, textColor }) => (
    <div className={`${bgColor} ${textColor} p-4 rounded-lg`}>
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <p className="text-sm opacity-90 truncate" title={formula}>{formula}</p>
        <p className="text-3xl font-extrabold mt-2">{result.toLocaleString()}</p>
        <p className="text-sm font-medium opacity-90">{units}</p>
    </div>
);

export default CalculationDisplay;
