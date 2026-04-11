import { useState, useCallback } from 'react';
import { FormData, WeatherData, SolarResults } from './types';
import { fetchWeatherData } from './utils/weatherApi';
import { calculateSolarPotential } from './utils/calculations';
import StepIndicator from './components/StepIndicator';
import LocationStep from './components/LocationStep';
import BuildingStep from './components/BuildingStep';
import EnvironmentStep from './components/EnvironmentStep';
import EnergyProfileStep from './components/EnergyProfileStep';
import ResultsDashboard from './components/ResultsDashboard';
import ProjectReport from './components/ProjectReport';

const STEPS = [
  { label: 'Location', icon: '📍' },
  { label: 'Building', icon: '🏠' },
  { label: 'Environment', icon: '🌳' },
  { label: 'Energy', icon: '⚡' },
  { label: 'Results', icon: '📊' },
];

const initialFormData: FormData = {
  location: {
    city: '',
    latitude: null,
    longitude: null,
    regionType: 'urban',
  },
  building: {
    rooftopArea: 100,
    roofType: 'flat',
    orientation: 'south',
    tiltAngle: 15,
    floors: 2,
  },
  environment: {
    shadowPercentage: 10,
    nearbyObstacles: false,
    obstaclesCoverage: 0,
  },
  energyProfile: {
    monthlyConsumption: 300,
    electricityCostPerUnit: 8,
  },
};

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [results, setResults] = useState<SolarResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);

  const handleAnalyze = useCallback(async () => {
    if (!formData.location.latitude || !formData.location.longitude) return;

    setLoading(true);
    setError(null);

    try {
      const weatherData = await fetchWeatherData(
        formData.location.latitude,
        formData.location.longitude
      );
      setWeather(weatherData);

      const solarResults = calculateSolarPotential(formData, weatherData);
      setResults(solarResults);
      setCurrentStep(4);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [formData]);

  const handleReset = () => {
    setCurrentStep(0);
    setFormData(initialFormData);
    setWeather(null);
    setResults(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Project Report Modal */}
      {showReport && <ProjectReport onClose={() => setShowReport(false)} />}

      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-amber-500/25">
                ☀️
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  SolarAI
                </h1>
                <p className="text-[10px] text-slate-500 -mt-0.5">
                  Rooftop Energy Prediction
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowReport(true)}
                className="flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 hover:text-amber-300 text-xs font-semibold px-3 py-2 rounded-lg transition-all"
              >
                <span>📄</span>
                <span className="hidden sm:inline">Project Report</span>
              </button>
              {currentStep === 4 && (
                <button
                  onClick={handleReset}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  🔄 New Analysis
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section (only on first step) */}
        {currentStep === 0 && (
          <section className="max-w-5xl mx-auto px-4 pt-12 pb-8 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 text-sm text-amber-400 mb-6">
              <span className="animate-pulse">🔬</span> AI-Powered Solar Analysis
            </div>
            <h2 className="text-3xl sm:text-5xl font-black mb-4 leading-tight">
              Unlock Your Rooftop's
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Solar Potential
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-8">
              Get instant AI predictions for solar installation feasibility, energy generation,
              financial returns, and smart recommendations — all powered by real-time weather data.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
              {['☀️ Energy Prediction', '💰 Financial Analysis', '🌍 Weather Integration', '🎯 Smart Recommendations'].map((feat) => (
                <div
                  key={feat}
                  className="bg-slate-800/60 border border-slate-700 rounded-full px-4 py-2"
                >
                  {feat}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Main Content */}
        <main className="max-w-3xl mx-auto px-4 py-8">
          {/* Step Indicator */}
          {currentStep < 4 && (
            <StepIndicator steps={STEPS} currentStep={currentStep} />
          )}

          {/* Error */}
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
              ❌ {error}
            </div>
          )}

          {/* Step Content */}
          <div className="bg-slate-850 rounded-2xl">
            {currentStep === 0 && (
              <LocationStep
                data={formData.location}
                onChange={(location) =>
                  setFormData((prev) => ({ ...prev, location }))
                }
                onNext={() => setCurrentStep(1)}
              />
            )}
            {currentStep === 1 && (
              <BuildingStep
                data={formData.building}
                onChange={(building) =>
                  setFormData((prev) => ({ ...prev, building }))
                }
                onNext={() => setCurrentStep(2)}
                onBack={() => setCurrentStep(0)}
              />
            )}
            {currentStep === 2 && (
              <EnvironmentStep
                data={formData.environment}
                onChange={(environment) =>
                  setFormData((prev) => ({ ...prev, environment }))
                }
                onNext={() => setCurrentStep(3)}
                onBack={() => setCurrentStep(1)}
              />
            )}
            {currentStep === 3 && (
              <EnergyProfileStep
                data={formData.energyProfile}
                onChange={(energyProfile) =>
                  setFormData((prev) => ({ ...prev, energyProfile }))
                }
                onNext={handleAnalyze}
                onBack={() => setCurrentStep(2)}
                loading={loading}
              />
            )}
            {currentStep === 4 && results && weather && (
              <ResultsDashboard
                results={results}
                weather={weather}
                formData={formData}
                onReset={handleReset}
              />
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800 py-6 mt-12">
          <div className="max-w-5xl mx-auto px-4 text-center text-xs text-slate-600">
            <p>
              SolarAI uses Open-Meteo weather data for solar radiation estimates.
              Results are indicative — consult a professional installer for precise assessment.
            </p>
            <p className="mt-2">
              ☀️ Built with React, Tailwind CSS & Recharts • Weather data by Open-Meteo
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
