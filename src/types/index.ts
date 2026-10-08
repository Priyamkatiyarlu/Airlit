export type PhColor = 'red' | 'yellow' | 'blue';

export interface LocationCoords {
  lat: number;
  lng: number;
  accuracy?: number;
}

export interface CadiTestLog {
  _id?: string;
  id: string;
  timestamp: string; // ISO String
  locationA: LocationCoords;
  locationB?: LocationCoords;
  distanceMeters: number;
  verified: boolean;
  district: string;
  phColor: PhColor;
  initialTDS: number;
  finalTDS: number;
  tdsDelta: number;
  cadiScore: number;
  hazardLevel: 'Clean Atmosphere' | 'Moderate Chemical Loading' | 'High Chemical Load' | 'Severe Acidification Hazard';
  hazardColor: string; // CSS color string or hex
  notes?: string;
}

export interface FilterAuditResult {
  roomCADI: number;
  filteredCADI: number;
  efficiency: number;
  rating: 'Superior Extraction' | 'Moderate Extraction' | 'Inadequate Performance';
}
