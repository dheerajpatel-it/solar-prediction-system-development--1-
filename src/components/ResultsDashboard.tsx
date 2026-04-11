import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend,
} from 'recharts';
import { SolarResults, WeatherData, FormData } from '../types';

interface ResultsDashboardProps {
  results: SolarResults;
  weather: WeatherData;
  formData: FormData;
  onReset: () => void;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  results,
  weather,
  formData,
  onReset,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'energy' | 'financial' | 'recommendations'>('overview');

  const monthlyData = MONTHS.map((month, i) => ({
    month,
    generation: results.monthlyGeneration[i],
    sunlight: Math.round(weather.monthlySunlightHours[i] * 10) / 10,
    temperature: Math.round(weather.monthlyTemperature[i]),
    cloudCover: Math.round(weather.monthlyCloudCover[i]),
  }));

  const energyBreakdown = [
    { name: 'Solar Generated', value: results.monthlyEnergy, color: '#10b981' },
    ...(formData.energyProfile.monthlyConsumption > results.monthlyEnergy
      ? [
          {
            name: 'Grid Needed',
            value: formData.energyProfile.monthlyConsumption - results.monthlyEnergy,
            color: '#ef4444',
          },
        ]
      : []),
    ...(results.monthlyEnergy > formData.energyProfile.monthlyConsumption &&
    formData.energyProfile.monthlyConsumption > 0
      ? [
          {
            name: 'Surplus (Net Metering)',
            value: results.monthlyEnergy - formData.energyProfile.monthlyConsumption,
            color: '#3b82f6',
          },
        ]
      : []),
  ];

  const efficiencyData = [
    {
      name: 'Efficiency',
      value: results.efficiencyScore,
      fill: results.efficiencyScore >= 65 ? '#10b981' : results.efficiencyScore >= 45 ? '#f59e0b' : '#ef4444',
    },
  ];

  const ratingColor =
    results.suitabilityRating === 'High'
      ? 'text-emerald-400'
      : results.suitabilityRating === 'Medium'
      ? 'text-amber-400'
      : 'text-red-400';

  const ratingBg =
    results.suitabilityRating === 'High'
      ? 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30'
      : results.suitabilityRating === 'Medium'
      ? 'from-amber-500/20 to-amber-500/5 border-amber-500/30'
      : 'from-red-500/20 to-red-500/5 border-red-500/30';

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: '📊' },
    { id: 'energy' as const, label: 'Energy', icon: '⚡' },
    { id: 'financial' as const, label: 'Financial', icon: '💰' },
    { id: 'recommendations' as const, label: 'Advice', icon: '💡' },
  ];

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Header */}
      <div className={`bg-gradient-to-br ${ratingBg} border rounded-2xl p-6 text-center`}>
        <div className="text-5xl mb-3">
          {results.feasibility ? '☀️' : '🌥️'}
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">
          {results.feasibility ? 'Solar Installation Recommended!' : 'Limited Solar Potential'}
        </h2>
        <p className="text-slate-300 text-sm mb-4">{results.feasibilityReason}</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-slate-400">Suitability:</span>
          <span className={`text-lg font-bold ${ratingColor}`}>
            {results.suitabilityRating}
          </span>
          <span className="text-2xl">
            {results.suitabilityRating === 'High' ? '🌟' : results.suitabilityRating === 'Medium' ? '⭐' : '💫'}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-800 rounded-xl p-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-amber-500 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="mr-1">{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              icon="⚡"
              label="Max Capacity"
              value={`${results.maxCapacity} kW`}
              sub="Installable"
              color="amber"
            />
            <MetricCard
              icon="☀️"
              label="Daily Energy"
              value={`${results.dailyEnergy} kWh`}
              sub="Average output"
              color="yellow"
            />
            <MetricCard
              icon="📅"
              label="Annual Energy"
              value={`${results.annualEnergy.toLocaleString()} kWh`}
              sub="Yearly generation"
              color="emerald"
            />
            <MetricCard
              icon="🌿"
              label="CO₂ Offset"
              value={`${results.co2Offset.toLocaleString()} kg`}
              sub="Per year"
              color="green"
            />
          </div>

          {/* Efficiency Gauge + Area Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <h3 className="text-sm font-medium text-slate-400 mb-4">System Efficiency</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="90%"
                    startAngle={180}
                    endAngle={0}
                    data={efficiencyData}
                  >
                    <RadialBar
                      dataKey="value"
                      cornerRadius={10}
                      background={{ fill: '#1e293b' }}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center -mt-16">
                <div className="text-3xl font-bold text-white">
                  {results.efficiencyScore}%
                </div>
                <div className="text-xs text-slate-500">Overall Efficiency</div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <h3 className="text-sm font-medium text-slate-400 mb-4">Area Analysis</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Rooftop</span>
                  <span className="text-white font-bold">{formData.building.rooftopArea} m²</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Shadow Loss</span>
                  <span className="text-red-400 font-bold">-{formData.environment.shadowPercentage}%</span>
                </div>
                {formData.environment.nearbyObstacles && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Obstacle Loss</span>
                    <span className="text-red-400 font-bold">-{formData.environment.obstaclesCoverage}%</span>
                  </div>
                )}
                <div className="border-t border-slate-600 pt-3 flex justify-between items-center">
                  <span className="text-emerald-400 font-medium">Effective Area</span>
                  <span className="text-emerald-400 font-bold text-xl">{results.effectiveArea} m²</span>
                </div>
                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full transition-all"
                    style={{ width: `${(results.effectiveArea / formData.building.rooftopArea) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-700">
                <h4 className="text-sm text-slate-400 mb-2">Weather Summary</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span>☀️</span>
                    <span className="text-slate-400">Sunlight:</span>
                    <span className="text-white font-medium">{weather.avgSunlightHours.toFixed(1)}h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>☁️</span>
                    <span className="text-slate-400">Clouds:</span>
                    <span className="text-white font-medium">{weather.avgCloudCover.toFixed(0)}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🌡️</span>
                    <span className="text-slate-400">Temp:</span>
                    <span className="text-white font-medium">{weather.avgTemperature.toFixed(1)}°C</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🌧️</span>
                    <span className="text-slate-400">Rain:</span>
                    <span className="text-white font-medium">{weather.avgRainfall.toFixed(1)}mm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Energy Tab */}
      {activeTab === 'energy' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Monthly Generation Chart */}
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
            <h3 className="text-sm font-medium text-slate-400 mb-4">
              📊 Monthly Energy Generation (kWh)
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '12px',
                      color: '#fff',
                    }}
                  />
                  <Bar
                    dataKey="generation"
                    fill="#f59e0b"
                    radius={[6, 6, 0, 0]}
                    name="Generation (kWh)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sunlight & Temperature Chart */}
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
            <h3 className="text-sm font-medium text-slate-400 mb-4">
              🌤️ Monthly Weather Patterns
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '12px',
                      color: '#fff',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sunlight"
                    stroke="#eab308"
                    fill="#eab30830"
                    name="Sunlight (hrs)"
                  />
                  <Area
                    type="monotone"
                    dataKey="temperature"
                    stroke="#ef4444"
                    fill="#ef444430"
                    name="Temperature (°C)"
                  />
                  <Area
                    type="monotone"
                    dataKey="cloudCover"
                    stroke="#64748b"
                    fill="#64748b30"
                    name="Cloud Cover (%)"
                  />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Energy Balance */}
          {formData.energyProfile.monthlyConsumption > 0 && (
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <h3 className="text-sm font-medium text-slate-400 mb-4">
                ⚖️ Energy Balance
              </h3>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="h-48 w-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={energyBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {energyBreakdown.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: '1px solid #334155',
                          borderRadius: '12px',
                          color: '#fff',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-3">
                  {energyBreakdown.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-slate-400 text-sm flex-1">{item.name}</span>
                      <span className="text-white font-bold">{item.value.toLocaleString()} kWh</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-slate-700">
                    <div className="text-sm text-slate-400">
                      Solar covers{' '}
                      <span className="text-emerald-400 font-bold">
                        {Math.min(
                          Math.round(
                            (results.monthlyEnergy / formData.energyProfile.monthlyConsumption) * 100
                          ),
                          100
                        )}
                        %
                      </span>{' '}
                      of your monthly consumption
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Energy Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 text-center">
              <div className="text-3xl mb-1">🌅</div>
              <div className="text-xl font-bold text-amber-400">{results.dailyEnergy}</div>
              <div className="text-xs text-slate-500">kWh/Day</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 text-center">
              <div className="text-3xl mb-1">📅</div>
              <div className="text-xl font-bold text-amber-400">{results.monthlyEnergy.toLocaleString()}</div>
              <div className="text-xs text-slate-500">kWh/Month</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 text-center">
              <div className="text-3xl mb-1">📆</div>
              <div className="text-xl font-bold text-amber-400">{results.annualEnergy.toLocaleString()}</div>
              <div className="text-xs text-slate-500">kWh/Year</div>
            </div>
          </div>
        </div>
      )}

      {/* Financial Tab */}
      {activeTab === 'financial' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Financial Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              icon="🏗️"
              label="Installation Cost"
              value={`₹${results.installationCost.toLocaleString()}`}
              sub={`₹${Math.round(results.installationCost / results.maxCapacity).toLocaleString()}/kW`}
              color="blue"
            />
            <MetricCard
              icon="💰"
              label="Monthly Savings"
              value={`₹${results.monthlySavings.toLocaleString()}`}
              sub="Per month"
              color="emerald"
            />
            <MetricCard
              icon="📈"
              label="Annual Savings"
              value={`₹${results.annualSavings.toLocaleString()}`}
              sub="Per year"
              color="green"
            />
            <MetricCard
              icon="⏱️"
              label="Payback Period"
              value={`${results.paybackPeriod === Infinity ? '∞' : results.paybackPeriod} yrs`}
              sub={results.paybackPeriod <= 6 ? 'Excellent!' : results.paybackPeriod <= 10 ? 'Good' : 'Long'}
              color={results.paybackPeriod <= 6 ? 'emerald' : results.paybackPeriod <= 10 ? 'amber' : 'red'}
            />
          </div>

          {/* ROI Timeline */}
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
            <h3 className="text-sm font-medium text-slate-400 mb-4">
              📈 Return on Investment Over 25 Years
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={Array.from({ length: 26 }, (_, year) => ({
                    year: `Year ${year}`,
                    savings: year * results.annualSavings,
                    cost: results.installationCost,
                    netReturn: year * results.annualSavings - results.installationCost,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="year"
                    stroke="#94a3b8"
                    fontSize={11}
                    interval={4}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '12px',
                      color: '#fff',
                    }}
                    formatter={(value) => `₹${Number(value).toLocaleString()}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="savings"
                    stroke="#10b981"
                    fill="#10b98130"
                    name="Cumulative Savings"
                  />
                  <Area
                    type="monotone"
                    dataKey="cost"
                    stroke="#ef4444"
                    fill="#ef444420"
                    name="Installation Cost"
                    strokeDasharray="5 5"
                  />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {results.paybackPeriod < Infinity && (
              <div className="mt-3 text-center text-sm text-slate-400">
                Break-even at <span className="text-emerald-400 font-bold">Year {Math.ceil(results.paybackPeriod)}</span>
                {' • '}25-year profit:{' '}
                <span className="text-emerald-400 font-bold">
                  ₹{(results.annualSavings * 25 - results.installationCost).toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Subsidy Information */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-5">
            <h3 className="text-white font-bold mb-3">🏛️ Government Subsidies (India)</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <span className="text-emerald-400">✓</span>
                <div>
                  <strong className="text-white">PM Surya Ghar Yojana:</strong> Up to ₹78,000 subsidy
                  for systems up to 3 kW, ₹78,000 + ₹30,000 for 3-10 kW.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400">✓</span>
                <div>
                  <strong className="text-white">Net Metering:</strong> Sell excess electricity
                  back to the grid at applicable rates.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400">✓</span>
                <div>
                  <strong className="text-white">Tax Benefits:</strong> Accelerated depreciation
                  (40%) available for commercial installations.
                </div>
              </div>
              {results.maxCapacity <= 3 && (
                <div className="mt-3 bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-3">
                  <span className="text-emerald-400 font-bold">
                    💡 With subsidy, your effective cost could be as low as ₹
                    {Math.max(results.installationCost - 78000, 0).toLocaleString()}!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Recommendations Tab */}
      {activeTab === 'recommendations' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 mb-6">
            <h3 className="text-white font-bold mb-3">🎯 System Configuration</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-slate-400">Optimal System Size</div>
                <div className="text-xl font-bold text-amber-400">
                  {results.optimalSystemSize} kW
                </div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-slate-400">Best Orientation</div>
                <div className="text-xl font-bold text-amber-400">
                  {results.bestOrientation}-facing
                </div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-slate-400">Optimal Tilt</div>
                <div className="text-xl font-bold text-amber-400">
                  {Math.round(Math.abs(formData.location.latitude ?? 20))}°
                </div>
              </div>
            </div>
          </div>

          {results.recommendations.map((rec, i) => (
            <div
              key={i}
              className={`bg-slate-800 rounded-xl p-5 border transition-all hover:border-slate-500 ${
                rec.priority === 'high'
                  ? 'border-amber-500/50'
                  : rec.priority === 'medium'
                  ? 'border-blue-500/30'
                  : 'border-slate-700'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{rec.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white font-bold">{rec.title}</h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        rec.priority === 'high'
                          ? 'bg-amber-500/20 text-amber-400'
                          : rec.priority === 'medium'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-slate-600/50 text-slate-400'
                      }`}
                    >
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Environmental Impact */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-xl p-5 mt-6">
            <h3 className="text-white font-bold mb-4">🌍 Environmental Impact (25-year lifetime)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl mb-2">🌿</div>
                <div className="text-2xl font-bold text-emerald-400">
                  {(results.co2Offset * 25 / 1000).toFixed(1)} tons
                </div>
                <div className="text-xs text-slate-400">CO₂ Prevented</div>
              </div>
              <div>
                <div className="text-3xl mb-2">🌳</div>
                <div className="text-2xl font-bold text-emerald-400">
                  {Math.round(results.co2Offset * 25 / 21)}
                </div>
                <div className="text-xs text-slate-400">Trees Equivalent</div>
              </div>
              <div>
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-2xl font-bold text-emerald-400">
                  {(results.annualEnergy * 25 / 1000).toFixed(0)} MWh
                </div>
                <div className="text-xs text-slate-400">Clean Energy</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reset Button */}
      <div className="text-center pt-4">
        <button
          onClick={onReset}
          className="px-8 py-3 bg-slate-700 text-white font-medium rounded-xl hover:bg-slate-600 transition-all"
        >
          🔄 Start New Analysis
        </button>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{
  icon: string;
  label: string;
  value: string;
  sub: string;
  color: string;
}> = ({ icon, label, value, sub, color }) => {
  const colorMap: Record<string, string> = {
    amber: 'from-amber-500/20 to-amber-500/5 border-amber-500/30',
    yellow: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30',
    emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30',
    green: 'from-green-500/20 to-green-500/5 border-green-500/30',
    blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/30',
    red: 'from-red-500/20 to-red-500/5 border-red-500/30',
  };

  return (
    <div
      className={`bg-gradient-to-br ${colorMap[color] || colorMap.amber} border rounded-xl p-4`}
    >
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      <div className="text-lg font-bold text-white">{value}</div>
      <div className="text-xs text-slate-500">{sub}</div>
    </div>
  );
};

export default ResultsDashboard;
