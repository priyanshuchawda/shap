
import React from 'react';
import { Dimensions } from '../types';

interface ControlPanelProps {
  dimensions: Dimensions;
  onDimensionsChange: (newDimensions: Dimensions) => void;
  isUnfolded: boolean;
  onToggleUnfold: () => void;
  disabled?: boolean;
}

const DimensionSlider: React.FC<{
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: keyof Dimensions;
  disabled?: boolean;
}> = ({ label, value, onChange, id, disabled }) => (
  <div className="flex flex-col space-y-2">
    <div className="flex justify-between items-center">
      <label htmlFor={id} className="font-medium text-slate-600">
        {label}
      </label>
      <span className="text-lg font-bold text-blue-600 bg-blue-100 rounded-md px-3 py-1">
        {value}
      </span>
    </div>
    <input
      type="range"
      id={id}
      name={id}
      min="1"
      max="20"
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500 disabled:accent-slate-400 disabled:cursor-not-allowed"
    />
  </div>
);

const ControlPanel: React.FC<ControlPanelProps> = ({ dimensions, onDimensionsChange, isUnfolded, onToggleUnfold, disabled = false }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onDimensionsChange({
      ...dimensions,
      [name]: Number(value),
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200 space-y-6">
      <h2 className="text-xl font-bold text-slate-700 text-center">Shape Controls</h2>
      <DimensionSlider label="Length" value={dimensions.length} onChange={handleChange} id="length" disabled={disabled} />
      <DimensionSlider label="Width" value={dimensions.width} onChange={handleChange} id="width" disabled={disabled} />
      <DimensionSlider label="Height" value={dimensions.height} onChange={handleChange} id="height" disabled={disabled} />
       <div className="pt-4 border-t border-slate-200">
        <button
          onClick={onToggleUnfold}
          className="w-full bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isUnfolded ? 'Fold Shape' : 'Visualize Surface Area'}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
