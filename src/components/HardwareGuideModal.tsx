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
        <stop offset="100%" stopColor="#9B1C1C" />
      </radialGradient>
      <radialGradient id="yellowSphere" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FFFA80" />
        <stop offset="40%" stopColor="#ECC94B" />
        <stop offset="100%" stopColor="#B7791F" />
      </radialGradient>
    </defs>
    {/* Left Oxygen */}
    <circle cx="12" cy="24" r="9" fill="url(#redSphere)" />
    {/* Right Oxygen */}
    <circle cx="38" cy="24" r="9" fill="url(#redSphere)" />
    {/* Center Sulfur */}
    <circle cx="25" cy="16" r="11" fill="url(#yellowSphere)" />
  </svg>
);

const NO2MoleculeIcon = () => (
  <svg className="w-12 h-10 overflow-visible shrink-0" viewBox="0 0 50 40">
    <defs>
      <radialGradient id="redSphereNO2" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FF7777" />
        <stop offset="40%" stopColor="#E53E3E" />
        <stop offset="100%" stopColor="#9B1C1C" />
      </radialGradient>
      <radialGradient id="darkRedSphere" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#E53E3E" />
        <stop offset="40%" stopColor="#9B1C1C" />
        <stop offset="100%" stopColor="#521B1B" />
      </radialGradient>
    </defs>
    {/* Left Oxygen */}
    <circle cx="12" cy="24" r="9" fill="url(#redSphereNO2)" />
    {/* Right Oxygen */}
    <circle cx="38" cy="24" r="9" fill="url(#redSphereNO2)" />
    {/* Center Nitrogen */}
    <circle cx="25" cy="16" r="10.5" fill="url(#darkRedSphere)" />
  </svg>
);

const NH3MoleculeIcon = () => (
  <svg className="w-12 h-10 overflow-visible shrink-0" viewBox="0 0 50 40">
    <defs>
      <radialGradient id="blueSphereNH3" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#79B8FF" />
        <stop offset="40%" stopColor="#3182CE" />
        <stop offset="100%" stopColor="#1A365D" />
      </radialGradient>
      <radialGradient id="whiteSphereNH3" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#CBD5E0" />
      </radialGradient>
    </defs>
    {/* Hydrogen 1 */}
    <circle cx="10" cy="26" r="7.5" fill="url(#whiteSphereNH3)" />
    {/* Hydrogen 2 */}
    <circle cx="40" cy="26" r="7.5" fill="url(#whiteSphereNH3)" />
    {/* Hydrogen 3 */}
    <circle cx="25" cy="30" r="7.5" fill="url(#whiteSphereNH3)" />
    {/* Center Nitrogen */}
    <circle cx="25" cy="15" r="12" fill="url(#blueSphereNH3)" />
  </svg>
);

export const HardwareGuideModal: React.FC<HardwareGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#102A43]/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-[#D9E2EC] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-4 border-b border-[#D9E2EC]/70 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#087F8C]/15 border border-[#087F8C]/20 flex items-center justify-center text-[#087F8C] shrink-0">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#102A43] font-heading tracking-tight">
                AIRLIT Hardware & Chemical Specs
              </h3>
              <p className="text-xs sm:text-sm text-[#52606D] font-medium mt-0.5">
                Liquid wet-scrubbing gas trap assembly and chemical reaction dynamics.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#F5F8F8] border border-[#D9E2EC] flex items-center justify-center text-[#52606D] hover:text-[#102A43] hover:bg-[#EEF8F8] hover:border-[#087F8C]/40 transition-all shadow-xs shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Chemical Reaction Dynamics Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4">
          <h4 className="text-xs font-mono font-bold text-[#087F8C] uppercase tracking-wider flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-[#087F8C]" />
            LIQUID GAS SCRUBBING CHEMICAL REACTIONS
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Sulfur Dioxide SO2 */}
            <div className="p-4 rounded-xl bg-[#FFF5F5] border border-[#FED7D7] space-y-3 flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <SO2MoleculeIcon />
                <div className="font-bold text-[#C53030] text-sm leading-tight">
                  Sulfur Dioxide (SO₂)
                </div>
              </div>

              <div className="bg-white rounded-lg p-2 border border-[#FEB2B2]/60 font-mono text-[11px] text-[#2D3748] text-center font-semibold shadow-2xs">
                SO₂ + H₂O → H₂SO₃ → H⁺ + HSO₃⁻
              </div>

              <p className="text-[11px] text-[#742A2A] leading-snug">
                Forms Sulfurous Acid. Red indicator shift + TDS jump.
              </p>
            </div>

            {/* Nitrogen Dioxide NO2 */}
            <div className="p-4 rounded-xl bg-[#FFF5F5] border border-[#FED7D7] space-y-3 flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <NO2MoleculeIcon />
                <div className="font-bold text-[#C53030] text-sm leading-tight">
                  Nitrogen Dioxide (NO₂)
                </div>
              </div>

              <div className="bg-white rounded-lg p-2 border border-[#FEB2B2]/60 font-mono text-[11px] text-[#2D3748] text-center font-semibold shadow-2xs">
                2NO₂ + H₂O → HNO₂ + HNO₃
              </div>

              <p className="text-[11px] text-[#742A2A] leading-snug">
                Forms Nitric Acid. Red indicator shift + ionic conductivity.
              </p>
            </div>

            {/* Ammonia NH3 */}
            <div className="p-4 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD] space-y-3 flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <NH3MoleculeIcon />
                <div className="font-bold text-[#2B6CB0] text-sm leading-tight">
                  Ammonia Gas (NH₃)
                </div>
              </div>

              <div className="bg-white rounded-lg p-2 border border-[#90CDF4]/60 font-mono text-[11px] text-[#2D3748] text-center font-semibold shadow-2xs">
                NH₃ + H₂O → NH₄⁺ + OH⁻
              </div>

              <p className="text-[11px] text-[#2C5282] leading-snug">
                Forms Ammonium Hydroxide. Blue indicator shift.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Bill of Materials & Hardware Specs Grid */}
        <div className="space-y-4">
          <h4 className="text-xs font-mono font-bold text-[#102A43] uppercase tracking-wider flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#087F8C]" />
            BILL OF MATERIALS & HARDWARE SPECS
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1: 220V AC Air Pump */}
            <div className="p-4 rounded-2xl bg-[#EFF8F8] border border-[#CCECEB] flex items-center gap-4 transition-all hover:shadow-xs">
              <div className="w-24 h-24 rounded-xl bg-white p-2 border border-[#BCE3E5] flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                <img
                  src="/air-pump.png"
                  alt="220V AC Air Pump"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-1">
                <div className="text-sm font-bold text-[#087F8C] font-heading flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#087F8C]" /> 220V AC Air Pump
                </div>
                <p className="text-xs text-[#52606D] leading-relaxed">
                  Dual diaphragm motor delivering 3.5 L/min air flow through the liquid trap column.
                </p>
              </div>
            </div>

            {/* Card 2: Ceramic Air Stone */}
            <div className="p-4 rounded-2xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center gap-4 transition-all hover:shadow-xs">
              <div className="w-24 h-24 rounded-xl bg-white p-2 border border-[#90CDF4] flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                <img
                  src="/air-stone.png"
                  alt="Ceramic Air Stone"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-1">
                <div className="text-sm font-bold text-[#2563EB] font-heading flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-[#2563EB]" /> Ceramic Air Stone
                </div>
                <p className="text-xs text-[#52606D] leading-relaxed">
                  High-density micro-porous bubbler producing &lt; 0.5mm bubbles to maximize gas-liquid contact.
                </p>
              </div>
            </div>

            {/* Card 3: Handheld TDS-3 Meter */}
            <div className="p-4 rounded-2xl bg-[#FFFDF0] border border-[#FEF08A] flex items-center gap-4 transition-all hover:shadow-xs">
              <div className="w-24 h-24 rounded-xl bg-white p-2 border border-[#FDE047] flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                <img
                  src="/tds-meter.png"
                  alt="Handheld TDS-3 Meter"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-1">
                <div className="text-sm font-bold text-[#D99B00] font-heading flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-[#D99B00]" /> Handheld TDS-3 Meter
                </div>
                <p className="text-xs text-[#52606D] leading-relaxed">
                  Titanium probe electrical conductivity sensor with automatic temperature compensation (ATC).
                </p>
              </div>
            </div>

            {/* Card 4: Indicator Paper Strips */}
            <div className="p-4 rounded-2xl bg-[#FFF5F5] border border-[#FED7D7] flex items-center gap-4 transition-all hover:shadow-xs">
              <div className="w-24 h-24 rounded-xl bg-white p-2 border border-[#FEB2B2] flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                <img
                  src="/paper-strips.png"
                  alt="Indicator Paper Strips"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-1">
                <div className="text-sm font-bold text-[#D64545] font-heading flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#D64545]" /> Indicator Paper Strips
                </div>
                <p className="text-xs text-[#52606D] leading-relaxed">
                  Universal paper strips tuned to distinct color endpoints (🔴 Red, 🟡 Yellow, 🔵 Blue).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="pt-4 border-t border-[#D9E2EC] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-[#087F8C] hover:bg-[#06646E] text-white font-bold text-xs font-heading flex items-center gap-2 transition-all shadow-sm transform hover:-translate-y-0.5"
          >
            Close Specs Guide <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
