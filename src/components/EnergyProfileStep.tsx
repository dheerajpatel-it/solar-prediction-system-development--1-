import React from 'react';
import { EnergyProfile } from '../types';

interface EnergyProfileStepProps {
  data: EnergyProfile;
  onChange: (data: EnergyProfile) => void;
  onNext: () => void;
  onBack: () => void;
  loading: boolean;
}

const EnergyProfileStep: React.FC<EnergyProfileStepProps> = ({
  data,
  onChange,
  onNext,
  onBack,
  loading,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">⚡ Energy Profile</h2>
        <p className="text-slate-400">
          Optional: Enter your electricity usage for personalized savings estimates
        </p>
      </div>

      {/* Monthly Consumption */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Monthly Electricity Consumption (kWh)
        </label>
        <input
          type="number"
          value={data.monthlyConsumption || ''}
          onChange={(e) =>
            onChange({ ...data, monthlyConsumption: parseFloat(e.target.value) || 0 })
          }
          placeholder="e.g., 300"
          min="0"
          className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[150, 300, 500].map((val) => (
            <button
              key={val}
              onClick={() => onChange({ ...data, monthlyConsumption: val })}
              className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                data.monthlyConsumption === val
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
              }`}
            >
              {val} kWh ({val <= 150 ? 'Low' : val <= 300 ? 'Medium' : 'High'})
            </button>
          ))}
        </div>
      </div>

      {/* Electricity Cost */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Electricity Cost per Unit (₹/kWh)
        </label>
        <input
          type="number"
          value={data.electricityCostPerUnit || ''}
          onChange={(e) =>
            onChange({
              ...data,
              electricityCostPerUnit: parseFloat(e.target.value) || 0,
            })
          }
          placeholder="e.g., 8"
          min="0"
          step="0.5"
          className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        <div className="grid grid-cols-4 gap-2 mt-3">
          {[5, 7, 8, 10].map((val) => (
            <button
              key={val}
              onClick={() => onChange({ ...data, electricityCostPerUnit: val })}
              className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                data.electricityCostPerUnit === val
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
              }`}
            >
              ₹{val}/kWh
            </button>
          ))}
        </div>
      </div>

      {/* Quick Summary */}
      {data.monthlyConsumption > 0 && data.electricityCostPerUnit > 0 && (
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 animate-fadeIn">
          <h3 className="text-sm font-medium text-slate-400 mb-3">
            Current Electricity Cost
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold text-red-400">
                ₹{(data.monthlyConsumption * data.electricityCostPerUnit).toLocaleString()}
              </div>
              <div className="text-xs text-slate-500">Monthly Bill</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-400">
                ₹{(data.monthlyConsumption * data.electricityCostPerUnit * 12).toLocaleString()}
              </div>
              <div className="text-xs text-slate-500">Annual Bill</div>
            </div>
          </div>
        </div>
      )}

      {/* Note */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-sm text-blue-300">
        💡 <strong>Tip:</strong> If you don't know your exact consumption, check your last
        electricity bill or enter an estimate. Default rates of ₹8/kWh will be used if left empty.
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
          disabled={loading}
          className="flex-1 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all disabled:opacity-60 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              Analyzing...
            </>
          ) : (
            <>🔬 Generate Solar Analysis</>
          )}
        </button>
      </div>
    </div>
  );
};

export default EnergyProfileStep;
