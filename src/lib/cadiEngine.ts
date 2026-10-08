import { PhColor, LocationCoords } from '@/types';

export interface CadiCalculationResult {
  phPenalty: number;
  tdsDelta: number;
  tdsPenalty: number;
  cadiScore: number;
  hazardLevel: 'Clean Atmosphere' | 'Moderate Chemical Loading' | 'High Chemical Load' | 'Severe Acidification Hazard';
  hazardColor: string;
  badgeBg: string;
  badgeText: string;
  summaryText: string;
}

/**
 * Calculates Chemical Air Degradation Index (CADI) according to SRS Part A formula.
 */
export function calculateCADI(
  phColor: PhColor,
  initialTDS: number,
  finalTDS: number
): CadiCalculationResult {
  let phPenalty = 0;
  let tdsPenalty = 0;

  // 1. Assign pH Weights based on Color Selection
  if (phColor === 'red') {
    phPenalty = 50; // Acidic Gas Loading Hazard (SO2 / NO2)
  } else if (phColor === 'blue') {
    phPenalty = 25; // Alkaline / Basic Gas Loading Hazard (NH3)
  } else if (phColor === 'yellow') {
    phPenalty = 0; // Clean / Neutral Baseline
  }

  // 2. Compute the TDS Shift (Delta)
  const tdsDelta = finalTDS - initialTDS;

  // 3. Map Delta to a 50-Point Cap (15 ppm shift represents peak absorption threshold)
  if (tdsDelta > 0) {
    tdsPenalty = (tdsDelta / 15) * 50;
    tdsPenalty = Math.min(tdsPenalty, 50); // Ceil at 50 points
  } else {
    tdsPenalty = 0;
  }

  // 4. Output Final Combined CADI Score (0 - 100 Scale)
  const cadiScore = Math.round(phPenalty + tdsPenalty);

  // Determine UI Range Classification
  let hazardLevel: CadiCalculationResult['hazardLevel'];
  let hazardColor: string;
  let badgeBg: string;
  let badgeText: string;
  let summaryText: string;

  if (cadiScore <= 25) {
    hazardLevel = 'Clean Atmosphere';
    hazardColor = '#10B981'; // Emerald Green
    badgeBg = 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400';
    badgeText = 'Clean / Low Risk';
    summaryText = 'Atmospheric gas absorption is within safe baseline limits. Distilled water column detected nominal ionic activity.';
  } else if (cadiScore <= 50) {
    hazardLevel = 'Moderate Chemical Loading';
    hazardColor = '#F59E0B'; // Amber Yellow
    badgeBg = 'bg-amber-500/15 border-amber-500/30 text-amber-400';
    badgeText = 'Moderate Loading';
    summaryText = 'Elevated dissolved ion activity detected in scrubbed water. Ambient air contains trace industrial emissions or particulate scrub-offs.';
  } else if (cadiScore <= 75) {
    hazardLevel = 'High Chemical Load';
    hazardColor = '#F97316'; // Vivid Orange
    badgeBg = 'bg-orange-500/15 border-orange-500/30 text-orange-400';
    badgeText = 'High Chemical Load';
    summaryText = 'Substantial gaseous loading detected. High risk of corrosive SO₂/NO₂/NH₃ species in ambient air column.';
  } else {
    hazardLevel = 'Severe Acidification Hazard';
    hazardColor = '#EF4444'; // Red
    badgeBg = 'bg-rose-500/15 border-rose-500/30 text-rose-400';
    badgeText = 'Severe Hazard';
    summaryText = 'CRITICAL: Severe atmospheric acid deposition threat. Heavy ionic saturation recorded in liquid gas trap.';
  }

  return {
    phPenalty: Math.round(phPenalty),
    tdsDelta: Math.round(tdsDelta * 10) / 10,
    tdsPenalty: Math.round(tdsPenalty),
    cadiScore,
    hazardLevel,
    hazardColor,
    badgeBg,
    badgeText,
    summaryText,
  };
}

/**
 * Calculates Filter Efficiency percentage according to SRS Part B formula.
 */
export function calculateFilterEfficiency(roomCADI: number, filteredCADI: number): number {
  if (roomCADI <= 0) return 0; // Prevent division by zero
  const efficiency = ((roomCADI - filteredCADI) / roomCADI) * 100; // Calculate relative shift
  return Math.round(Math.max(0, Math.min(efficiency, 100))); // Constrain output bounds
}

/**
 * Calculates geographical distance between two coordinates in meters using the Haversine formula.
 * Used for Geospatial Time-Lock Security Protocol (SRS Section 4).
 */
export function calculateHaversineDistance(locA: LocationCoords, locB: LocationCoords): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (locA.lat * Math.PI) / 180;
  const φ2 = (locB.lat * Math.PI) / 180;
  const Δφ = ((locB.lat - locA.lat) * Math.PI) / 180;
  const Δλ = ((locB.lng - locA.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c); // Distance in meters
}
