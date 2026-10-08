'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { CadiCalculator } from '@/components/CadiCalculator';
import { MapView } from '@/components/MapView';
import { DataLedger } from '@/components/DataLedger';
import { HardwareGuideModal } from '@/components/HardwareGuideModal';
import { Footer } from '@/components/Footer';
import { CadiTestLog } from '@/types';
import { initialSeedLogs } from '@/lib/initialData';
import {
  Gauge,
  ArrowRight,
  ShieldAlert,
  Droplets,
  Layers,
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard' | 'map' | 'science'>('home');
  const [isHardwareModalOpen, setIsHardwareModalOpen] = useState<boolean>(false);
  const [logs, setLogs] = useState<CadiTestLog[]>(initialSeedLogs);

  // Fetch initial logs from API on mount
  useEffect(() => {
    async function fetchLogs() {
      try {
        const res = await fetch('/api/logs');
        const data = await res.json();
        if (data.success && data.logs && data.logs.length > 0) {
          setLogs(data.logs);
        }
      } catch (err) {
        console.warn('Using client fallback seed logs:', err);
      }
    }
    fetchLogs();
  }, []);

  const handleLogSubmitted = (newLog: CadiTestLog) => {
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleResetSeed = async () => {
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        const fetchRes = await fetch('/api/logs');
        const fetchData = await fetchRes.json();
        if (fetchData.logs) {
          setLogs(fetchData.logs);
        }
      }
    } catch (err) {
      setLogs(initialSeedLogs);
    }
  };

  const handleNavigateTab = (
    tab: 'home' | 'dashboard' | 'map' | 'science',
    sectionId?: string
  ) => {
    setActiveTab(tab);
    setTimeout(() => {
      if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (tab === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 80);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8F8] text-[#102A43] font-sans">
      {/* Sticky Top Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNavigateTab={handleNavigateTab}
        onOpenHardwareModal={() => setIsHardwareModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* TAB 1: HOME (Landing Page & Operational Guide) */}
        {activeTab === 'home' && (
          <div className="w-full">
            {/* Full-bleed edge-to-edge Hero Banner */}
            <HeroSection
              onLaunchDashboard={() => {
                setActiveTab('dashboard');
              }}
              onExploreHowItWorks={() => {
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenHardwareModal={() => setIsHardwareModalOpen(true)}
            />
          </div>
        )}

        {/* TAB 2: DASHBOARD (App Engine) */}
        {activeTab === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
            <CadiCalculator
              onLogSubmitted={handleLogSubmitted}
              onViewOnMap={() => setActiveTab('map')}
            />
          </div>
        )}

        {/* TAB 3: LIVE MAP & LEDGER */}
        {activeTab === 'map' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#087F8C] uppercase tracking-wider">
                PUBLIC MONITORING NETWORK
              </span>
              <h1 className="text-3xl font-extrabold text-[#102A43] font-heading">
                Environmental Map & Data Ledger
              </h1>
              <p className="text-sm text-[#52606D]">
                Explore crowdsourced environmental test pins style-coded by CADI severity score and verified by GPS displacement logic.
              </p>
            </div>

            <MapView logs={logs} />
            <DataLedger logs={logs} onResetSeed={handleResetSeed} />
          </div>
        )}

        {/* TAB 4: INNOVATION GUIDE */}
        {activeTab === 'science' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs font-mono font-bold text-[#087F8C] uppercase tracking-wider">
                SCIENTIFIC FOUNDATIONS
              </span>
              <h1 className="text-3xl font-extrabold text-[#102A43] font-heading">
                The Science of AIRLIT Liquid Scrubbing
              </h1>
              <p className="text-sm text-[#52606D]">
                Understanding Atmospheric Acidification Potential (AAP) and why physical chemical equilibrium outperforms optical dust sensors.
              </p>
            </div>

            <div className="space-y-6 text-[#52606D] text-sm leading-relaxed">
              <div className="airlit-card p-8 space-y-3">
                <h3 className="text-xl font-bold text-[#102A43] font-heading flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-[#D64545]" />
                  1. The AQI Gaseous Blind Spot
                </h3>
                <p>
                  Most consumer AQI monitors utilize optical light-scattering diodes (PM2.5 / PM10) to count physical dust particles. However, industrial acid precursor gases like <strong>Sulfur Dioxide (SO₂)</strong> and <strong>Nitrogen Dioxide (NO₂)</strong> pass straight through laser chambers completely undetected.
                </p>
                <p>
                  AIRLIT forces ambient air through a 220V AC high-volume liquid bubble trap column containing pure distilled water, effectively capturing water-soluble acidic and basic gas molecules in liquid solution.
                </p>
              </div>

              <div className="airlit-card p-8 space-y-3">
                <h3 className="text-xl font-bold text-[#102A43] font-heading flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-[#087F8C]" />
                  2. Chemical Endpoints: Zero-Calibration Math
                </h3>
                <p>
                  By measuring both initial distilled water baseline TDS and final post-scrubbing TDS, AIRLIT eliminates background noise from minor water impurities. The differential TDS delta (Δ TDS = TDS_final - TDS_initial) isolates the exact mass of dissolved gas ions added during the 20-minute test.
                </p>
                <p>
                  Paired with universal indicator paper strip color shifts (🔴 Red for Acidic SO₂/NO₂, 🔵 Blue for Alkaline NH₃, 🟡 Yellow for Neutral), the CADI algorithm produces a 0–100 atmospheric degradation score.
                </p>
              </div>

              <div className="airlit-card p-8 space-y-3">
                <h3 className="text-xl font-bold text-[#102A43] font-heading flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#E3A008]" />
                  3. Geospatial Time-Lock Security Protocol
                </h3>
                <p>
                  To prevent fraudulent upload of environmental readings, AIRLIT records initial coordinates at test start (Location_A) and final submission coordinates (Location_B).
                </p>
                <p>
                  If geographical displacement is under 100 meters, the test is verified as live (solid pin). If displacement exceeds 100 meters, the system forces manual district selection and flags the record as an off-site historical log (dashed pin).
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Hardware Specifications Modal */}
      <HardwareGuideModal
        isOpen={isHardwareModalOpen}
        onClose={() => setIsHardwareModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        onNavigateTab={handleNavigateTab}
        onOpenHardwareModal={() => setIsHardwareModalOpen(true)}
      />
    </div>
  );
}
