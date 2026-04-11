import { useState } from 'react';

const sections = [
  { id: 'abstract', label: 'Abstract' },
  { id: 'introduction', label: '1. Introduction' },
  { id: 'objectives', label: '2. Objectives' },
  { id: 'architecture', label: '3. System Architecture' },
  { id: 'tech', label: '4. Technology Stack' },
  { id: 'dataflow', label: '5. Data Flow & Pipeline' },
  { id: 'algorithms', label: '6. Algorithms & Formulas' },
  { id: 'modules', label: '7. Module Descriptions' },
  { id: 'api', label: '8. API Integration' },
  { id: 'ui', label: '9. UI/UX Design' },
  { id: 'results', label: '10. Results & Outputs' },
  { id: 'future', label: '11. Future Enhancements' },
  { id: 'conclusion', label: '12. Conclusion' },
  { id: 'references', label: 'References' },
];

export default function ProjectReport({ onClose }: { onClose: () => void }) {
  const [activeSection, setActiveSection] = useState('abstract');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-950 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-amber-500/30 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📄</span>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">Project Report</h1>
            <p className="text-amber-400 text-xs">AI-Based Solar Rooftop Potential & Energy Prediction System</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all border border-gray-700 flex items-center gap-2"
        >
          <span>✕</span> Close Report
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar TOC */}
        <aside className="w-64 bg-gray-900 border-r border-gray-800 overflow-y-auto flex-shrink-0 hidden lg:block">
          <div className="p-4">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">Table of Contents</p>
            <nav className="space-y-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                    activeSection === s.id
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-10 space-y-16 text-gray-300">

            {/* Cover */}
            <div className="text-center py-10 border border-amber-500/20 rounded-2xl bg-gradient-to-b from-amber-500/5 to-transparent">
              <div className="text-6xl mb-4">☀️</div>
              <h1 className="text-3xl font-extrabold text-white mb-2">AI-Based Solar Rooftop Potential</h1>
              <h2 className="text-2xl font-bold text-amber-400 mb-6">& Energy Prediction System</h2>
              <div className="h-px w-24 bg-amber-500/50 mx-auto mb-6" />
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-sm">
                <div className="bg-gray-800/60 rounded-lg p-3 text-left">
                  <p className="text-gray-500 text-xs">Technology</p>
                  <p className="text-white font-semibold">React + TypeScript</p>
                </div>
                <div className="bg-gray-800/60 rounded-lg p-3 text-left">
                  <p className="text-gray-500 text-xs">Domain</p>
                  <p className="text-white font-semibold">Renewable Energy</p>
                </div>
                <div className="bg-gray-800/60 rounded-lg p-3 text-left">
                  <p className="text-gray-500 text-xs">API</p>
                  <p className="text-white font-semibold">Open-Meteo</p>
                </div>
                <div className="bg-gray-800/60 rounded-lg p-3 text-left">
                  <p className="text-gray-500 text-xs">Type</p>
                  <p className="text-white font-semibold">Web Application</p>
                </div>
              </div>
            </div>

            {/* Abstract */}
            <section id="abstract">
              <SectionTitle number="Abstract" />
              <Card>
                <p className="leading-relaxed text-gray-300">
                  This project presents an intelligent, web-based system for assessing solar rooftop installation
                  feasibility and predicting energy generation potential for residential and commercial buildings.
                  The system integrates real-time meteorological data fetched from the Open-Meteo API with
                  rule-based engineering algorithms that model solar irradiance, panel efficiency degradation,
                  seasonal variation, and financial return on investment.
                </p>
                <p className="leading-relaxed text-gray-300 mt-3">
                  Users input building parameters (rooftop area, orientation, tilt angle, roof type),
                  environmental factors (shading, obstacles), and their energy consumption profile. The system
                  processes these through a multi-factor efficiency pipeline to compute daily, monthly, and
                  annual energy generation, installation cost, savings, and payback period. The results are
                  presented through an interactive dashboard with charts, a recommendation engine, and a
                  suitability rating — enabling informed decision-making for solar adoption.
                </p>
              </Card>
            </section>

            {/* Introduction */}
            <section id="introduction">
              <SectionTitle number="1." title="Introduction" />
              <Card>
                <p className="leading-relaxed mb-4">
                  Solar energy is one of the fastest-growing renewable energy sources globally. India, with its
                  geographic advantage of receiving ~300 days of sunshine annually, has enormous rooftop solar
                  potential estimated at over <strong className="text-amber-400">637 GW</strong>. However, most
                  building owners lack tools to assess whether their specific rooftop is suitable and what
                  returns they can expect.
                </p>
                <p className="leading-relaxed mb-4">
                  Traditional solar assessments require on-site visits by engineers and weeks of data
                  collection. This project eliminates that barrier by building an automated prediction engine
                  accessible from any browser — no installation, no cost, no expert required.
                </p>
                <p className="leading-relaxed">
                  The system bridges the gap between complex solar engineering formulas and the average user by
                  wrapping all calculations in an intuitive multi-step wizard interface, producing
                  human-readable recommendations and visual dashboards.
                </p>
              </Card>
            </section>

            {/* Objectives */}
            <section id="objectives">
              <SectionTitle number="2." title="Objectives" />
              <Card>
                <ul className="space-y-3">
                  {[
                    'Collect building, location, and environmental parameters through a guided multi-step wizard',
                    'Auto-fetch real-time weather and solar radiation data using the Open-Meteo API based on geocoded location',
                    'Compute effective usable rooftop area after accounting for shadows and obstacles',
                    'Estimate maximum installable solar panel capacity in kilowatts (kW)',
                    'Calculate a composite efficiency score incorporating orientation, tilt, temperature, cloud cover, inverter losses, wiring losses, and soiling losses',
                    'Predict daily, monthly, and annual solar energy generation (kWh)',
                    'Estimate total installation cost, monthly and annual savings, and payback period',
                    'Generate CO₂ offset values to quantify environmental impact',
                    'Provide intelligent, prioritized recommendations for improving solar yield',
                    'Display results through interactive charts: bar, area, pie, and radial charts',
                  ].map((obj, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-gray-300">{obj}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </section>

            {/* System Architecture */}
            <section id="architecture">
              <SectionTitle number="3." title="System Architecture" />
              <Card>
                <p className="mb-6 text-gray-400">
                  The system follows a <strong className="text-white">3-tier client-side architecture</strong> —
                  all processing happens in the browser with no backend server required.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      tier: 'Tier 1 — Presentation Layer',
                      color: 'amber',
                      items: [
                        'React 18 component tree with TypeScript for type safety',
                        'Multi-step wizard: Location → Building → Environment → Energy → Results',
                        'Tailwind CSS for responsive dark-themed UI',
                        'Recharts library for interactive data visualizations',
                      ],
                    },
                    {
                      tier: 'Tier 2 — Logic Layer',
                      color: 'emerald',
                      items: [
                        'calculations.ts — Core solar energy computation engine',
                        'weatherApi.ts — API integration and monthly seasonal modelling',
                        'Multi-factor efficiency pipeline with 7 loss parameters',
                        'Rule-based recommendation engine with priority classification',
                      ],
                    },
                    {
                      tier: 'Tier 3 — Data Layer',
                      color: 'blue',
                      items: [
                        'Open-Meteo Forecast API — real-time weather data (16-day forecast)',
                        'Open-Meteo Geocoding API — city search and coordinates lookup',
                        'In-memory state management via React useState hooks',
                        'No database required — stateless session-based computation',
                      ],
                    },
                  ].map((tier) => (
                    <div key={tier.tier} className={`border border-${tier.color}-500/30 bg-${tier.color}-500/5 rounded-xl p-4`}>
                      <h4 className={`font-bold text-${tier.color}-400 mb-2 text-sm`}>{tier.tier}</h4>
                      <ul className="space-y-1">
                        {tier.items.map((item, i) => (
                          <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 bg-${tier.color}-400 rounded-full flex-shrink-0`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gray-800 rounded-xl">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Architecture Diagram</p>
                  <div className="flex flex-col items-center gap-2 text-xs">
                    <div className="bg-amber-500/20 border border-amber-500/40 rounded-lg px-6 py-2 text-amber-300 font-medium">
                      User Browser (React SPA)
                    </div>
                    <div className="text-gray-600">↕ API calls (HTTPS)</div>
                    <div className="flex gap-4">
                      <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg px-4 py-2 text-blue-300 font-medium text-center">
                        Open-Meteo<br/>Forecast API
                      </div>
                      <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-lg px-4 py-2 text-emerald-300 font-medium text-center">
                        Open-Meteo<br/>Geocoding API
                      </div>
                    </div>
                    <div className="text-gray-600">↕ JSON responses</div>
                    <div className="bg-purple-500/20 border border-purple-500/40 rounded-lg px-6 py-2 text-purple-300 font-medium">
                      Solar Calculation Engine (calculations.ts)
                    </div>
                    <div className="text-gray-600">↓ SolarResults object</div>
                    <div className="bg-pink-500/20 border border-pink-500/40 rounded-lg px-6 py-2 text-pink-300 font-medium">
                      Results Dashboard + Charts (Recharts)
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Technology Stack */}
            <section id="tech">
              <SectionTitle number="4." title="Technology Stack" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    category: 'Frontend Framework',
                    icon: '⚛️',
                    items: [
                      { name: 'React 18', desc: 'UI component library with hooks' },
                      { name: 'TypeScript', desc: 'Static type checking for reliability' },
                      { name: 'Vite', desc: 'Lightning-fast build tool & dev server' },
                    ],
                  },
                  {
                    category: 'Styling & UI',
                    icon: '🎨',
                    items: [
                      { name: 'Tailwind CSS', desc: 'Utility-first CSS framework' },
                      { name: 'Custom CSS Animations', desc: 'Shimmer, pulse, slide effects' },
                      { name: 'Responsive Design', desc: 'Mobile-first adaptive layout' },
                    ],
                  },
                  {
                    category: 'Data Visualization',
                    icon: '📊',
                    items: [
                      { name: 'Recharts', desc: 'Bar, Area, Pie, RadialBar charts' },
                      { name: 'Custom Tooltips', desc: 'Styled interactive data tips' },
                      { name: 'ResponsiveContainer', desc: 'Auto-scaling chart wrappers' },
                    ],
                  },
                  {
                    category: 'External APIs',
                    icon: '🌐',
                    items: [
                      { name: 'Open-Meteo Forecast', desc: 'Free weather & solar radiation API' },
                      { name: 'Open-Meteo Geocoding', desc: 'City search & lat/lon lookup' },
                      { name: 'No API key needed', desc: 'Open-source, zero-cost integration' },
                    ],
                  },
                ].map((stack) => (
                  <div key={stack.category} className="bg-gray-800/60 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">{stack.icon}</span>
                      <h4 className="font-bold text-white text-sm">{stack.category}</h4>
                    </div>
                    <div className="space-y-2">
                      {stack.items.map((item) => (
                        <div key={item.name} className="flex items-start gap-2">
                          <span className="text-amber-400 text-xs mt-0.5">▸</span>
                          <div>
                            <span className="text-white text-xs font-semibold">{item.name}</span>
                            <span className="text-gray-500 text-xs"> — {item.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Data Flow */}
            <section id="dataflow">
              <SectionTitle number="5." title="Data Flow & Processing Pipeline" />
              <Card>
                <p className="text-gray-400 mb-6">
                  The system processes user inputs through a sequential 5-stage pipeline before delivering results:
                </p>
                <div className="space-y-4">
                  {[
                    {
                      step: 'Stage 1',
                      title: 'Input Collection',
                      color: 'amber',
                      desc: 'User fills 4-step wizard: Location (city/lat-lon), Building attributes (area, type, orientation, tilt), Environmental factors (shadow %, obstacles), and Energy profile (monthly consumption, cost per unit).',
                      inputs: ['City name or coordinates', 'Rooftop area (m²)', 'Shadow percentage', 'Monthly consumption (kWh)'],
                    },
                    {
                      step: 'Stage 2',
                      title: 'Geocoding & Weather Fetch',
                      color: 'blue',
                      desc: 'City name is resolved to latitude/longitude via Geocoding API. Then a 16-day weather forecast is fetched for that location including sunshine duration, shortwave radiation, temperature min/max, cloud cover mean, and precipitation.',
                      inputs: ['Sunshine duration (s/day → hours)', 'Shortwave radiation sum (kWh/m²)', 'Temperature max/min (°C)', 'Cloud cover mean (%)', 'Precipitation sum (mm)'],
                    },
                    {
                      step: 'Stage 3',
                      title: 'Seasonal Modelling',
                      color: 'purple',
                      desc: 'Since the weather API returns only 16-day forecasts, monthly profiles are generated algorithmically using cosine-based seasonal variation functions calibrated to the location\'s latitude and hemisphere.',
                      inputs: ['Monthly sunlight hours [12 values]', 'Monthly temperature [12 values]', 'Monthly cloud cover [12 values]', 'Monthly radiation [12 values]'],
                    },
                    {
                      step: 'Stage 4',
                      title: 'Solar Calculation Engine',
                      color: 'emerald',
                      desc: 'All collected data passes through the 12-step calculation pipeline (detailed in Section 6) to compute capacity, efficiency, energy generation, costs, savings, and recommendations.',
                      inputs: ['Effective area', 'System capacity (kW)', 'Composite efficiency score', 'Monthly energy generation array'],
                    },
                    {
                      step: 'Stage 5',
                      title: 'Results Rendering',
                      color: 'pink',
                      desc: 'The SolarResults object is passed to the ResultsDashboard component which renders 4 tabbed views: Overview metrics, Energy charts, Financial analysis, and Smart Recommendations.',
                      inputs: ['Key metric cards', 'Bar/Area/Pie/Radial charts', 'Priority-sorted recommendations', '25-year ROI projection'],
                    },
                  ].map((stage, i) => (
                    <div key={i} className={`border-l-4 border-${stage.color}-500 pl-4`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold text-${stage.color}-400 bg-${stage.color}-500/10 px-2 py-0.5 rounded`}>
                          {stage.step}
                        </span>
                        <h4 className="font-bold text-white">{stage.title}</h4>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{stage.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {stage.inputs.map((inp) => (
                          <span key={inp} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded border border-gray-700">
                            {inp}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* Algorithms */}
            <section id="algorithms">
              <SectionTitle number="6." title="Algorithms & Mathematical Formulas" />
              <p className="text-gray-400 mb-4">
                This is the core of the project. All 12 computation steps are described below with their exact formulas and logic.
              </p>

              {/* Step 1 */}
              <AlgoCard number="6.1" title="Effective Rooftop Area Calculation">
                <p className="text-sm text-gray-400 mb-3">
                  The raw rooftop area is reduced by two independent loss factors — shadows from nearby structures/trees
                  and obstruction coverage (water tanks, chimneys, etc.).
                </p>
                <FormulaBox>
                  Shadow Factor = 1 − (Shadow% / 100){'\n'}
                  Obstacle Factor = 1 − (ObstacleCoverage% / 100)  [if obstacles = Yes]{'\n'}
                  {'\n'}
                  Effective Area (m²) = Rooftop Area × Shadow Factor × Obstacle Factor
                </FormulaBox>
                <Example>
                  Example: 200 m² rooftop, 20% shadow, 10% obstacle coverage{'\n'}
                  → Effective Area = 200 × 0.80 × 0.90 = 144 m²
                </Example>
              </AlgoCard>

              {/* Step 2 */}
              <AlgoCard number="6.2" title="Maximum Installable Capacity">
                <p className="text-sm text-gray-400 mb-3">
                  Standard solar panel density rules are applied based on roof type. Flat roofs require more spacing
                  between rows to avoid self-shading, hence higher area per kW.
                </p>
                <FormulaBox>
                  Area per kW = 12 m²/kW  [Flat roof — needs inter-row spacing]{'\n'}
                  Area per kW = 10 m²/kW  [Sloped roof — panels flush-mounted]{'\n'}
                  {'\n'}
                  Capacity (kW) = Effective Area / Area per kW
                </FormulaBox>
                <Example>
                  Example: 144 m² effective area, flat roof{'\n'}
                  → Capacity = 144 / 12 = 12 kW
                </Example>
              </AlgoCard>

              {/* Step 3 */}
              <AlgoCard number="6.3" title="Orientation Efficiency Factor">
                <p className="text-sm text-gray-400 mb-3">
                  Solar panels must face toward the equator for maximum sun exposure throughout the day.
                  In the Northern Hemisphere, this means South-facing; in the Southern Hemisphere, North-facing.
                  East/West orientations receive morning or evening sun only, reducing output by ~15%.
                </p>
                <FormulaBox>
                  Northern Hemisphere (Latitude ≥ 0°):{'\n'}
                  South → 1.00 (optimal){'\n'}
                  East / West → 0.85{'\n'}
                  North → 0.60 (worst case){'\n'}
                  {'\n'}
                  Southern Hemisphere (Latitude &lt; 0°):{'\n'}
                  North → 1.00 (optimal){'\n'}
                  East / West → 0.85{'\n'}
                  South → 0.60 (worst case)
                </FormulaBox>
                <Example>
                  Example: Mumbai (lat 19°N), West-facing roof{'\n'}
                  → Orientation Efficiency = 0.85 (15% loss vs. south-facing)
                </Example>
              </AlgoCard>

              {/* Step 4 */}
              <AlgoCard number="6.4" title="Tilt Angle Efficiency Factor">
                <p className="text-sm text-gray-400 mb-3">
                  The optimal tilt angle equals the geographic latitude of the location. This maximizes the
                  perpendicular incidence of sunlight on the panel surface averaged over the year. Deviation from
                  optimal reduces efficiency at 0.5% per degree of difference, with a floor of 70%.
                </p>
                <FormulaBox>
                  Optimal Tilt (°) = |Latitude|{'\n'}
                  Degree Difference = |User Tilt − Optimal Tilt|{'\n'}
                  {'\n'}
                  Tilt Efficiency = max(1 − Difference × 0.005, 0.70)
                </FormulaBox>
                <Example>
                  Example: Delhi (lat 28.6°N), user tilt = 15°{'\n'}
                  → Optimal = 28.6°, Difference = 13.6°{'\n'}
                  → Tilt Efficiency = max(1 − 13.6 × 0.005, 0.70) = max(0.932, 0.70) = 0.932
                </Example>
              </AlgoCard>

              {/* Step 5 */}
              <AlgoCard number="6.5" title="Temperature Loss Factor">
                <p className="text-sm text-gray-400 mb-3">
                  Silicon solar cells suffer a power output reduction as temperature rises above 25°C (Standard Test
                  Condition temperature). This is known as the temperature coefficient of power (Pmax). Most
                  polycrystalline panels have a coefficient of −0.4% per °C above 25°C.
                </p>
                <FormulaBox>
                  If Temperature ≤ 25°C → Temperature Loss = 1.0 (no loss){'\n'}
                  If Temperature &gt; 25°C:{'\n'}
                  Temperature Loss = max(1 − (Temperature − 25) × 0.004, 0.80)
                </FormulaBox>
                <Example>
                  Example: Rajasthan summer temperature = 42°C{'\n'}
                  → Temperature Loss = max(1 − 17 × 0.004, 0.80) = max(0.932, 0.80) = 0.932{'\n'}
                  → 6.8% power loss due to heat
                </Example>
              </AlgoCard>

              {/* Step 6 */}
              <AlgoCard number="6.6" title="Cloud Cover Factor">
                <p className="text-sm text-gray-400 mb-3">
                  Cloud cover reduces incident solar radiation but does not eliminate it entirely (diffuse radiation
                  still reaches panels). The reduction rate is modelled at 0.6% per percentage point of cloud cover,
                  meaning even 100% overcast retains 40% output from diffuse light.
                </p>
                <FormulaBox>
                  Cloud Factor = 1 − (Cloud Cover% × 0.006)
                </FormulaBox>
                <Example>
                  Example: 60% average cloud cover (Mumbai monsoon){'\n'}
                  → Cloud Factor = 1 − (60 × 0.006) = 1 − 0.36 = 0.64{'\n'}
                  → 36% energy loss during heavy cloud periods
                </Example>
              </AlgoCard>

              {/* Step 7 */}
              <AlgoCard number="6.7" title="System Loss Factors">
                <p className="text-sm text-gray-400 mb-3">
                  Beyond environmental factors, real solar systems incur fixed engineering losses due to electrical
                  components and physical degradation. Three additional loss multipliers are applied:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="py-2 pr-4 text-amber-400 font-semibold">Loss Type</th>
                        <th className="py-2 pr-4 text-amber-400 font-semibold">Factor Value</th>
                        <th className="py-2 text-amber-400 font-semibold">Reason</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-400 text-xs">
                      {[
                        ['Inverter Efficiency', '0.96 (4% loss)', 'DC-to-AC conversion losses in the inverter'],
                        ['Wiring / Cabling Loss', '0.98 (2% loss)', 'Resistance losses in copper cables and connectors'],
                        ['Soiling Loss (Urban)', '0.95 (5% loss)', 'Dust, pollution, bird droppings on panel surface'],
                        ['Soiling Loss (Rural)', '0.97 (3% loss)', 'Cleaner air = less soiling than urban areas'],
                      ].map(([type, val, reason]) => (
                        <tr key={type} className="border-b border-gray-800">
                          <td className="py-2 pr-4 text-white font-medium">{type}</td>
                          <td className="py-2 pr-4 text-emerald-400">{val}</td>
                          <td className="py-2">{reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AlgoCard>

              {/* Step 8 */}
              <AlgoCard number="6.8" title="Composite Efficiency Score">
                <p className="text-sm text-gray-400 mb-3">
                  All seven efficiency factors are multiplied together to produce a single composite efficiency
                  score that represents the overall fraction of maximum theoretical energy that will actually be
                  delivered by the system.
                </p>
                <FormulaBox>
                  Efficiency Score = Orientation × Tilt × Temperature × Cloud{'\n'}
                              × Inverter × Wiring × Soiling{'\n'}
                  {'\n'}
                  Displayed as: Efficiency Score × 100 (as a percentage)
                </FormulaBox>
                <Example>
                  Example with all favourable conditions (South-facing, Delhi, summer):{'\n'}
                  = 1.00 × 0.932 × 0.932 × 0.82 × 0.96 × 0.98 × 0.95{'\n'}
                  = 0.632 → 63.2% composite efficiency
                </Example>
              </AlgoCard>

              {/* Step 9 */}
              <AlgoCard number="6.9" title="Energy Generation Prediction">
                <p className="text-sm text-gray-400 mb-3">
                  The classic solar energy generation formula multiplies system capacity (kW) by available peak sun
                  hours and the composite efficiency. This is computed at daily, monthly (with seasonal variation),
                  and annual granularity.
                </p>
                <FormulaBox>
                  Daily Energy (kWh) = Capacity × Avg Sunlight Hours × Efficiency{'\n'}
                  {'\n'}
                  Monthly Energy[m] (kWh) = Capacity × MonthlySunlight[m]{'\n'}
                                         × MonthlyEfficiency[m] × DaysInMonth[m]{'\n'}
                  {'\n'}
                  Annual Energy (kWh) = Σ Monthly Energy[m]  for m = Jan to Dec
                </FormulaBox>
                <Example>
                  Example: 12 kW system, 5.5 hrs/day sunlight, 63.2% efficiency{'\n'}
                  → Daily = 12 × 5.5 × 0.632 = 41.7 kWh/day{'\n'}
                  → Monthly ≈ 41.7 × 30 = 1,251 kWh/month{'\n'}
                  → Annual ≈ 15,012 kWh/year (with seasonal variation)
                </Example>
              </AlgoCard>

              {/* Step 10 */}
              <AlgoCard number="6.10" title="Financial Calculations">
                <p className="text-sm text-gray-400 mb-3">
                  Three financial metrics are computed to help users evaluate the investment:
                </p>
                <FormulaBox>
                  Installation Cost (₹) = Capacity (kW) × ₹50,000/kW{'\n'}
                  {'\n'}
                  Monthly Savings (₹) = Monthly Energy (kWh) × Cost per Unit (₹/kWh){'\n'}
                  Annual Savings (₹) = Annual Energy (kWh) × Cost per Unit (₹/kWh){'\n'}
                  {'\n'}
                  Payback Period (years) = Installation Cost / Annual Savings
                </FormulaBox>
                <p className="text-xs text-gray-500 mt-2">
                  ₹50,000/kW is the average cost of solar installation in India inclusive of panels, inverter,
                  mounting structure, wiring, and installation labour. This figure is regularly updated and
                  reflects 2024 market rates.
                </p>
                <Example>
                  Example: 12 kW system, ₹8/kWh electricity rate, 15,012 kWh/yr{'\n'}
                  → Installation Cost = 12 × 50,000 = ₹6,00,000{'\n'}
                  → Annual Savings = 15,012 × 8 = ₹1,20,096{'\n'}
                  → Payback = 6,00,000 / 1,20,096 = 5.0 years
                </Example>
              </AlgoCard>

              {/* Step 11 */}
              <AlgoCard number="6.11" title="CO₂ Offset Calculation">
                <p className="text-sm text-gray-400 mb-3">
                  Each unit of solar energy generated displaces electricity from the Indian grid, which has a carbon
                  emission factor of <strong className="text-amber-400">0.82 kg CO₂ per kWh</strong> (Central
                  Electricity Authority, India, 2023).
                </p>
                <FormulaBox>
                  Annual CO₂ Offset (kg) = Annual Energy (kWh) × 0.82 kg/kWh{'\n'}
                  25-Year CO₂ Offset (tonnes) = Annual Offset × 25 / 1000
                </FormulaBox>
                <Example>
                  Example: 15,012 kWh/year{'\n'}
                  → Annual CO₂ Offset = 15,012 × 0.82 = 12,310 kg = 12.3 tonnes/year{'\n'}
                  → 25-Year Impact = 12.3 × 25 = 307.5 tonnes CO₂ prevented
                </Example>
              </AlgoCard>

              {/* Step 12 */}
              <AlgoCard number="6.12" title="Optimal System Sizing Algorithm">
                <p className="text-sm text-gray-400 mb-3">
                  Rather than recommending the maximum installable capacity, the system intelligently computes the
                  minimum required capacity to cover the user's actual electricity consumption. This prevents
                  over-investment.
                </p>
                <FormulaBox>
                  Required Capacity = (Monthly Consumption × 12){'\n'}
                                   / (Avg Sunlight Hours × 365 × Efficiency){'\n'}
                  {'\n'}
                  Optimal System Size = min(Required Capacity, Max Capacity)
                </FormulaBox>
                <Example>
                  Example: 300 kWh/month consumption, 5.5 hrs/day, 63.2% efficiency{'\n'}
                  → Required = (300 × 12) / (5.5 × 365 × 0.632){'\n'}
                  → Required = 3,600 / 1,267.3 = 2.84 kW{'\n'}
                  → Optimal = min(2.84, 12) = 2.84 kW (saves ₹4.6L vs. 12 kW install)
                </Example>
              </AlgoCard>

              {/* Step 13 */}
              <AlgoCard number="6.13" title="Seasonal Modelling Algorithm (Cosine Wave Model)">
                <p className="text-sm text-gray-400 mb-3">
                  Since the Open-Meteo API returns only 16-day forecast data, monthly profiles for all 12 months
                  are synthesized using trigonometric seasonal variation models calibrated to latitude.
                </p>
                <FormulaBox>
                  Monthly Sunlight[m] = Base × (1 + Variation × cos((m − 5) × π/6)){'\n'}
                  Monthly Temperature[m] = Base + cos((m − 6) × π/6) × ΔTemp{'\n'}
                  {'\n'}
                  where: Variation = min(|Latitude| / 60, 0.5){'\n'}
                         ΔTemp = min(|Latitude| / 6, 12)°C{'\n'}
                         m = 0 (January) to 11 (December){'\n'}
                  {'\n'}
                  Tropical Monsoon Cloud Cover (|Lat| &lt; 23.5°):{'\n'}
                  CloudCover[m] = Base + 30 × exp(−((m − 6.5)² / 4))
                </FormulaBox>
                <p className="text-xs text-gray-500 mt-2">
                  For Southern Hemisphere locations, month index is shifted by 6 to flip seasons (summer = Dec-Feb).
                </p>
              </AlgoCard>

              {/* Step 14 */}
              <AlgoCard number="6.14" title="Feasibility Classification & Suitability Rating">
                <p className="text-sm text-gray-400 mb-3">
                  Two classification outputs are produced using threshold-based decision rules:
                </p>
                <FormulaBox>
                  FEASIBILITY (Binary Classification):{'\n'}
                  Feasible = YES  if MaxCapacity ≥ 1 kW AND EfficiencyScore &gt; 0.30{'\n'}
                  Feasible = NO   otherwise{'\n'}
                  {'\n'}
                  SUITABILITY RATING (3-Class Classification):{'\n'}
                  High   → EfficiencyScore ≥ 0.65 AND MaxCapacity ≥ 3 kW{'\n'}
                  Medium → EfficiencyScore ≥ 0.45 AND MaxCapacity ≥ 1.5 kW{'\n'}
                  Low    → everything else (but still feasible)
                </FormulaBox>
                <p className="text-xs text-gray-500 mt-2">
                  These thresholds were derived from standard solar industry benchmarks for commercially viable
                  residential solar installations in India.
                </p>
              </AlgoCard>
            </section>

            {/* Module Descriptions */}
            <section id="modules">
              <SectionTitle number="7." title="Module Descriptions" />
              <div className="space-y-4">
                {[
                  {
                    file: 'src/types/index.ts',
                    icon: '🔷',
                    purpose: 'Type Definitions',
                    desc: 'Defines all TypeScript interfaces used across the application: LocationData, BuildingData, EnvironmentData, EnergyProfile, WeatherData, SolarResults, Recommendation, FormData, GeocodingResult. Acts as the single source of truth for data structures.',
                  },
                  {
                    file: 'src/utils/weatherApi.ts',
                    icon: '🌦️',
                    purpose: 'Weather API Integration',
                    desc: 'Contains searchCity() for geocoding city names via Open-Meteo Geocoding API, and fetchWeatherData() which fetches 16-day forecast data and generates 12-month seasonal profiles using cosine-based mathematical models.',
                  },
                  {
                    file: 'src/utils/calculations.ts',
                    icon: '🧮',
                    purpose: 'Solar Calculation Engine',
                    desc: 'Core computation module. Contains calculateSolarPotential() (main pipeline), getOrientationEfficiency(), getTiltEfficiency(), getTemperatureLoss(), getCloudFactor(), and generateRecommendations(). Implements all 14 algorithms described in Section 6.',
                  },
                  {
                    file: 'src/utils/cn.ts',
                    icon: '🎨',
                    purpose: 'CSS Class Utility',
                    desc: 'Lightweight utility function for conditionally merging Tailwind CSS class names. Prevents class conflicts and enables dynamic styling.',
                  },
                  {
                    file: 'src/App.tsx',
                    icon: '🏗️',
                    purpose: 'Root Application Component',
                    desc: 'Manages global state (currentStep, formData, weather, results, loading), orchestrates step navigation, triggers API calls and calculations on final step submission, and renders the wizard/results flow.',
                  },
                  {
                    file: 'src/components/LocationStep.tsx',
                    icon: '📍',
                    purpose: 'Location Input Step',
                    desc: 'Provides city search with debounced autocomplete (Open-Meteo Geocoding), manual lat/lon input fallback, region type selector (Urban/Rural), and real-time coordinate display.',
                  },
                  {
                    file: 'src/components/BuildingStep.tsx',
                    icon: '🏠',
                    purpose: 'Building Attributes Step',
                    desc: 'Collects rooftop area, roof type (Flat/Sloped), compass orientation (N/S/E/W with visual selector), tilt angle slider (0-90°), and number of floors.',
                  },
                  {
                    file: 'src/components/EnvironmentStep.tsx',
                    icon: '🌳',
                    purpose: 'Environmental Factors Step',
                    desc: 'Captures shadow percentage (0-100%) via visual slider with real-time effective area preview, nearby obstacles toggle, and obstacle coverage percentage.',
                  },
                  {
                    file: 'src/components/EnergyProfileStep.tsx',
                    icon: '⚡',
                    purpose: 'Energy Profile Step',
                    desc: 'Collects monthly electricity consumption with quick-select presets, electricity cost per unit with common tariff options, and displays a live estimated monthly bill calculation.',
                  },
                  {
                    file: 'src/components/ResultsDashboard.tsx',
                    icon: '📊',
                    purpose: 'Results & Dashboard',
                    desc: 'Renders 4 tabbed views — Overview (metrics, efficiency gauge, weather), Energy (monthly bar chart, seasonal area chart, pie chart), Financial (cost breakdown, 25-year ROI line chart), and Recommendations (prioritized cards with priority badges).',
                  },
                  {
                    file: 'src/components/StepIndicator.tsx',
                    icon: '🔢',
                    purpose: 'Progress Wizard Indicator',
                    desc: 'Renders the top navigation bar showing step number, icon, label, and completion status with connecting lines between steps.',
                  },
                ].map((mod) => (
                  <div key={mod.file} className="bg-gray-800/60 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl mt-0.5">{mod.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <code className="text-xs bg-gray-900 text-amber-400 px-2 py-0.5 rounded font-mono">{mod.file}</code>
                          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">{mod.purpose}</span>
                        </div>
                        <p className="text-sm text-gray-400">{mod.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* API Integration */}
            <section id="api">
              <SectionTitle number="8." title="API Integration Details" />
              <Card>
                <h4 className="text-white font-bold mb-3">Open-Meteo APIs (Free, No API Key Required)</h4>
                <div className="space-y-4">
                  <div className="bg-gray-800 rounded-xl p-4">
                    <p className="text-amber-400 font-semibold text-sm mb-1">1. Geocoding API</p>
                    <code className="text-xs text-emerald-400 block bg-gray-900 p-2 rounded mb-2">
                      GET https://geocoding-api.open-meteo.com/v1/search?name=&#123;city&#125;&count=5&language=en
                    </code>
                    <p className="text-xs text-gray-400">Returns: name, latitude, longitude, country, admin1 (state) for up to 5 matching cities</p>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4">
                    <p className="text-amber-400 font-semibold text-sm mb-1">2. Weather Forecast API</p>
                    <code className="text-xs text-emerald-400 block bg-gray-900 p-2 rounded mb-2 break-all">
                      GET https://api.open-meteo.com/v1/forecast?latitude=&#123;lat&#125;&longitude=&#123;lon&#125;&daily=sunshine_duration,shortwave_radiation_sum,temperature_2m_max,temperature_2m_min,cloud_cover_mean,precipitation_sum&timezone=auto&forecast_days=16
                    </code>
                    <div className="text-xs text-gray-400 space-y-1">
                      <p>Returns daily arrays (16 values each) for:</p>
                      <ul className="grid grid-cols-2 gap-1 mt-1">
                        {['sunshine_duration (seconds)', 'shortwave_radiation_sum (kWh/m²)', 'temperature_2m_max (°C)', 'temperature_2m_min (°C)', 'cloud_cover_mean (%)', 'precipitation_sum (mm)'].map(f => (
                          <li key={f} className="flex items-center gap-1">
                            <span className="text-amber-400">▸</span> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-400 text-xs font-semibold">⚠️ API Limitation Handling</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Since the API provides only 16-day forecasts, monthly seasonal profiles are synthesized
                    mathematically (see Section 6.13). If the API call fails, the system gracefully falls back
                    to sensible Indian climate defaults (5 hrs/day sunlight, 40% cloud cover, 28°C).
                  </p>
                </div>
              </Card>
            </section>

            {/* UI/UX */}
            <section id="ui">
              <SectionTitle number="9." title="UI/UX Design" />
              <Card>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {[
                    { label: 'Design Theme', value: 'Dark mode with amber/emerald accents' },
                    { label: 'Layout', value: 'Responsive (mobile + desktop)' },
                    { label: 'Navigation', value: 'Multi-step wizard with progress bar' },
                    { label: 'Charts', value: 'Bar, Area, Pie, RadialBar (Recharts)' },
                    { label: 'Animations', value: 'CSS shimmer, fade-in, slide-up transitions' },
                    { label: 'Color Coding', value: 'Red = critical, Amber = medium, Green = good' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-2">
                      <span className="text-amber-400 text-xs mt-1">▸</span>
                      <div>
                        <span className="text-white text-xs font-semibold">{item.label}: </span>
                        <span className="text-gray-400 text-xs">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <h5 className="text-white font-semibold mb-2 text-sm">Results Dashboard — 4 Tabs</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { tab: 'Overview', desc: 'KPI cards, efficiency radial gauge, weather summary' },
                    { tab: 'Energy', desc: 'Monthly bar chart, seasonal area chart, energy pie chart' },
                    { tab: 'Financial', desc: 'Cost/savings cards, 25-year ROI area chart' },
                    { tab: 'Recommendations', desc: 'Priority-sorted suggestion cards with badges' },
                  ].map((t) => (
                    <div key={t.tab} className="bg-gray-800 rounded-lg p-3">
                      <p className="text-amber-400 font-bold text-xs mb-1">{t.tab}</p>
                      <p className="text-gray-500 text-xs">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* Results */}
            <section id="results">
              <SectionTitle number="10." title="System Outputs & Results" />
              <Card>
                <p className="text-gray-400 text-sm mb-4">The system produces the following 15 quantitative and qualitative outputs:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="py-2 pr-4 text-amber-400 font-semibold text-xs">#</th>
                        <th className="py-2 pr-4 text-amber-400 font-semibold text-xs">Output</th>
                        <th className="py-2 pr-4 text-amber-400 font-semibold text-xs">Unit</th>
                        <th className="py-2 text-amber-400 font-semibold text-xs">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      {[
                        ['1', 'Solar Feasibility', 'Yes / No', 'Binary classification of installation viability'],
                        ['2', 'Effective Rooftop Area', 'm²', 'Usable area after shadow & obstacle deductions'],
                        ['3', 'Max Installable Capacity', 'kW', 'Peak power of installable solar system'],
                        ['4', 'Composite Efficiency Score', '%', 'Overall system performance factor (7 sub-factors)'],
                        ['5', 'Daily Energy Generation', 'kWh/day', 'Average energy on a typical day'],
                        ['6', 'Monthly Energy Generation', 'kWh/month', 'Average monthly solar output'],
                        ['7', 'Annual Energy Generation', 'kWh/year', 'Total yearly solar production with seasonality'],
                        ['8', 'Monthly Generation Array', 'kWh [12]', 'Per-month breakdown for chart visualization'],
                        ['9', 'Installation Cost', '₹', 'Total estimated capital expenditure'],
                        ['10', 'Monthly Savings', '₹/month', 'Electricity bill reduction per month'],
                        ['11', 'Annual Savings', '₹/year', 'Total yearly financial benefit'],
                        ['12', 'Payback Period', 'Years', 'Time to recover installation investment'],
                        ['13', 'CO₂ Offset', 'kg/year', 'Annual carbon emissions avoided'],
                        ['14', 'Suitability Rating', 'High/Medium/Low', '3-class feasibility rating'],
                        ['15', 'Recommendations', 'Text list', 'Prioritized actionable improvement suggestions'],
                      ].map(([num, output, unit, desc]) => (
                        <tr key={num} className="border-b border-gray-800 text-gray-400">
                          <td className="py-2 pr-4 text-gray-600 font-mono">{num}</td>
                          <td className="py-2 pr-4 text-white font-medium">{output}</td>
                          <td className="py-2 pr-4 text-emerald-400">{unit}</td>
                          <td className="py-2">{desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </section>

            {/* Future */}
            <section id="future">
              <SectionTitle number="11." title="Future Enhancements" />
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { icon: '🤖', title: 'Machine Learning Model', desc: 'Replace rule-based efficiency factors with a trained Random Forest or XGBoost regression model using historical solar generation datasets (NREL, IEA).' },
                  { icon: '🗺️', title: 'Google Maps Integration', desc: 'Interactive satellite view with rooftop area selection, shade analysis from 3D building models, and neighborhood solar potential heatmaps.' },
                  { icon: '🏙️', title: 'Multi-City Comparison', desc: 'Side-by-side analysis of solar potential across multiple cities or locations, useful for businesses with multiple sites.' },
                  { icon: '🔋', title: 'Battery Storage Optimization', desc: 'Model self-consumption ratios with different battery capacities and recommend optimal battery sizing for overnight load coverage.' },
                  { icon: '📱', title: 'Mobile App (React Native)', desc: 'Convert to a native mobile app with camera-based rooftop area measurement and GPS-based automatic location detection.' },
                  { icon: '🏛️', title: 'Government Subsidy Integration', desc: 'Real-time integration with PM Surya Ghar Yojana and state DISCOM portals for subsidy amounts, eligibility checks, and application links.' },
                  { icon: '⚡', title: 'Net Metering Calculator', desc: 'Model excess energy export to the grid, calculate Feed-in Tariff (FiT) revenue, and compute net billing savings.' },
                  { icon: '📡', title: 'IoT Sensor Integration', desc: 'Connect to real installed solar systems via MQTT/REST to compare predicted vs. actual performance and improve model accuracy.' },
                ].map((item) => (
                  <div key={item.title} className="bg-gray-800/60 rounded-xl p-4 border border-gray-700 flex items-start gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h5 className="text-white font-semibold text-sm mb-1">{item.title}</h5>
                      <p className="text-gray-500 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Conclusion */}
            <section id="conclusion">
              <SectionTitle number="12." title="Conclusion" />
              <Card>
                <p className="leading-relaxed mb-4">
                  This project successfully demonstrates how a client-side web application can serve as a powerful
                  solar energy assessment tool without requiring any backend infrastructure. By integrating
                  real-time meteorological APIs with a rigorous multi-factor engineering calculation pipeline,
                  the system delivers accurate, actionable predictions that would otherwise require expensive
                  on-site solar audits.
                </p>
                <p className="leading-relaxed mb-4">
                  The 14 algorithms implemented — spanning area geometry, panel physics (temperature coefficients,
                  orientation factors), trigonometric seasonal modelling, financial analysis, and classification
                  logic — form a comprehensive solar feasibility engine. The results are communicated through an
                  intuitive visual dashboard that makes complex energy data accessible to non-technical users.
                </p>
                <p className="leading-relaxed">
                  The system aligns with India's National Solar Mission goal of 500 GW renewable energy by 2030,
                  democratizing access to solar assessment for millions of building owners. Future integration of
                  ML models and government subsidy APIs will further enhance its real-world impact and accuracy.
                </p>
              </Card>
            </section>

            {/* References */}
            <section id="references" className="pb-16">
              <SectionTitle number="References" />
              <Card>
                <ol className="space-y-3 text-sm text-gray-400 list-decimal list-inside">
                  {[
                    'Open-Meteo.com. (2024). Free Weather API. https://open-meteo.com/',
                    'Open-Meteo.com. (2024). Geocoding API Documentation. https://open-meteo.com/en/docs/geocoding-api',
                    'Ministry of New and Renewable Energy (MNRE), India. (2024). PM Surya Ghar: Muft Bijli Yojana. https://pmsuryaghar.gov.in/',
                    'Central Electricity Authority, India. (2023). CO2 Baseline Database for the Indian Power Sector. Grid Emission Factor: 0.82 kg CO2/kWh.',
                    'National Renewable Energy Laboratory (NREL). (2023). PVWatts Calculator Methodology. https://pvwatts.nrel.gov/',
                    'Duffie, J.A. & Beckman, W.A. (2013). Solar Engineering of Thermal Processes (4th ed.). Wiley.',
                    'Maehlum, M.A. (2023). Solar Panel Efficiency — What You Need To Know. Energy Informative.',
                    'Recharts Team. (2024). Recharts — Redefined Chart Library for React. https://recharts.org/',
                    'React Development Team. (2024). React 18 Documentation. https://react.dev/',
                    'Tailwind Labs. (2024). Tailwind CSS Documentation. https://tailwindcss.com/docs',
                    'International Energy Agency (IEA). (2023). Solar PV Global Supply Chains Report.',
                    'Indian Institute of Technology (IIT) Bombay. (2022). Solar Resource Assessment for India. NCPRE Reports.',
                  ].map((ref, i) => (
                    <li key={i} className="leading-relaxed">{ref}</li>
                  ))}
                </ol>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Helper Components ─────────────────────────────────────────────────

function SectionTitle({ number, title }: { number: string; title?: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-shrink-0 bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-sm px-3 py-1 rounded-lg">
        {number}
      </div>
      {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
      {!title && <div className="h-px flex-1 bg-gray-800" />}
      {title && <div className="h-px flex-1 bg-gray-800" />}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6">
      {children}
    </div>
  );
}

function AlgoCard({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-5 mb-4">
      <div className="flex items-center gap-3 mb-3">
        <span className="bg-amber-500/20 text-amber-400 font-bold text-xs px-2 py-1 rounded border border-amber-500/30">
          {number}
        </span>
        <h3 className="text-white font-bold text-base">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function FormulaBox({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-gray-900 border border-emerald-500/20 rounded-xl p-4 text-xs text-emerald-400 font-mono overflow-x-auto whitespace-pre-wrap mb-3">
      {children}
    </pre>
  );
}

function Example({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-3 text-xs text-blue-300 font-mono overflow-x-auto whitespace-pre-wrap">
      {children}
    </pre>
  );
}
