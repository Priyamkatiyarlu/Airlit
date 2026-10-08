'use client';

import React from 'react';
import { X, Cpu, FlaskConical, Droplets, Wind, ShieldCheck, Zap, Sliders } from 'lucide-react';

interface HardwareGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HardwareGuideModal: React.FC<HardwareGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#102A43]/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-[#D9E2EC] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-[#F5F8F8] hover:bg-[#E2E8F0] text-[#52606D] hover:text-[#102A43] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#087F8C]/10 flex items-center justify-center text-[#087F8C]">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#102A43] font-heading">
              AIRLIT Hardware & Chemical Specs
            </h3>
            <p className="text-xs text-[#52606D]">
              Liquid wet-scrubbing gas trap assembly and chemical reaction dynamics.
            </p>
          </div>
        </div>

        {/* Section 1: Chemical Reaction Dynamics */}
        <div className="p-5 rounded-2xl bg-[#F5F8F8] border border-[#D9E2EC] space-y-3">
          <h4 className="text-xs font-mono font-bold text-[#087F8C] uppercase tracking-wider flex items-center gap-2">
            <FlaskConical className="w-4 h-4" />
            Liquid Gas Scrubbing Chemical Reactions
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-white border border-[#D9E2EC]">
              <div className="font-bold text-[#D64545]">Sulfur Dioxide (SO₂)</div>
              <div className="font-mono text-[10px] text-[#102A43] mt-1">
                SO₂ + H₂O → H₂SO₃ → H⁺ + HSO₃⁻
              </div>
              <div className="text-[10px] text-[#52606D] mt-1">
                Forms Sulfurous Acid. Red indicator shift + TDS jump.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#D9E2EC]">
              <div className="font-bold text-[#D64545]">Nitrogen Dioxide (NO₂)</div>
              <div className="font-mono text-[10px] text-[#102A43] mt-1">
                2NO₂ + H₂O → HNO₂ + HNO₃
              </div>
              <div className="text-[10px] text-[#52606D] mt-1">
                Forms Nitric Acid. Red indicator shift + ionic conductivity.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#D9E2EC]">
              <div className="font-bold text-[#2563EB]">Ammonia Gas (NH₃)</div>
              <div className="font-mono text-[10px] text-[#102A43] mt-1">
                NH₃ + H₂O → NH₄⁺ + OH⁻
              </div>
              <div className="text-[10px] text-[#52606D] mt-1">
                Forms Ammonium Hydroxide. Blue indicator shift.
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Bill of Materials */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold text-[#102A43] uppercase tracking-wider">
            Bill of Materials & Hardware Specs
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-[#F5F8F8] border border-[#D9E2EC] space-y-1">
              <div className="text-[#087F8C] font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" /> 220V AC Air Pump
              </div>
              <p className="text-[#52606D] text-[11px] font-sans">
                Dual diaphragm motor delivering 3.5 L/min air flow through the liquid trap column.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F5F8F8] border border-[#D9E2EC] space-y-1">
              <div className="text-[#2563EB] font-bold flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5" /> Ceramic Air Stone
              </div>
              <p className="text-[#52606D] text-[11px] font-sans">
                High-density micro-porous bubbler producing &lt; 0.5mm bubbles to maximize gas-liquid contact.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F5F8F8] border border-[#D9E2EC] space-y-1">
              <div className="text-[#E3A008] font-bold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" /> Handheld TDS-3 Meter
              </div>
              <p className="text-[#52606D] text-[11px] font-sans">
                Titanium probe electrical conductivity sensor with automatic temperature compensation (ATC).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F5F8F8] border border-[#D9E2EC] space-y-1">
              <div className="text-[#D64545] font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Indicator Paper Strips
              </div>
              <p className="text-[#52606D] text-[11px] font-sans">
                Universal paper strips tuned to distinct color endpoints (🔴 Red, 🟡 Yellow, 🔵 Blue).
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#D9E2EC] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#087F8C] hover:bg-[#06646E] text-white font-bold text-xs transition-all"
          >
            Close Specs Guide
          </button>
        </div>
      </div>
    </div>
  );
};
