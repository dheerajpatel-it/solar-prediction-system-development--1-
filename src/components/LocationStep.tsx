import React, { useState, useCallback, useRef } from 'react';
import { LocationData, GeocodingResult } from '../types';
import { searchCity } from '../utils/weatherApi';

interface LocationStepProps {
  data: LocationData;
  onChange: (data: LocationData) => void;
  onNext: () => void;
}

const LocationStep: React.FC<LocationStepProps> = ({ data, onChange, onNext }) => {
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [inputMode, setInputMode] = useState<'city' | 'coords'>('city');
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleCitySearch = useCallback(
    (query: string) => {
      onChange({ ...data, city: query });
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (query.length < 2) {
        setSearchResults([]);
        return;
      }
      debounceRef.current = setTimeout(async () => {
        setSearching(true);
        const results = await searchCity(query);
        setSearchResults(results);
        setSearching(false);
      }, 300);
    },
    [data, onChange]
  );

  const selectCity = (result: GeocodingResult) => {
    onChange({
      ...data,
      city: `${result.name}${result.admin1 ? `, ${result.admin1}` : ''}, ${result.country}`,
      latitude: result.latitude,
      longitude: result.longitude,
    });
    setSearchResults([]);
  };

  const isValid =
    data.latitude !== null &&
    data.longitude !== null &&
    data.latitude >= -90 &&
    data.latitude <= 90 &&
    data.longitude >= -180 &&
    data.longitude <= 180;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">📍 Location Details</h2>
        <p className="text-slate-400">
          Enter your location to fetch accurate solar radiation and weather data
        </p>
      </div>

      {/* Input Mode Toggle */}
      <div className="flex bg-slate-800 rounded-xl p-1 max-w-xs mx-auto">
        <button
          onClick={() => setInputMode('city')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            inputMode === 'city'
              ? 'bg-amber-500 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          🏙️ City Search
        </button>
        <button
          onClick={() => setInputMode('coords')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            inputMode === 'coords'
              ? 'bg-amber-500 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          🌐 Coordinates
        </button>
      </div>

      {inputMode === 'city' ? (
        <div className="relative">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            City / Address
          </label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => handleCitySearch(e.target.value)}
            placeholder="Search for a city (e.g., Mumbai, Delhi, Chennai)..."
            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
          />
          {searching && (
            <div className="absolute right-4 top-11">
              <div className="animate-spin w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full" />
            </div>
          )}
          {searchResults.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl overflow-hidden">
              {searchResults.map((result, i) => (
                <button
                  key={i}
                  onClick={() => selectCity(result)}
                  className="w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors border-b border-slate-700 last:border-0"
                >
                  <div className="text-white font-medium">{result.name}</div>
                  <div className="text-slate-400 text-sm">
                    {result.admin1 && `${result.admin1}, `}{result.country} •{' '}
                    {result.latitude.toFixed(2)}°, {result.longitude.toFixed(2)}°
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Latitude
            </label>
            <input
              type="number"
              value={data.latitude ?? ''}
              onChange={(e) =>
                onChange({
                  ...data,
                  latitude: e.target.value ? parseFloat(e.target.value) : null,
                })
              }
              placeholder="-90 to 90"
              step="0.01"
              min="-90"
              max="90"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Longitude
            </label>
            <input
              type="number"
              value={data.longitude ?? ''}
              onChange={(e) =>
                onChange({
                  ...data,
                  longitude: e.target.value ? parseFloat(e.target.value) : null,
                })
              }
              placeholder="-180 to 180"
              step="0.01"
              min="-180"
              max="180"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Coordinates display */}
      {data.latitude !== null && data.longitude !== null && (
        <div className="bg-slate-800/50 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3">
          <span className="text-2xl">📌</span>
          <div>
            <div className="text-emerald-400 font-medium text-sm">Location Set</div>
            <div className="text-white">
              {data.latitude.toFixed(4)}° N, {data.longitude.toFixed(4)}° E
            </div>
          </div>
        </div>
      )}

      {/* Region Type */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Region Type
        </label>
        <div className="grid grid-cols-2 gap-4">
          {(['urban', 'rural'] as const).map((type) => (
            <button
              key={type}
              onClick={() => onChange({ ...data, regionType: type })}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                data.regionType === type
                  ? 'border-amber-500 bg-amber-500/10 text-white'
                  : 'border-slate-600 bg-slate-800 text-slate-400 hover:border-slate-500'
              }`}
            >
              <div className="text-3xl mb-2">{type === 'urban' ? '🏙️' : '🌾'}</div>
              <div className="font-medium capitalize">{type}</div>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!isValid}
        className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none hover:scale-[1.02] active:scale-[0.98]"
      >
        Continue to Building Details →
      </button>
    </div>
  );
};

export default LocationStep;
