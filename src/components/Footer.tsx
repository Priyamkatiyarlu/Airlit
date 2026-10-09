'use client';

import React from 'react';
import { Cpu, Gauge, Filter, Map, BookOpen } from 'lucide-react';
import { AirlitLogo } from './AirlitLogo';

interface FooterProps {
  onNavigateTab: (
    tab: 'home' | 'dashboard' | 'map' | 'science',
    sectionId?: string
  ) => void;
  onOpenHardwareModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenHardwareModal }) => {
  return (
    <footer className="border-t border-[#D9E2EC] bg-white text-[#52606D] py-10 lg:py-12 px-4 sm:px-6 lg:px-10 mt-0">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
        {/* Column 1: Brand Info */}
        <div className="lg:col-span-4 space-y-4">
          <AirlitLogo size="md" showTagline={true} />

          <p className="text-xs text-[#52606D] leading-relaxed max-w-sm">
            AIRLIT scales down complex laboratory wet-scrubbing instrumentation into an accessible citizen-science platform to trap gaseous pollution, map acidification hazards, and audit air purifiers.
          </p>
        </div>

        {/* Column 2: Platform Sections */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-xs font-mono font-bold text-[#102A43] uppercase tracking-wider">
            Platform Sections
          </h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li>
              <button
                onClick={() => onNavigateTab('home')}
                className="hover:text-[#087F8C] transition-colors flex items-center gap-1.5"
              >
                Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('home', 'how-it-works')}
                className="hover:text-[#087F8C] transition-colors text-left"
              >
                How It Works (4-Step Guide)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('home', 'science')}
                className="hover:text-[#087F8C] transition-colors text-left"
              >
                The Science Behind AIRLIT
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('home', 'analyzer')}
                className="hover:text-[#087F8C] transition-colors text-left"
              >
                AIRLIT Analyzer Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('home', 'insights')}
                className="hover:text-[#087F8C] transition-colors text-left"
              >
                Key Environmental Insights
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Analyzer & Tools */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-xs font-mono font-bold text-[#102A43] uppercase tracking-wider">
            Analyzer & Tools
          </h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li>
              <button
                onClick={() => onNavigateTab('dashboard')}
                className="hover:text-[#087F8C] transition-colors flex items-center gap-1.5"
              >
                <Gauge className="w-3.5 h-3.5 text-[#087F8C]" />
                CADI Calculator
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('map')}
                className="hover:text-[#087F8C] transition-colors flex items-center gap-1.5"
              >
                <Map className="w-3.5 h-3.5 text-[#087F8C]" />
                Environmental Map & Data Ledger
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('home', 'science')}
                className="hover:text-[#087F8C] transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#087F8C]" />
                Scientific Foundations Guide
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Hardware & Protocol Specs */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="text-xs font-mono font-bold text-[#102A43] uppercase tracking-wider">
            Specs & Assembly
          </h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li>
              <button
                onClick={onOpenHardwareModal}
                className="hover:text-[#087F8C] transition-colors flex items-center gap-1.5 text-left font-semibold text-[#087F8C]"
              >
                <Cpu className="w-3.5 h-3.5 shrink-0" />
                Hardware Guide
              </button>
            </li>
            <li>
              <span className="text-[#627D98] cursor-default">
                AAP Equilibrium Math
              </span>
            </li>
            <li>
              <span className="text-[#627D98] cursor-default">
                Time-Lock Protocol
              </span>
            </li>
          </ul>

          <div className="pt-3 text-[11px] text-[#829AB1] font-mono leading-tight">
            AIRLIT Intelligence &copy; 2026. Open Access.
          </div>
        </div>
      </div>
    </footer>
  );
};
