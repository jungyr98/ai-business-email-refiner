
import React from 'react';
import { ToneType, ToneOption } from '../types';
import { TONE_OPTIONS } from '../constants';

interface ToneSelectorProps {
  selectedTone: ToneType;
  onSelect: (tone: ToneType) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
      {TONE_OPTIONS.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className={`relative flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all duration-200 ${
            selectedTone === option.id
              ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between w-full mb-1">
            <span className="text-xl">{option.icon}</span>
            {selectedTone === option.id && (
              <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <span className={`font-semibold text-sm ${selectedTone === option.id ? 'text-indigo-900' : 'text-slate-900'}`}>
            {option.label}
          </span>
          <span className="text-xs text-slate-500 mt-1 line-clamp-1">{option.description}</span>
        </button>
      ))}
    </div>
  );
};

export default ToneSelector;
