'use client';

import React, { useState } from 'react';
import { ArrowRight, Cpu, Menu, X } from 'lucide-react';
import { AirlitLogo } from './AirlitLogo';

interface NavbarProps {
  activeTab: 'home' | 'dashboard' | 'map' | 'science';
  setActiveTab: (tab: 'home' | 'dashboard' | 'map' | 'science') => void;
  onOpenHardwareModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenHardwareModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'home' | 'dashboard' | 'map' | 'science', sectionId?: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#D9E2EC] shadow-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center group text-left focus:outline-none"
        >
          <AirlitLogo size="md" showTagline={true} />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavClick('home')}
            className={`text-sm font-semibold transition-colors py-1 ${
              activeTab === 'home'
                ? 'text-[#087F8C] font-bold border-b-2 border-[#087F8C]'
                : 'text-[#52606D] hover:text-[#102A43]'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('home', 'how-it-works')}
            className="text-sm font-semibold text-[#52606D] hover:text-[#102A43] transition-colors py-1"
          >
            How It Works
          </button>

          <button
            onClick={() => handleNavClick('science')}
            className={`text-sm font-semibold transition-colors py-1 ${
              activeTab === 'science'
                ? 'text-[#087F8C] font-bold border-b-2 border-[#087F8C]'
                : 'text-[#52606D] hover:text-[#102A43]'
            }`}
          >
            Science
          </button>

          <button
            onClick={() => handleNavClick('map')}
            className={`text-sm font-semibold transition-colors py-1 ${
              activeTab === 'map'
                ? 'text-[#087F8C] font-bold border-b-2 border-[#087F8C]'
                : 'text-[#52606D] hover:text-[#102A43]'
            }`}
          >
            Environmental Map
          </button>
        </nav>

        {/* Right CTA & Hardware Specs Icon */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all shadow-sm transform hover:-translate-y-0.5 ${
              activeTab === 'dashboard'
                ? 'bg-[#06646E] text-white ring-2 ring-[#087F8C]/40'
                : 'bg-[#087F8C] hover:bg-[#06646E] text-white'
            }`}
          >
            ANALYZE <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenHardwareModal}
            className="w-10 h-10 rounded-full bg-[#F5F8F8] border border-[#D9E2EC] flex items-center justify-center text-[#087F8C] hover:bg-[#EEF8F8] hover:border-[#087F8C]/40 transition-all shadow-xs"
            title="Hardware Kit Specifications & Assembly"
          >
            <Cpu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => handleNavClick('dashboard')}
            className="px-3.5 py-1.5 rounded-lg bg-[#087F8C] text-white font-semibold text-xs flex items-center gap-1"
          >
            ANALYZE <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#102A43] hover:bg-[#F5F8F8]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#D9E2EC] bg-white px-4 py-4 space-y-3 shadow-md">
          <button
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-semibold ${
              activeTab === 'home' ? 'bg-[#087F8C]/10 text-[#087F8C]' : 'text-[#102A43]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('home', 'how-it-works')}
            className="block w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-[#102A43]"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('science')}
            className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-semibold ${
              activeTab === 'science' ? 'bg-[#087F8C]/10 text-[#087F8C]' : 'text-[#102A43]'
            }`}
          >
            Science
          </button>
          <button
            onClick={() => handleNavClick('map')}
            className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-semibold ${
              activeTab === 'map' ? 'bg-[#087F8C]/10 text-[#087F8C]' : 'text-[#102A43]'
            }`}
          >
            Environmental Map
          </button>
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-semibold ${
              activeTab === 'dashboard' ? 'bg-[#087F8C]/10 text-[#087F8C]' : 'text-[#102A43]'
            }`}
          >
            Analyzer Dashboard
          </button>
        </div>
      )}
    </header>
  );
};
