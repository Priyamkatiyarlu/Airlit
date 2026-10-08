'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { CadiTestLog } from '@/types';
import { ShieldCheck, ShieldAlert, Search } from 'lucide-react';

interface MapViewInnerProps {
  logs: CadiTestLog[];
}

export const MapViewInner: React.FC<MapViewInnerProps> = ({ logs }) => {
  const [filterVerified, setFilterVerified] = useState<'all' | 'verified' | 'unverified'>('all');
  const [filterHazard, setFilterHazard] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const defaultCenter: [number, number] = [22.5937, 78.9629];

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    if (filterVerified === 'verified' && !log.verified) return false;
    if (filterVerified === 'unverified' && log.verified) return false;
    if (filterHazard !== 'all' && log.hazardLevel !== filterHazard) return false;
    if (
      searchQuery &&
      !log.district.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !(log.notes || '').toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // Custom Leaflet marker generator
  const createCustomIcon = (log: CadiTestLog) => {
    const isVerified = log.verified;
    const color = log.hazardColor || '#087F8C';
    const borderStyle = isVerified ? 'border: 3px solid #FFFFFF;' : 'border: 3px dashed #829AB1; opacity: 0.85;';

    const html = `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        ${borderStyle}
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 800;
        font-size: 11px;
        font-family: var(--font-manrope), sans-serif;
        box-shadow: 0 4px 10px rgba(16,42,67,0.3);
      ">
        ${log.cadiScore}
      </div>
    `;

    return L.divIcon({
      className: 'custom-leaflet-pin',
      html,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });
  };

  return (
    <div className="space-y-4">
      {/* Map Control Toolbar */}
      <div className="airlit-card p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Verification Status Selector */}
          <div className="flex items-center gap-1 bg-[#F5F8F8] p-1 rounded-xl border border-[#D9E2EC] text-xs font-mono">
            <button
              onClick={() => setFilterVerified('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterVerified === 'all'
                  ? 'bg-white text-[#102A43] font-bold shadow-sm'
                  : 'text-[#52606D] hover:text-[#102A43]'
              }`}
            >
              All ({logs.length})
            </button>
            <button
              onClick={() => setFilterVerified('verified')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                filterVerified === 'verified'
                  ? 'bg-[#22A06B]/15 text-[#22A06B] font-bold border border-[#22A06B]/30'
                  : 'text-[#52606D] hover:text-[#102A43]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Verified
            </button>
            <button
              onClick={() => setFilterVerified('unverified')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                filterVerified === 'unverified'
                  ? 'bg-[#E3A008]/15 text-[#E3A008] font-bold border border-[#E3A008]/30'
                  : 'text-[#52606D] hover:text-[#102A43]'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" /> Unverified
            </button>
          </div>

          {/* Hazard Dropdown */}
          <select
            value={filterHazard}
            onChange={(e) => setFilterHazard(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white border border-[#D9E2EC] text-[#102A43] text-xs font-mono focus:outline-none focus:border-[#087F8C]"
          >
            <option value="all">All Hazard Tiers</option>
            <option value="Severe Acidification Hazard">Severe Hazard (76-100)</option>
            <option value="High Chemical Load">High Load (51-75)</option>
            <option value="Moderate Chemical Loading">Moderate (26-50)</option>
            <option value="Clean Atmosphere">Clean Atmosphere (0-25)</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#829AB1] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search district or notes..."
            className="w-full sm:w-64 pl-9 pr-4 py-1.5 rounded-xl bg-white border border-[#D9E2EC] text-xs text-[#102A43] placeholder-[#829AB1] focus:outline-none focus:border-[#087F8C]"
          />
        </div>
      </div>

      {/* Map Container */}
      <div className="h-[480px] w-full rounded-2xl overflow-hidden border border-[#D9E2EC] shadow-sm relative">
        <MapContainer
          center={defaultCenter}
          zoom={5}
          scrollWheelZoom={true}
          className="h-full w-full z-10"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredLogs.map((log) => {
            const lat = log.locationA?.lat || 20;
            const lng = log.locationA?.lng || 78;
            return (
              <Marker key={log.id} position={[lat, lng]} icon={createCustomIcon(log)}>
                <Popup className="custom-popup">
                  <div className="p-3 space-y-2 text-[#102A43] max-w-xs font-sans">
                    <div className="flex items-center justify-between border-b border-[#D9E2EC] pb-1.5">
                      <span className="font-bold text-xs font-heading">{log.district}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          log.verified
                            ? 'bg-[#22A06B]/15 text-[#22A06B] border border-[#22A06B]/30'
                            : 'bg-[#E3A008]/15 text-[#E3A008] border border-[#E3A008]/30'
                        }`}
                      >
                        {log.verified ? '✓ Verified' : '⚠ Unverified'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#52606D]">CADI Score:</span>
                      <span
                        className="text-base font-black font-heading"
                        style={{ color: log.hazardColor }}
                      >
                        {log.cadiScore} / 100
                      </span>
                    </div>

                    <div className="text-[11px] text-[#52606D] bg-[#F5F8F8] p-2 rounded space-y-1 font-mono">
                      <div>pH Color Shift: <strong>{log.phColor.toUpperCase()}</strong></div>
                      <div>TDS Shift: <strong>{log.initialTDS} → {log.finalTDS} ppm (+{log.tdsDelta})</strong></div>
                      <div>Displacement: <strong>{log.distanceMeters}m</strong></div>
                    </div>

                    {log.notes && <p className="text-[11px] text-[#52606D] italic">"{log.notes}"</p>}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Map Legend */}
      <div className="airlit-card p-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#52606D]">
        <div className="flex items-center gap-4">
          <span className="font-bold text-[#102A43]">PIN STYLES:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#087F8C] border-2 border-white shadow-sm" />
            Solid Border = ✓ Verified (&lt;100m)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#E3A008] border-2 border-dashed border-[#829AB1]" />
            Dashed Border = ⚠ Unverified
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[#22A06B]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22A06B]" /> 0–25 Clean
          </span>
          <span className="flex items-center gap-1 text-[#E3A008]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E3A008]" /> 26–50 Moderate
          </span>
          <span className="flex items-center gap-1 text-[#E76F00]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E76F00]" /> 51–75 High
          </span>
          <span className="flex items-center gap-1 text-[#D64545]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D64545]" /> 76–100 Severe
          </span>
        </div>
      </div>
    </div>
  );
};
