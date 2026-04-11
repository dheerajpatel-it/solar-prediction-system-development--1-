export interface LocationData {
  city: string;
  latitude: number | null;
  longitude: number | null;
  regionType: 'urban' | 'rural';
}

export interface BuildingData {
  rooftopArea: number;
  roofType: 'flat' | 'sloped';
  orientation: 'north' | 'south' | 'east' | 'west';
  tiltAngle: number;
  floors: number;
}

export interface EnvironmentData {
  shadowPercentage: number;
  nearbyObstacles: boolean;
  obstaclesCoverage: number;
}

export interface EnergyProfile {
  monthlyConsumption: number;
  electricityCostPerUnit: number;
}

export interface WeatherData {
  avgSunlightHours: number;
  avgCloudCover: number;
  avgTemperature: number;
  avgRainfall: number;
  monthlyRadiation: number[];
  monthlyTemperature: number[];
  monthlyCloudCover: number[];
  monthlySunlightHours: number[];
}

export interface SolarResults {
  feasibility: boolean;
  feasibilityReason: string;
  effectiveArea: number;
  maxCapacity: number;
  efficiencyScore: number;
  dailyEnergy: number;
  monthlyEnergy: number;
  annualEnergy: number;
  installationCost: number;
  monthlySavings: number;
  annualSavings: number;
  paybackPeriod: number;
  co2Offset: number;
  recommendations: Recommendation[];
  suitabilityRating: 'High' | 'Medium' | 'Low';
  optimalSystemSize: number;
  bestOrientation: string;
  monthlyGeneration: number[];
}

export interface Recommendation {
  icon: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export interface FormData {
  location: LocationData;
  building: BuildingData;
  environment: EnvironmentData;
  energyProfile: EnergyProfile;
}

export interface GeocodingResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}
