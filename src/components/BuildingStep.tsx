import React from 'react';
import { BuildingData } from '../types';

interface BuildingStepProps {
  data: BuildingData;
  onChange: (data: BuildingData) => void;
  onNext: () => void;
  onBack: () => void;
}

const BuildingStep: React.FC<BuildingStepProps> = ({ data, onChange, onNext, onBack }) => {
  const isValid = data.rooftopArea >= 10;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">🏠 Building Attributes</h2>
        <p className="text-slate-400">
          Provide details about your building's rooftop for accurate capacity estimation
        </p>
      </div>

      {/* Rooftop Area */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Rooftop Area (m²) <span className="text-red-400">*</span>
        </label>
        <input
          type="number"
          value={data.rooftopArea || ''}
          onChange={(e) =>
            onChange({ ...data, rooftopArea: parseFloat(e.target.value) || 0 })
          }
          placeholder="e.g., 100"
          min="10"
          className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        <p className="mt-1 text-xs text-slate-500">Minimum 10 m² required for solar installation</p>
      </div>

      {/* Roof Type */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Roof Type
        </label>
        <div className="grid grid-cols-2 gap-4">
          {([
            { type: 'flat' as const, icon: '▬', desc: 'Terrace or flat concrete roof' },
            { type: 'sloped' as const, icon: '⛰️', desc: 'Pitched, tiled, or angled roof' },
          ]).map(({ type, icon, desc }) => (
            <button
              key={type}
              onClick={() => onChange({ ...data, roofType: type })}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                data.roofType === type
                  ? 'border-amber-500 bg-amber-500/10 text-white'
                  : 'border-slate-600 bg-slate-800 text-slate-400 hover:border-slate-500'
              }`}
            >
              <div className="text-2xl mb-2">{icon}</div>
              <div className="font-medium capitalize">{type}</div>
              <div className="text-xs mt-1 opacity-70">{desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Orientation */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Roof Orientation (Panel Direction)
        </label>
        <div className="grid grid-cols-4 gap-3">
          {([
            { dir: 'north' as const, icon: '⬆️' },
            { dir: 'south' as const, icon: '⬇️' },
            { dir: 'east' as const, icon: '➡️' },
            { dir: 'west' as const, icon: '⬅️' },
          ]).map(({ dir, icon }) => (
            <button
              key={dir}
              onClick={() => onChange({ ...data, orientation: dir })}
              className={`p-3 rounded-xl border-2 transition-all text-center ${
                data.orientation === dir
                  ? 'border-amber-500 bg-amber-500/10 text-white'
                  : 'border-slate-600 bg-slate-800 text-slate-400 hover:border-slate-500'
              }`}
            >
              <div className="text-xl">{icon}</div>
              <div className="text-xs font-medium capitalize mt-1">{dir}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Tilt Angle */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Tilt Angle: {data.tiltAngle}°
        </label>
        <input
          type="range"
          min="0"
          max="60"
          value={data.tiltAngle}
          onChange={(e) =>
            onChange({ ...data, tiltAngle: parseInt(e.target.value) })
          }
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>0° (Flat)</span>
          <span>30° (Moderate)</span>
          <span>60° (Steep)</span>
        </div>
      </div>

      {/* Number of Floors */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Number of Floors (optional)
        </label>
        <input
          type="number"
          value={data.floors || ''}
          onChange={(e) =>
            onChange({ ...data, floors: parseInt(e.target.value) || 1 })
          }
          placeholder="e.g., 2"
          min="1"
          max="50"
          className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-4 bg-slate-700 text-white font-bold rounded-xl hover:bg-slate-600 transition-all"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none hover:scale-[1.02] active:scale-[0.98]"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default BuildingStep;
