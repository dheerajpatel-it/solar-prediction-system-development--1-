import React from 'react';
import { EnvironmentData } from '../types';

interface EnvironmentStepProps {
  data: EnvironmentData;
  onChange: (data: EnvironmentData) => void;
  onNext: () => void;
  onBack: () => void;
}

const EnvironmentStep: React.FC<EnvironmentStepProps> = ({ data, onChange, onNext, onBack }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">🌳 Environmental Factors</h2>
        <p className="text-slate-400">
          Tell us about shading and obstacles around your rooftop
        </p>
      </div>

      {/* Shadow Percentage */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Shadow Coverage: <span className="text-amber-400 font-bold">{data.shadowPercentage}%</span>
        </label>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="80"
            value={data.shadowPercentage}
            onChange={(e) =>
              onChange({ ...data, shadowPercentage: parseInt(e.target.value) })
            }
            className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>☀️ No Shadow</span>
            <span>🌤️ Partial</span>
            <span>🌥️ Heavy</span>
          </div>
        </div>
        <div
          className={`mt-3 p-3 rounded-lg text-sm ${
            data.shadowPercentage <= 20
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              : data.shadowPercentage <= 50
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
              : 'bg-red-500/10 text-red-400 border border-red-500/30'
          }`}
        >
          {data.shadowPercentage <= 20
            ? '✅ Excellent! Minimal shading ensures high energy output.'
            : data.shadowPercentage <= 50
            ? '⚠️ Moderate shading. Consider micro-inverters to mitigate losses.'
            : '❌ Heavy shading significantly reduces solar potential. Consider alternate placement.'}
        </div>
      </div>

      {/* Nearby Obstacles */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Nearby Obstacles (Buildings, Trees, Towers)
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onChange({ ...data, nearbyObstacles: false, obstaclesCoverage: 0 })}
            className={`p-4 rounded-xl border-2 transition-all text-center ${
              !data.nearbyObstacles
                ? 'border-emerald-500 bg-emerald-500/10 text-white'
                : 'border-slate-600 bg-slate-800 text-slate-400 hover:border-slate-500'
            }`}
          >
            <div className="text-3xl mb-2">✅</div>
            <div className="font-medium">No Obstacles</div>
            <div className="text-xs mt-1 opacity-70">Clear sky view</div>
          </button>
          <button
            onClick={() => onChange({ ...data, nearbyObstacles: true, obstaclesCoverage: data.obstaclesCoverage || 15 })}
            className={`p-4 rounded-xl border-2 transition-all text-center ${
              data.nearbyObstacles
                ? 'border-amber-500 bg-amber-500/10 text-white'
                : 'border-slate-600 bg-slate-800 text-slate-400 hover:border-slate-500'
            }`}
          >
            <div className="text-3xl mb-2">🏗️</div>
            <div className="font-medium">Yes, Obstacles</div>
            <div className="text-xs mt-1 opacity-70">Partial blockage</div>
          </button>
        </div>
      </div>

      {/* Obstacle Coverage */}
      {data.nearbyObstacles && (
        <div className="animate-fadeIn">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Obstacle Coverage: <span className="text-amber-400 font-bold">{data.obstaclesCoverage}%</span>
          </label>
          <input
            type="range"
            min="5"
            max="60"
            value={data.obstaclesCoverage}
            onChange={(e) =>
              onChange({ ...data, obstaclesCoverage: parseInt(e.target.value) })
            }
            className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>5% (Minor)</span>
            <span>30% (Moderate)</span>
            <span>60% (Major)</span>
          </div>
        </div>
      )}

      {/* Visual Summary */}
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h3 className="text-sm font-medium text-slate-400 mb-3">Effective Area Summary</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.max(
                    100 -
                      data.shadowPercentage -
                      (data.nearbyObstacles ? data.obstaclesCoverage : 0),
                    5
                  )}%`,
                }}
              />
            </div>
          </div>
          <span className="text-white font-bold min-w-[4rem] text-right">
            {Math.max(
              100 -
                data.shadowPercentage -
                (data.nearbyObstacles ? data.obstaclesCoverage : 0),
              0
            )}
            %
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Usable rooftop area after accounting for shadows and obstacles
        </p>
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
          className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default EnvironmentStep;
