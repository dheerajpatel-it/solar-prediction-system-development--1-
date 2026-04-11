import { FormData, WeatherData, SolarResults, Recommendation } from '../types';

const COST_PER_KW = 50000; // ₹50,000 per kW (Indian average)
const CO2_PER_KWH = 0.82; // kg CO2 offset per kWh (Indian grid average)
// Panel degradation: 0.5% per year over 25-year lifetime
// These constants inform long-term projections

export function calculateSolarPotential(
  formData: FormData,
  weather: WeatherData
): SolarResults {
  const { building, environment, energyProfile } = formData;

  // 1. Calculate effective rooftop usable area
  const shadowFactor = 1 - environment.shadowPercentage / 100;
  const obstacleFactor = environment.nearbyObstacles
    ? 1 - environment.obstaclesCoverage / 100
    : 1;
  const effectiveArea = building.rooftopArea * shadowFactor * obstacleFactor;

  // 2. Estimate maximum installable solar capacity
  const sqMPerKW = building.roofType === 'flat' ? 12 : 10;
  const maxCapacity = Math.max(effectiveArea / sqMPerKW, 0);

  // 3. Compute efficiency factor
  const orientationEfficiency = getOrientationEfficiency(
    building.orientation,
    formData.location.latitude ?? 20
  );
  const tiltEfficiency = getTiltEfficiency(
    building.tiltAngle,
    formData.location.latitude ?? 20
  );
  const temperatureLoss = getTemperatureLoss(weather.avgTemperature);
  const cloudFactor = getCloudFactor(weather.avgCloudCover);
  const inverterEfficiency = 0.96;
  const wiringLoss = 0.98;
  const soilingLoss = formData.location.regionType === 'urban' ? 0.95 : 0.97;

  const efficiencyScore =
    orientationEfficiency *
    tiltEfficiency *
    temperatureLoss *
    cloudFactor *
    inverterEfficiency *
    wiringLoss *
    soilingLoss;

  // 4. Predict energy generation
  const dailyEnergy = maxCapacity * weather.avgSunlightHours * efficiencyScore;

  // 5. Monthly generation based on weather variation
  const monthlyGeneration = weather.monthlySunlightHours.map((sunlight, i) => {
    const monthCloudFactor = getCloudFactor(weather.monthlyCloudCover[i]);
    const monthTempLoss = getTemperatureLoss(weather.monthlyTemperature[i]);
    const monthEfficiency =
      orientationEfficiency *
      tiltEfficiency *
      monthTempLoss *
      monthCloudFactor *
      inverterEfficiency *
      wiringLoss *
      soilingLoss;
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][i];
    return Math.round(maxCapacity * sunlight * monthEfficiency * daysInMonth);
  });

  const annualEnergy = monthlyGeneration.reduce((a, b) => a + b, 0);
  const monthlyEnergy = Math.round(annualEnergy / 12);

  // 6. Cost calculations
  const installationCost = Math.round(maxCapacity * COST_PER_KW);
  const costPerUnit = energyProfile.electricityCostPerUnit || 8;
  const monthlySavings = Math.round(monthlyEnergy * costPerUnit);
  const annualSavings = Math.round(annualEnergy * costPerUnit);
  const paybackPeriod =
    annualSavings > 0
      ? Math.round((installationCost / annualSavings) * 10) / 10
      : Infinity;

  // 7. CO2 offset
  const co2Offset = Math.round(annualEnergy * CO2_PER_KWH);

  // 8. Feasibility check
  const feasibility = maxCapacity >= 1 && efficiencyScore > 0.3;
  let feasibilityReason = '';
  if (!feasibility) {
    if (maxCapacity < 1) {
      feasibilityReason =
        'Effective rooftop area is too small for a viable solar installation (minimum 1 kW required).';
    } else {
      feasibilityReason =
        'Environmental conditions (excessive shadow, poor orientation) reduce efficiency below viable levels.';
    }
  } else {
    feasibilityReason =
      'Your rooftop is suitable for solar panel installation!';
  }

  // 9. Suitability rating
  let suitabilityRating: 'High' | 'Medium' | 'Low';
  if (efficiencyScore >= 0.65 && maxCapacity >= 3) {
    suitabilityRating = 'High';
  } else if (efficiencyScore >= 0.45 && maxCapacity >= 1.5) {
    suitabilityRating = 'Medium';
  } else {
    suitabilityRating = 'Low';
  }

  // 10. Optimal system size (based on consumption if provided)
  let optimalSystemSize = maxCapacity;
  if (energyProfile.monthlyConsumption > 0) {
    const requiredCapacity =
      (energyProfile.monthlyConsumption * 12) /
      (weather.avgSunlightHours * 365 * efficiencyScore);
    optimalSystemSize = Math.min(requiredCapacity, maxCapacity);
  }
  optimalSystemSize = Math.round(optimalSystemSize * 10) / 10;

  // 11. Best orientation
  const lat = formData.location.latitude ?? 20;
  const bestOrientation = lat >= 0 ? 'South' : 'North';

  // 12. Generate recommendations
  const recommendations = generateRecommendations(
    formData,
    weather,
    efficiencyScore,
    maxCapacity,
    paybackPeriod,
    optimalSystemSize,
    bestOrientation
  );

  return {
    feasibility,
    feasibilityReason,
    effectiveArea: Math.round(effectiveArea * 10) / 10,
    maxCapacity: Math.round(maxCapacity * 10) / 10,
    efficiencyScore: Math.round(efficiencyScore * 1000) / 10,
    dailyEnergy: Math.round(dailyEnergy * 10) / 10,
    monthlyEnergy,
    annualEnergy,
    installationCost,
    monthlySavings,
    annualSavings,
    paybackPeriod,
    co2Offset,
    recommendations,
    suitabilityRating,
    optimalSystemSize,
    bestOrientation,
    monthlyGeneration,
  };
}

function getOrientationEfficiency(
  orientation: string,
  latitude: number
): number {
  const isNorthernHemisphere = latitude >= 0;

  if (isNorthernHemisphere) {
    switch (orientation) {
      case 'south':
        return 1.0;
      case 'east':
      case 'west':
        return 0.85;
      case 'north':
        return 0.6;
      default:
        return 0.85;
    }
  } else {
    switch (orientation) {
      case 'north':
        return 1.0;
      case 'east':
      case 'west':
        return 0.85;
      case 'south':
        return 0.6;
      default:
        return 0.85;
    }
  }
}

function getTiltEfficiency(tiltAngle: number, latitude: number): number {
  const optimalTilt = Math.abs(latitude);
  const diff = Math.abs(tiltAngle - optimalTilt);
  // Lose ~0.5% efficiency per degree off optimal
  return Math.max(1 - diff * 0.005, 0.7);
}

function getTemperatureLoss(temperature: number): number {
  if (temperature <= 25) return 1.0;
  // 0.4% loss per degree above 25°C
  return Math.max(1 - (temperature - 25) * 0.004, 0.8);
}

function getCloudFactor(cloudCover: number): number {
  // Cloud cover reduces output but doesn't eliminate it
  return 1 - cloudCover * 0.006;
}

function generateRecommendations(
  formData: FormData,
  _weather: WeatherData,
  _efficiency: number,
  capacity: number,
  payback: number,
  optimalSize: number,
  bestOrientation: string
): Recommendation[] {
  const recs: Recommendation[] = [];

  // Orientation recommendation
  if (
    formData.building.orientation !== bestOrientation.toLowerCase()
  ) {
    recs.push({
      icon: '🧭',
      title: `Reorient to ${bestOrientation}-facing`,
      description: `${bestOrientation}-facing panels generate up to 40% more energy at your latitude. Consider adjusting panel orientation if possible.`,
      priority: 'high',
    });
  } else {
    recs.push({
      icon: '✅',
      title: 'Optimal Orientation',
      description: `Your ${bestOrientation}-facing rooftop is ideal for maximum solar energy capture.`,
      priority: 'low',
    });
  }

  // Tilt recommendation
  const optimalTilt = Math.abs(formData.location.latitude ?? 20);
  if (Math.abs(formData.building.tiltAngle - optimalTilt) > 10) {
    recs.push({
      icon: '📐',
      title: `Adjust tilt to ${Math.round(optimalTilt)}°`,
      description: `Optimal tilt angle for your latitude is ${Math.round(optimalTilt)}°. Current tilt of ${formData.building.tiltAngle}° reduces efficiency.`,
      priority: 'medium',
    });
  }

  // Shadow recommendation
  if (formData.environment.shadowPercentage > 20) {
    recs.push({
      icon: '🌳',
      title: 'Reduce Shading',
      description: `${formData.environment.shadowPercentage}% shadow coverage significantly reduces output. Consider trimming trees or using micro-inverters for partial shade.`,
      priority: 'high',
    });
  }

  // System size recommendation
  if (
    formData.energyProfile.monthlyConsumption > 0 &&
    optimalSize < capacity
  ) {
    recs.push({
      icon: '⚡',
      title: `Optimal System: ${optimalSize} kW`,
      description: `Based on your consumption of ${formData.energyProfile.monthlyConsumption} kWh/month, a ${optimalSize} kW system would cover your needs without over-investing.`,
      priority: 'medium',
    });
  }

  // Financial recommendation
  if (payback <= 5) {
    recs.push({
      icon: '💰',
      title: 'Excellent Investment',
      description: `With a ${payback}-year payback period, this is a highly profitable investment. You'll enjoy ${25 - payback}+ years of free electricity.`,
      priority: 'low',
    });
  } else if (payback <= 8) {
    recs.push({
      icon: '📊',
      title: 'Good Investment',
      description: `A ${payback}-year payback is reasonable. Government subsidies can reduce this further. Check for state-specific solar incentives.`,
      priority: 'medium',
    });
  } else if (payback < Infinity) {
    recs.push({
      icon: '💡',
      title: 'Consider Subsidies',
      description: `The ${payback}-year payback is long. Apply for PM Surya Ghar or state subsidies to reduce costs by 30-40%.`,
      priority: 'high',
    });
  }

  // Maintenance recommendation
  recs.push({
    icon: '🔧',
    title: 'Regular Maintenance',
    description:
      'Clean panels every 2-3 months for optimal performance. Automated cleaning systems can maintain 95%+ efficiency year-round.',
    priority: 'low',
  });

  // Battery recommendation
  if (formData.energyProfile.monthlyConsumption > 300) {
    recs.push({
      icon: '🔋',
      title: 'Consider Battery Storage',
      description:
        'With high energy consumption, adding battery storage (5-10 kWh) can maximize self-consumption and provide backup power.',
      priority: 'medium',
    });
  }

  return recs;
}
