
import React from 'react';
import { LightbulbIcon } from './icons';

interface GeminiHelperProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
  explanation: string;
  isLoading: boolean;
}

const GeminiHelper: React.FC<GeminiHelperProps> = ({ isOpen, onClose, topic, explanation, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full">
              <LightbulbIcon className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              AI Tutor explains: <span className="capitalize">{topic}</span>
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">&times;</button>
        </header>

        <div className="p-6 overflow-y-auto flex-grow">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center text-slate-500 space-y-3">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="font-semibold">Your AI tutor is thinking...</p>
            </div>
          ) : (
            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
              {explanation}
            </p>
          )}
        </div>
        
        <footer className="p-4 border-t border-slate-200">
          <button 
            onClick={onClose}
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Got it, thanks!
          </button>
        </footer>
      </div>
    </div>
  );
};

export default GeminiHelper;
