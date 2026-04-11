import React from 'react';

interface Step {
  label: string;
  icon: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center w-full mb-8 px-4">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center relative">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-500 ${
                index < currentStep
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                  : index === currentStep
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30 scale-110'
                  : 'bg-slate-700 text-slate-400'
              }`}
            >
              {index < currentStep ? '✓' : step.icon}
            </div>
            <span
              className={`mt-2 text-xs font-medium hidden sm:block ${
                index <= currentStep ? 'text-white' : 'text-slate-500'
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-2 sm:mx-4 transition-all duration-500 ${
                index < currentStep ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
