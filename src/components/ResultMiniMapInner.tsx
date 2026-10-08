'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { CadiTestLog } from '@/types';

interface ResultMiniMapInnerProps {
  logs: CadiTestLog[];
  searchQuery?: string;
  filterLevel?: string;
}

export const ResultMiniMapInner: React.FC<ResultMiniMapInnerProps> = ({
  logs,
  searchQuery = '',
  filterLevel = 'all',
}) => {
  const defaultCenter: [number, number] = [26.8467, 80.9462]; // Centered around Lucknow/UP region

  const filteredLogs = logs.filter((log) => {
    if (filterLevel === 'high' && log.cadiScore < 50) return false;
    if (filterLevel === 'clean' && log.cadiScore > 25) return false;
    if (searchQuery && !log.district.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const createPinIcon = (score: number, color: string) => {
    const html = `
      <div style="
        background-color: ${color};
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 2px solid #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 800;
        font-size: 10px;
        font-family: var(--font-manrope), sans-serif;
        box-shadow: 0 3px 8px rgba(16,42,67,0.3);
      ">
        ${score}
      </div>
    `;
    return L.divIcon({
      className: 'custom-leaflet-mini-pin',
      html,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14],
    });
  };

  return (
    <div className="w-full h-full min-h-[220px] rounded-xl overflow-hidden relative">
      <MapContainer
        center={defaultCenter}
        zoom={6}
        scrollWheelZoom={false}
        className="w-full h-full min-h-[220px] z-10"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredLogs.map((log) => {
          const pos = log.locationB || log.locationA;
          if (!pos) return null;
          return (
            <Marker
              key={log.id}
              position={[pos.lat, pos.lng]}
              icon={createPinIcon(log.cadiScore, log.hazardColor)}
            >
              <Popup className="custom-leaflet-popup">
                <div className="p-1 space-y-1">
                  <div className="font-bold text-xs text-[#102A43]">{log.district}</div>
                  <div className="text-[11px] font-bold" style={{ color: log.hazardColor }}>
                    CADI: {log.cadiScore} ({log.hazardLevel})
                  </div>
                  <div className="text-[10px] text-[#52606D]">
                    Initial: {log.initialTDS} ppm | Final: {log.finalTDS} ppm
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
