import { GeocodingResult, WeatherData } from '../types';

export async function searchCity(query: string): Promise<GeocodingResult[]> {
  if (!query || query.length < 2) return [];
  
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en`
    );
    const data = await res.json();
    
    if (!data.results) return [];
    
    return data.results.map((r: any) => ({
      name: r.name,
      latitude: r.latitude,
      longitude: r.longitude,
      country: r.country,
      admin1: r.admin1,
    }));
  } catch {
    return [];
  }
}

export async function fetchWeatherData(
  lat: number,
  lon: number
): Promise<WeatherData> {
  try {
    // Fetch current forecast data with solar radiation
    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=sunshine_duration,shortwave_radiation_sum,temperature_2m_max,temperature_2m_min,cloud_cover_mean,precipitation_sum&timezone=auto&forecast_days=16`;
    
    const forecastRes = await fetch(forecastUrl);
    const forecastData = await forecastRes.json();
    
    const daily = forecastData.daily;
    
    // Calculate averages from forecast data
    const avgSunlightHours = daily.sunshine_duration
      ? daily.sunshine_duration.reduce((a: number, b: number) => a + (b || 0), 0) / daily.sunshine_duration.length / 3600
      : 5;
    
    const avgCloudCover = daily.cloud_cover_mean
      ? daily.cloud_cover_mean.reduce((a: number, b: number) => a + (b || 0), 0) / daily.cloud_cover_mean.length
      : 50;
    
    const avgTempMax = daily.temperature_2m_max
      ? daily.temperature_2m_max.reduce((a: number, b: number) => a + (b || 0), 0) / daily.temperature_2m_max.length
      : 30;
    
    const avgTempMin = daily.temperature_2m_min
      ? daily.temperature_2m_min.reduce((a: number, b: number) => a + (b || 0), 0) / daily.temperature_2m_min.length
      : 20;
    
    const avgTemperature = (avgTempMax + avgTempMin) / 2;
    
    const avgRainfall = daily.precipitation_sum
      ? daily.precipitation_sum.reduce((a: number, b: number) => a + (b || 0), 0) / daily.precipitation_sum.length
      : 2;
    
    const avgRadiation = daily.shortwave_radiation_sum
      ? daily.shortwave_radiation_sum.reduce((a: number, b: number) => a + (b || 0), 0) / daily.shortwave_radiation_sum.length
      : 5;

    // Generate monthly estimates based on latitude and base data
    const monthlyRadiation = generateMonthlyRadiation(lat, avgRadiation);
    const monthlyTemperature = generateMonthlyTemperature(lat, avgTemperature);
    const monthlyCloudCover = generateMonthlyCloudCover(lat, avgCloudCover);
    const monthlySunlightHours = generateMonthlySunlight(lat, avgSunlightHours);

    return {
      avgSunlightHours: Math.max(avgSunlightHours, 1),
      avgCloudCover,
      avgTemperature,
      avgRainfall,
      monthlyRadiation,
      monthlyTemperature,
      monthlyCloudCover,
      monthlySunlightHours,
    };
  } catch (error) {
    console.error('Weather API error:', error);
    // Return reasonable defaults
    return {
      avgSunlightHours: 5,
      avgCloudCover: 40,
      avgTemperature: 28,
      avgRainfall: 3,
      monthlyRadiation: Array(12).fill(5),
      monthlyTemperature: Array(12).fill(28),
      monthlyCloudCover: Array(12).fill(40),
      monthlySunlightHours: Array(12).fill(5),
    };
  }
}

function generateMonthlyRadiation(lat: number, base: number): number[] {
  const absLat = Math.abs(lat);
  const isNorthern = lat >= 0;
  
  // Seasonal variation increases with latitude
  const variation = Math.min(absLat / 90, 0.6);
  
  return Array.from({ length: 12 }, (_, i) => {
    const month = isNorthern ? i : (i + 6) % 12;
    // Peak in June (month 5), trough in December (month 11)
    const seasonal = Math.cos((month - 5) * Math.PI / 6);
    return Math.max(base * (1 + seasonal * variation), base * 0.3);
  });
}

function generateMonthlyTemperature(lat: number, base: number): number[] {
  const absLat = Math.abs(lat);
  const isNorthern = lat >= 0;
  const variation = Math.min(absLat / 6, 12);
  
  return Array.from({ length: 12 }, (_, i) => {
    const month = isNorthern ? i : (i + 6) % 12;
    const seasonal = Math.cos((month - 6) * Math.PI / 6);
    return base + seasonal * variation;
  });
}

function generateMonthlyCloudCover(lat: number, base: number): number[] {
  const absLat = Math.abs(lat);
  const isNorthern = lat >= 0;
  
  // Tropical regions have monsoon variation
  const isTropical = absLat < 23.5;
  
  return Array.from({ length: 12 }, (_, i) => {
    const month = isNorthern ? i : (i + 6) % 12;
    if (isTropical) {
      // Monsoon peak around July-August
      const monsoon = Math.exp(-((month - 6.5) ** 2) / 4);
      return Math.min(base + monsoon * 30, 95);
    }
    const seasonal = Math.cos((month - 6) * Math.PI / 6);
    return Math.min(Math.max(base - seasonal * 15, 10), 90);
  });
}

function generateMonthlySunlight(lat: number, base: number): number[] {
  const absLat = Math.abs(lat);
  const isNorthern = lat >= 0;
  const variation = Math.min(absLat / 60, 0.5);
  
  return Array.from({ length: 12 }, (_, i) => {
    const month = isNorthern ? i : (i + 6) % 12;
    const seasonal = Math.cos((month - 5) * Math.PI / 6);
    return Math.max(base * (1 + seasonal * variation), 1);
  });
}
