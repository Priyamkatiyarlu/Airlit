'use client';

import React, { useState } from 'react';
import { Filter, Award, ArrowRight, ShieldCheck } from 'lucide-react';
import { calculateFilterEfficiency } from '@/lib/cadiEngine';

export const FilterAuditor: React.FC = () => {
  const [roomCADI, setRoomCADI] = useState<string>('68');
  const [filteredCADI, setFilteredCADI] = useState<string>('12');

  const parsedRoom = parseFloat(roomCADI) || 0;
  const parsedFiltered = parseFloat(filteredCADI) || 0;

  const efficiency = calculateFilterEfficiency(parsedRoom, parsedFiltered);

  let ratingLabel = 'Inadequate Performance';
  let ratingColor = 'text-[#D64545] bg-[#D64545]/10 border-[#D64545]/30';
  let description =
    'The filter element is failing to capture gaseous trace contaminants. Replacement or carbon media overhaul recommended.';

  if (efficiency >= 80) {
    ratingLabel = 'Superior Extraction';
    ratingColor = 'text-[#22A06B] bg-[#22A06B]/10 border-[#22A06B]/30';
    description =
      'High-grade active chemical scrubbing confirmed. The purifier or kitchen chimney is successfully removing airborne corrosive load.';
  } else if (efficiency >= 50) {
    ratingLabel = 'Moderate Extraction';
    ratingColor = 'text-[#E3A008] bg-[#E3A008]/10 border-[#E3A008]/30';
    description =
      'Fair gas filtration performance. Filter scrubbing efficiency is acceptable but may need cleaning soon.';
  }

  return (
    <div className="airlit-card p-6 sm:p-8 space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D9E2EC] pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-[#087F8C] uppercase tracking-wider">
            MODULE B: AIR PURIFIER AUDITOR
          </span>
          <h2 className="text-2xl font-extrabold text-[#102A43] font-heading mt-0.5">
            Filter Efficiency Auditor
          </h2>
          <p className="text-xs text-[#52606D] mt-0.5">
            Audit domestic air purifiers or kitchen chimneys by calculating relative chemical load reduction.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-[#F5F8F8] border border-[#D9E2EC] text-right">
          <span className="text-[10px] text-[#829AB1] font-mono block">MATH FORMULA</span>
          <span className="text-xs font-mono text-[#087F8C] font-bold">
            ((Room - Filtered) / Room) × 100
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Input Form Block */}
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
              Ambient Room CADI Score
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={roomCADI}
              onChange={(e) => setRoomCADI(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#D9E2EC] text-[#102A43] font-mono text-base focus:outline-none focus:border-[#087F8C]"
              placeholder="e.g. 68"
            />
            <span className="text-[11px] text-[#829AB1] mt-1 block">
              Baseline ambient room CADI score prior to filtration.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
              Filtered Air Exhaust CADI Score
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={filteredCADI}
              onChange={(e) => setFilteredCADI(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#D9E2EC] text-[#102A43] font-mono text-base focus:outline-none focus:border-[#087F8C]"
              placeholder="e.g. 12"
            />
            <span className="text-[11px] text-[#829AB1] mt-1 block">
              Measured directly at the output nozzle of the air purifier.
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#F5F8F8] border border-[#D9E2EC] text-xs text-[#52606D]">
            💡 <strong className="text-[#102A43]">Note:</strong> HEPA filters capture solid dust, whereas activated carbon media absorbs gaseous SO₂ & VOCs.
          </div>
        </div>

        {/* Efficiency Result Graphic */}
        <div className="p-6 rounded-2xl bg-[#F5F8F8] border border-[#D9E2EC] text-center space-y-6">
          <h3 className="text-xs font-mono font-bold text-[#829AB1] uppercase tracking-widest">
            FILTER EFFICIENCY
          </h3>

          <div className="relative flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border-8 border-[#D9E2EC] flex items-center justify-center relative overflow-hidden bg-white shadow-inner">
              <div
                className="absolute bottom-0 w-full bg-[#087F8C]/20 transition-all duration-500"
                style={{ height: `${efficiency}%` }}
              />
              <div className="flex flex-col items-center relative z-10">
                <span className="text-4xl font-black font-heading text-[#102A43]">
                  {efficiency}%
                </span>
                <span className="text-[10px] font-bold text-[#087F8C] uppercase font-mono mt-0.5">
                  Trace Extracted
                </span>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${ratingColor} text-center space-y-1`}>
            <div className="text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
              <Award className="w-4 h-4" />
              {ratingLabel}
            </div>
            <p className="text-[11px] text-[#52606D] leading-relaxed">
              Chemical trace load reduced by {efficiency}%. {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
