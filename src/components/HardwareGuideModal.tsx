'use client';

import React from 'react';
import { X, Cpu, FlaskConical, Droplets, Zap, Sliders, ShieldCheck, ArrowRight, Settings } from 'lucide-react';

interface HardwareGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 3D Glossy Molecule SVG Icons matching reference mockup
const SO2MoleculeIcon = () => (
  <svg className="w-12 h-10 overflow-visible shrink-0" viewBox="0 0 50 40">
    <defs>
      <radialGradient id="redSphere" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FF7777" />
        <stop offset="40%" stopColor="#E53E3E" />
        <stop offset="100%" stopColor="#801818" />
      </radialGradient>
      <radialGradient id="yellowSphere" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FFF785" />
        <stop offset="40%" stopColor="#D99B00" />
        <stop offset="100%" stopColor="#8A6000" />
      </radialGradient>
    </defs>
    <circle cx="12" cy="22" r="9" fill="url(#redSphere)" />
    <circle cx="38" cy="22" r="9" fill="url(#redSphere)" />
    <circle cx="25" cy="15" r="11" fill="url(#yellowSphere)" />
  </svg>
);

const NO2MoleculeIcon = () => (
  <svg className="w-12 h-10 overflow-visible shrink-0" viewBox="0 0 50 40">
    <defs>
      <radialGradient id="redSphereNO2" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FF7777" />
        <stop offset="40%" stopColor="#E53E3E" />
        <stop offset="100%" stopColor="#801818" />
      </radialGradient>
      <radialGradient id="darkRedSphere" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#D64545" />
        <stop offset="40%" stopColor="#9B1C1C" />
        <stop offset="100%" stopColor="#4A0E0E" />
      </radialGradient>
    </defs>
    <circle cx="12" cy="22" r="9" fill="url(#redSphereNO2)" />
    <circle cx="38" cy="22" r="9" fill="url(#redSphereNO2)" />
    <circle cx="25" cy="15" r="11" fill="url(#darkRedSphere)" />
  </svg>
);

const NH3MoleculeIcon = () => (
  <svg className="w-12 h-10 overflow-visible shrink-0" viewBox="0 0 50 40">
    <defs>
      <radialGradient id="blueSphereNH3" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#79B8FF" />
        <stop offset="40%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#1E3A8A" />
      </radialGradient>
      <radialGradient id="whiteSphereNH3" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="60%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#94A3B8" />
      </radialGradient>
    </defs>
    <circle cx="10" cy="25" r="7" fill="url(#whiteSphereNH3)" />
    <circle cx="40" cy="25" r="7" fill="url(#whiteSphereNH3)" />
    <circle cx="25" cy="29" r="7" fill="url(#whiteSphereNH3)" />
    <circle cx="25" cy="15" r="11.5" fill="url(#blueSphereNH3)" />
  </svg>
);

export const HardwareGuideModal: React.FC<HardwareGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-[#102A43]/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border-0 sm:border border-[#D9E2EC] rounded-none sm:rounded-2xl max-w-full sm:max-w-4xl w-full h-full sm:h-auto max-h-full sm:max-h-[96vh] overflow-y-auto sm:overflow-hidden p-4 sm:p-5 space-y-3 sm:space-y-3.5 shadow-2xl relative flex flex-col justify-between sm:block">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-3 border-b border-[#D9E2EC]/70 pb-2.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#087F8C]/15 border border-[#087F8C]/20 flex items-center justify-center text-[#087F8C] shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#102A43] font-heading tracking-tight leading-none">
                AIRLIT Hardware &amp; Chemical Specs
              </h3>
              <p className="text-xs text-[#52606D] font-medium mt-1">
                Liquid wet-scrubbing gas trap assembly and chemical reaction dynamics.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F5F8F8] border border-[#D9E2EC] flex items-center justify-center text-[#52606D] hover:text-[#102A43] hover:bg-[#EEF8F8] hover:border-[#087F8C]/40 transition-all shadow-xs shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section 1: Chemical Reaction Dynamics Box */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
          <h4 className="text-[11px] font-mono font-bold text-[#087F8C] uppercase tracking-wider flex items-center gap-1.5">
            <FlaskConical className="w-3.5 h-3.5 text-[#087F8C]" />
            LIQUID GAS SCRUBBING CHEMICAL REACTIONS
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
            {/* Sulfur Dioxide SO2 */}
            <div className="p-2.5 sm:p-3 rounded-lg bg-[#FFF5F5] border border-[#FED7D7] space-y-2 flex flex-col justify-between">
              <div className="flex items-center gap-2.5">
                <SO2MoleculeIcon />
                <div className="font-bold text-[#C53030] text-xs sm:text-sm leading-tight">
                  Sulfur Dioxide (SO₂)
                </div>
              </div>

              <div className="bg-white rounded-md p-1.5 border border-[#FEB2B2]/60 font-mono text-[10px] sm:text-[11px] text-[#2D3748] text-center font-semibold shadow-2xs">
                SO₂ + H₂O → H₂SO₃ → H⁺ + HSO₃⁻
              </div>

              <p className="text-[10px] sm:text-[11px] text-[#742A2A] leading-snug">
                Forms Sulfurous Acid. Red indicator shift + TDS jump.
              </p>
            </div>

            {/* Nitrogen Dioxide NO2 */}
            <div className="p-2.5 sm:p-3 rounded-lg bg-[#FFF5F5] border border-[#FED7D7] space-y-2 flex flex-col justify-between">
              <div className="flex items-center gap-2.5">
                <NO2MoleculeIcon />
                <div className="font-bold text-[#C53030] text-xs sm:text-sm leading-tight">
                  Nitrogen Dioxide (NO₂)
                </div>
              </div>

              <div className="bg-white rounded-md p-1.5 border border-[#FEB2B2]/60 font-mono text-[10px] sm:text-[11px] text-[#2D3748] text-center font-semibold shadow-2xs">
                2NO₂ + H₂O → HNO₂ + HNO₃
              </div>

              <p className="text-[10px] sm:text-[11px] text-[#742A2A] leading-snug">
                Forms Nitric Acid. Red indicator shift + ionic conductivity.
              </p>
            </div>

            {/* Ammonia NH3 */}
            <div className="p-2.5 sm:p-3 rounded-lg bg-[#F0F7FF] border border-[#BAE6FD] space-y-2 flex flex-col justify-between">
              <div className="flex items-center gap-2.5">
                <NH3MoleculeIcon />
                <div className="font-bold text-[#2B6CB0] text-xs sm:text-sm leading-tight">
                  Ammonia Gas (NH₃)
                </div>
              </div>

              <div className="bg-white rounded-md p-1.5 border border-[#90CDF4]/60 font-mono text-[10px] sm:text-[11px] text-[#2D3748] text-center font-semibold shadow-2xs">
                NH₃ + H₂O → NH₄⁺ + OH⁻
              </div>

              <p className="text-[10px] sm:text-[11px] text-[#2C5282] leading-snug">
                Forms Ammonium Hydroxide. Blue indicator shift.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Bill of Materials & Hardware Specs Grid */}
        <div className="space-y-2">
          <h4 className="text-[11px] font-mono font-bold text-[#102A43] uppercase tracking-wider flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5 text-[#087F8C]" />
            MATERIALS &amp; HARDWARE SPECS
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Card 1: 220V AC Air Pump */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-[#EFF8F8] border border-[#CCECEB] flex items-center gap-3 transition-all hover:shadow-xs">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-white p-1.5 border border-[#BCE3E5] flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                <img
                  src="/air-pump-card1.png"
                  alt="220V AC Air Pump"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-bold text-[#087F8C] font-heading flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#087F8C] shrink-0" /> 220V AC Air Pump
                </div>
                <p className="text-[11px] text-[#52606D] leading-tight">
                  Dual diaphragm motor delivering 3.5 L/min air flow through the liquid trap column.
                </p>
              </div>
            </div>

            {/* Card 2: Ceramic Air Stone */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center gap-3 transition-all hover:shadow-xs">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-white p-1.5 border border-[#90CDF4] flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                <img
                  src="/stoneimage.png"
                  alt="Ceramic Air Stone"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-bold text-[#2563EB] font-heading flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-[#2563EB] shrink-0" /> Ceramic Air Stone
                </div>
                <p className="text-[11px] text-[#52606D] leading-tight">
                  High-density micro-porous bubbler producing &lt; 0.5mm bubbles to maximize gas-liquid contact.
                </p>
              </div>
            </div>

            {/* Card 3: Handheld TDS-3 Meter */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-[#FFFDF0] border border-[#FEF08A] flex items-center gap-3 transition-all hover:shadow-xs">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-white p-1.5 border border-[#FDE047] flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                <img
                  src="/tdsmeter.png"
                  alt="Handheld TDS-3 Meter"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-bold text-[#D99B00] font-heading flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#D99B00] shrink-0" /> Handheld TDS-3 Meter
                </div>
                <p className="text-[11px] text-[#52606D] leading-tight">
                  Titanium probe electrical conductivity sensor with automatic temperature compensation (ATC).
                </p>
              </div>
            </div>

            {/* Card 4: Indicator Paper Strips */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-[#FFF5F5] border border-[#FED7D7] flex items-center gap-3 transition-all hover:shadow-xs">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-white p-1.5 border border-[#FEB2B2] flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                <img
                  src="/indicatorstrips.png"
                  alt="Indicator Paper Strips"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-bold text-[#D64545] font-heading flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D64545] shrink-0" /> Indicator Paper Strips
                </div>
                <p className="text-[11px] text-[#52606D] leading-tight">
                  Universal paper strips tuned to distinct color endpoints (🔴 Red, 🟡 Yellow, 🔵 Blue).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="pt-2 border-t border-[#D9E2EC] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#087F8C] hover:bg-[#06646E] text-white font-bold text-xs font-heading flex items-center gap-1.5 transition-all shadow-xs transform hover:-translate-y-0.5"
          >
            Close Specs Guide <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
