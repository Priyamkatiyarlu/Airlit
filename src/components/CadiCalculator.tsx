'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Clock,
  Play,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Droplets,
  Zap,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  RotateCcw,
  FileText,
  BarChart3,
  Wind,
  FlaskConical,
  ChevronRight,
  Search,
  Filter,
  Plus,
  Minus,
} from 'lucide-react';
import { PhColor, LocationCoords, CadiTestLog } from '@/types';
import { initialSeedLogs } from '@/lib/initialData';
import { ResultMiniMap } from './ResultMiniMap';
import {
  calculateCADI,
  calculateHaversineDistance,
  CadiCalculationResult,
} from '@/lib/cadiEngine';

interface CadiCalculatorProps {
  onLogSubmitted: (newLog: CadiTestLog) => void;
  onViewOnMap?: () => void;
}

const DISTRICT_OPTIONS = [
  'Kanpur Industrial Belt, UP',
  'Central Delhi (Connaught Place), DL',
  'Chembur Refinery & Port, Mumbai, MH',
  'Howrah Railway & Dock Area, Kolkata, WB',
  'Whitefield Industrial Area, Bengaluru, KA',
  'Solang Valley, Manali, HP (Baseline)',
  'Kothrud Residential Zone, Pune, MH',
  'Visakhapatnam Steel & Port Zone, AP',
  'Peenya Industrial Area, Bengaluru, KA',
  'Manali Industrial Corridor, Chennai, TN',
];

export const CadiCalculator: React.FC<CadiCalculatorProps> = ({
  onLogSubmitted,
  onViewOnMap,
}) => {
  // Test State: 'idle' | 'running' | 'completed' | 'result'
  const [testState, setTestState] = useState<'idle' | 'running' | 'completed' | 'result'>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(1200); // 20 minutes = 1200 seconds
  const [isFastMode, setIsFastMode] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Form Inputs
  const [locationA, setLocationA] = useState<LocationCoords | null>(null);
  const [locationB, setLocationB] = useState<LocationCoords | null>(null);
  const [phColor, setPhColor] = useState<PhColor | null>(null);
  const [initialTDS, setInitialTDS] = useState<string>('120');
  const [finalTDS, setFinalTDS] = useState<string>('128');
  const [manualDistrict, setManualDistrict] = useState<string>(DISTRICT_OPTIONS[0]);
  const [notes, setNotes] = useState<string>('');

  // Location Verification state
  const [isGettingLocation, setIsGettingLocation] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedLog, setSubmittedLog] = useState<CadiTestLog | null>(null);
  const [lastResult, setLastResult] = useState<CadiCalculationResult | null>(null);
  const [showDisplacementModal, setShowDisplacementModal] = useState<boolean>(false);
  const [displacementDistance, setDisplacementDistance] = useState<number>(0);

  // Result Interactive Controls
  const [miniMapSearch, setMiniMapSearch] = useState<string>('');
  const [miniMapFilter, setMiniMapFilter] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Computed Real-time Calculation
  const parsedInit = parseFloat(initialTDS) || 0;
  const parsedFinal = parseFloat(finalTDS) || 0;

  // Cleanup Timer
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Timer Tick Logic
  useEffect(() => {
    if (testState === 'running') {
      const intervalMs = isFastMode ? 50 : 1000;
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setTestState('completed');
            return 0;
          }
          return prev - 1;
        });
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testState, isFastMode]);

  // GPS Helper
  const getCurrentGPS = (): Promise<LocationCoords> => {
    return new Promise((resolve) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              accuracy: pos.coords.accuracy,
            });
          },
          () => {
            resolve({
              lat: 28.6139 + (Math.random() - 0.5) * 0.01,
              lng: 77.209 + (Math.random() - 0.5) * 0.01,
              accuracy: 15,
            });
          },
          { timeout: 5000, enableHighAccuracy: true }
        );
      } else {
        resolve({ lat: 28.6139, lng: 77.209, accuracy: 20 });
      }
    });
  };

  // Action: Start 20-Minute Test
  const handleStartTest = async () => {
    setIsGettingLocation(true);
    setShowDisplacementModal(false);

    try {
      const gpsA = await getCurrentGPS();
      setLocationA(gpsA);
      setTimeLeft(isFastMode ? 5 : 1200);
      setTestState('running');
    } finally {
      setIsGettingLocation(false);
    }
  };

  // Action: Submit Data & Run Time-Lock Check
  const handleSubmitData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phColor) return;
    const startLoc = locationA || { lat: 28.6139, lng: 77.209 };

    setIsSubmitting(true);
    try {
      const gpsB = await getCurrentGPS();
      setLocationB(gpsB);

      const dist = calculateHaversineDistance(startLoc, gpsB);
      setDisplacementDistance(dist);

      const isVerified = dist < 100;
      if (!isVerified) {
        setShowDisplacementModal(true);
      }

      const res = await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationA: startLoc,
          locationB: gpsB,
          manualDistrict,
          phColor,
          initialTDS: parsedInit,
          finalTDS: parsedFinal,
          notes,
        }),
      });

      const data = await res.json();
      if (data.success && data.log) {
        onLogSubmitted(data.log);
        setSubmittedLog(data.log);

        const calcRes = calculateCADI(phColor, parsedInit, parsedFinal);
        setLastResult(calcRes);
        setTestState('result');

        confetti({
          particleCount: 75,
          spread: 65,
          origin: { y: 0.6 },
          colors: ['#087F8C', '#18B7B0', '#22A06B', '#E3A008', '#E76F00'],
        });
      }
    } catch (err) {
      console.error('Submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetTest = () => {
    setTestState('idle');
    setPhColor(null);
    setSubmittedLog(null);
    setLastResult(null);
    setShowDisplacementModal(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTimer = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Semi-Circle Arc SVG Math for Score Gauge
  const getArcPoint = (angleDeg: number, radius = 70, cx = 90, cy = 90) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(angleRad),
      y: cy - radius * Math.sin(angleRad),
    };
  };

  return (
    <div className="space-y-6 max-w-[1280px] mx-auto pb-12">
      {/* Top Title & Test Mode Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] font-heading tracking-tight">
            Chemical Air Degradation Index
          </h1>
          <p className="text-sm text-[#52606D] mt-1 font-medium">
            Measure chemical loading in the surrounding atmosphere via liquid wet-scrubbing.
          </p>
        </div>

        {/* Test Mode Selector Button */}
        <button
          onClick={() => setIsFastMode(!isFastMode)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#D9E2EC] shadow-xs text-xs font-semibold text-[#102A43] hover:bg-[#F5F8F8] transition-all"
        >
          <FlaskConical className="w-4 h-4 text-[#087F8C]" />
          <span>Test Mode: <strong>{isFastMode ? '5s Countdown' : '20m Real'}</strong></span>
        </button>
      </div>

      {/* Pipeline Steps Header Bar */}
      <div className="bg-[#F4F8FA] border border-[#D9E2EC] rounded-2xl p-2.5 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center">
          {/* Step 1 */}
          <div className="flex items-center justify-between">
            <div
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold font-heading transition-all ${
                testState === 'idle'
                  ? 'bg-[#087F8C] text-white shadow-sm'
                  : 'bg-white text-[#52606D] border border-[#D9E2EC]/60'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${testState === 'idle' ? 'bg-white text-[#087F8C]' : 'bg-[#E2E8F0] text-[#52606D]'}`}>
                1
              </span>
              <span>Start Test</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#9FB3C8] mx-1 hidden sm:block shrink-0" />
          </div>

          {/* Step 2 */}
          <div className="flex items-center justify-between">
            <div
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold font-heading transition-all ${
                testState === 'running'
                  ? 'bg-[#087F8C] text-white shadow-sm'
                  : 'bg-white text-[#52606D] border border-[#D9E2EC]/60'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${testState === 'running' ? 'bg-white text-[#087F8C]' : 'bg-[#E2E8F0] text-[#52606D]'}`}>
                2
              </span>
              <span>Scrub Atmosphere</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#9FB3C8] mx-1 hidden sm:block shrink-0" />
          </div>

          {/* Step 3 */}
          <div className="flex items-center justify-between">
            <div
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold font-heading transition-all ${
                testState === 'completed'
                  ? 'bg-[#087F8C] text-white shadow-sm'
                  : 'bg-white text-[#52606D] border border-[#D9E2EC]/60'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${testState === 'completed' ? 'bg-white text-[#087F8C]' : 'bg-[#E2E8F0] text-[#52606D]'}`}>
                3
              </span>
              <span>Read Endpoints</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#9FB3C8] mx-1 hidden sm:block shrink-0" />
          </div>

          {/* Step 4 */}
          <div className="flex items-center">
            <div
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold font-heading transition-all ${
                testState === 'result'
                  ? 'bg-[#087F8C] text-white shadow-sm'
                  : 'bg-white text-[#52606D] border border-[#D9E2EC]/60'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${testState === 'result' ? 'bg-white text-[#087F8C]' : 'bg-[#E2E8F0] text-[#52606D]'}`}>
                4
              </span>
              <span>Submit & View Result</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Form Section (State A: Idle / State B: Running / State C: Completed) */}
      {testState !== 'result' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Timer Card & Endpoints Card */}
          <div className="lg:col-span-7 space-y-6">
            {/* Timer Card */}
            <div className="bg-white rounded-2xl p-6 border border-[#D9E2EC] shadow-xs space-y-5">
              <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider text-[#087F8C] uppercase">
                <span>
                  {testState === 'running'
                    ? 'AIR SCRUBBING IN PROGRESS'
                    : testState === 'completed'
                    ? 'TEST SCRUBBING COMPLETED'
                    : 'READY TO START TEST'}
                </span>
                <span className="text-[#829AB1] flex items-center gap-1 font-normal">
                  <Clock className="w-3.5 h-3.5" /> 20-Minute Cycle
                </span>
              </div>

              {/* Digital Countdown Box */}
              <div className="py-6 px-4 rounded-2xl bg-[#EBF7F7]/60 border border-[#18B7B0]/20 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#087F8C]/15 text-[#087F8C] mx-auto flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="text-5xl font-black font-heading tracking-tight text-[#102A43]">
                  {formattedTimer}
                </div>
                <p className="text-xs text-[#52606D] font-medium">
                  {testState === 'running'
                    ? 'Keep AC pump active. Dissolving gaseous emissions into distilled H₂O...'
                    : testState === 'completed'
                    ? 'Scrubbing cycle complete. Please select indicator strip color below.'
                    : 'Test duration: 20 minutes. Location will be recorded automatically.'}
                </p>
              </div>

              {/* Start Test Button */}
              {testState === 'idle' && (
                <button
                  type="button"
                  onClick={handleStartTest}
                  disabled={isGettingLocation}
                  className="w-full py-4 rounded-xl bg-[#087F8C] hover:bg-[#06646E] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <Play className="w-4 h-4 fill-white" />
                  {isGettingLocation ? 'Capturing GPS...' : 'START 20-MINUTE TEST'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Endpoints Form Card */}
            <div
              className={`bg-white rounded-2xl p-6 border border-[#D9E2EC] shadow-xs space-y-6 transition-all ${
                testState === 'running' ? 'opacity-50 pointer-events-none' : 'opacity-100'
              }`}
            >
              <div className="border-b border-[#D9E2EC]/70 pb-3 space-y-1">
                <h3 className="text-base font-bold text-[#102A43] font-heading flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-[#087F8C]" />
                  Physical Chemical Endpoints
                </h3>
                <p className="text-xs text-[#52606D]">
                  Check indicator color shift strip and log handheld TDS-3 meter values.
                </p>
              </div>

              {/* Indicator Paper Color Shift */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-[#102A43] font-heading uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#087F8C]" />
                  Indicator Paper Color Shift
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* RED */}
                  <button
                    type="button"
                    onClick={() => setPhColor('red')}
                    className={`p-3.5 rounded-xl border-2 flex items-center gap-3 transition-all text-left ${
                      phColor === 'red'
                        ? 'border-[#D64545] bg-[#D64545]/10 shadow-xs'
                        : 'border-[#D9E2EC] bg-[#FFF5F5]/40 hover:border-[#D64545]/50'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${phColor === 'red' ? 'border-[#D64545] bg-[#D64545]' : 'border-[#D9E2EC] bg-white'}`}>
                      {phColor === 'red' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#D64545] text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-xs font-heading">
                      RED
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#102A43]">Acidic (+50 Pts)</div>
                      <div className="text-[10px] text-[#52606D]">SO₂ / NOₓ Hazard</div>
                    </div>
                  </button>

                  {/* YELLOW */}
                  <button
                    type="button"
                    onClick={() => setPhColor('yellow')}
                    className={`p-3.5 rounded-xl border-2 flex items-center gap-3 transition-all text-left ${
                      phColor === 'yellow'
                        ? 'border-[#E3A008] bg-[#E3A008]/10 shadow-xs'
                        : 'border-[#D9E2EC] bg-[#FFFDF5]/40 hover:border-[#E3A008]/50'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${phColor === 'yellow' ? 'border-[#E3A008] bg-[#E3A008]' : 'border-[#D9E2EC] bg-white'}`}>
                      {phColor === 'yellow' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#E3A008] text-[#102A43] font-bold text-[10px] flex items-center justify-center shrink-0 shadow-xs font-heading">
                      YEL
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#102A43]">Neutral (+0 Pts)</div>
                      <div className="text-[10px] text-[#52606D]">Clean Baseline</div>
                    </div>
                  </button>

                  {/* BLUE */}
                  <button
                    type="button"
                    onClick={() => setPhColor('blue')}
                    className={`p-3.5 rounded-xl border-2 flex items-center gap-3 transition-all text-left ${
                      phColor === 'blue'
                        ? 'border-[#2563EB] bg-[#2563EB]/10 shadow-xs'
                        : 'border-[#D9E2EC] bg-[#F5F8FF]/40 hover:border-[#2563EB]/50'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${phColor === 'blue' ? 'border-[#2563EB] bg-[#2563EB]' : 'border-[#D9E2EC] bg-white'}`}>
                      {phColor === 'blue' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#2563EB] text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-xs font-heading">
                      BLUE
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#102A43]">Basic (+25 Pts)</div>
                      <div className="text-[10px] text-[#52606D]">NH₃ / Alkaline</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* TDS Numeric Inputs & Form */}
              <form onSubmit={handleSubmitData} className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                      Initial TDS (ppm)
                    </label>
                    <div className="relative">
                      <Droplets className="w-4 h-4 text-[#087F8C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={initialTDS}
                        onChange={(e) => setInitialTDS(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#D9E2EC] text-[#102A43] text-sm font-mono focus:outline-none focus:border-[#087F8C]"
                        placeholder="120"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                      Final TDS (ppm)
                    </label>
                    <div className="relative">
                      <Droplets className="w-4 h-4 text-[#087F8C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={finalTDS}
                        onChange={(e) => setFinalTDS(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#D9E2EC] text-[#102A43] text-sm font-mono focus:outline-none focus:border-[#087F8C]"
                        placeholder="128"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Field Notes */}
                <div>
                  <label className="block text-xs font-semibold text-[#102A43] mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#52606D]" />
                    Field Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D9E2EC] text-[#102A43] text-xs focus:outline-none focus:border-[#087F8C]"
                    placeholder="Location details, nearby industrial activity..."
                  />
                </div>

                {/* Submit Data Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !phColor || testState === 'running'}
                  className={`w-full py-4 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all ${
                    !phColor || testState === 'running'
                      ? 'bg-[#E2E8F0] text-[#829AB1] cursor-not-allowed'
                      : 'bg-[#087F8C] hover:bg-[#06646E] text-white transform hover:-translate-y-0.5'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  {isSubmitting ? 'Computing CADI & Verifying Location...' : 'SUBMIT DATA'}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Test Steps Guide & Banner Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Test Steps Card */}
            <div className="bg-white rounded-2xl p-6 border border-[#D9E2EC] shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#102A43] font-heading border-b border-[#D9E2EC]/70 pb-3">
                Test Steps
              </h3>

              <div className="space-y-4 text-xs">
                {/* Step 1 */}
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#EEF8F8] text-[#087F8C] font-bold text-xs flex items-center justify-center shrink-0 font-heading border border-[#087F8C]/20">
                    1
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-[#F5F8F8] border border-[#D9E2EC] flex items-center justify-center text-[#087F8C] shrink-0">
                    <Play className="w-3.5 h-3.5 fill-[#087F8C]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#102A43]">Start Test</div>
                    <div className="text-[#52606D] mt-0.5">Begin 20-minute air scrubbing cycle.</div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#EEF8F8] text-[#087F8C] font-bold text-xs flex items-center justify-center shrink-0 font-heading border border-[#087F8C]/20">
                    2
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-[#F5F8F8] border border-[#D9E2EC] flex items-center justify-center text-[#087F8C] shrink-0">
                    <Wind className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-[#102A43]">Scrub Atmosphere</div>
                    <div className="text-[#52606D] mt-0.5">Keep 220V pump running for 20 minutes.</div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#EEF8F8] text-[#087F8C] font-bold text-xs flex items-center justify-center shrink-0 font-heading border border-[#087F8C]/20">
                    3
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-[#F5F8F8] border border-[#D9E2EC] flex items-center justify-center text-[#087F8C] shrink-0">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-[#102A43]">Read Endpoints</div>
                    <div className="text-[#52606D] mt-0.5">Select color strip & enter TDS readings.</div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#EEF8F8] text-[#087F8C] font-bold text-xs flex items-center justify-center shrink-0 font-heading border border-[#087F8C]/20">
                    4
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-[#F5F8F8] border border-[#D9E2EC] flex items-center justify-center text-[#087F8C] shrink-0">
                    <BarChart3 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-[#102A43]">Submit & View Result</div>
                    <div className="text-[#52606D] mt-0.5">Get CADI score and pin on public map.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Banner Card: Measurable Insights for Cleaner Air */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#E8F5F5] via-[#E2F2F3] to-[#D5EDEE] border border-[#BCE3E5] p-6 shadow-xs min-h-[260px] flex flex-col justify-between">
              <div className="space-y-2 max-w-[55%] z-10">
                <h3 className="text-xl font-extrabold text-[#102A43] font-heading leading-tight">
                  Measurable Insights for <br />
                  <span className="text-[#087F8C]">Cleaner Air</span>
                </h3>

                <p className="text-xs text-[#52606D] leading-relaxed">
                  A dual-phase environmental kit designed to trap invisible industrial gases and help you understand your surroundings.
                </p>
              </div>

              {/* Product Photo graphic */}
              <div className="absolute right-2 bottom-2 w-[45%] max-w-[200px] z-10 pointer-events-none">
                <img
                  src="/step-2.png"
                  alt="AIRLIT Hardware Bubbler Device"
                  className="w-full h-auto object-contain drop-shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STATE D: OVERHAULED CADI RESULT SCREEN MATCHING DESIGN MOCKUP & BRAND GUIDE */}
      {testState === 'result' && lastResult && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Result Card Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D9E2EC] shadow-sm space-y-6">
            {/* Header Action Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D9E2EC]/70 pb-5">
              <div>
                <span className="text-xs font-mono font-bold text-[#087F8C] uppercase tracking-wider">
                  TEST EVALUATION COMPLETE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] font-heading tracking-tight mt-0.5">
                  CADI Test Result
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleResetTest}
                  className="px-5 py-2.5 rounded-xl bg-white border-2 border-[#D9E2EC] hover:border-[#087F8C]/40 text-[#102A43] text-xs font-bold font-heading flex items-center gap-2 transition-all shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#087F8C]" /> RUN NEW TEST
                </button>

                {onViewOnMap && (
                  <button
                    onClick={onViewOnMap}
                    className="px-6 py-2.5 rounded-xl bg-[#087F8C] hover:bg-[#06646E] text-white text-xs font-bold font-heading flex items-center gap-2 transition-all shadow-sm transform hover:-translate-y-0.5"
                  >
                    <MapPin className="w-4 h-4" /> VIEW ON MAP
                  </button>
                )}
              </div>
            </div>

            {/* Top Grid: Semi-Arc Score Gauge (Left) & Test Summary Table (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Semi-Arc Score Gauge Box */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-[#F8FAFC] border border-[#D9E2EC] flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* SVG Semi-Circle Arc Gauge */}
                <div className="flex flex-col items-center justify-center shrink-0 space-y-3">
                  <div className="relative w-48 h-28 flex items-end justify-center">
                    <svg className="w-48 h-48 overflow-visible" viewBox="0 0 180 110">
                      <defs>
                        <linearGradient id="cadiArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#22A06B" />
                          <stop offset="35%" stopColor="#E3A008" />
                          <stop offset="68%" stopColor="#E76F00" />
                          <stop offset="100%" stopColor="#D64545" />
                        </linearGradient>
                      </defs>

                      {/* Gray Background Arc */}
                      <path
                        d="M 20 90 A 70 70 0 0 1 160 90"
                        fill="none"
                        stroke="#E2E8F0"
                        strokeWidth="16"
                        strokeLinecap="round"
                      />

                      {/* Colored Progress Arc */}
                      <path
                        d="M 20 90 A 70 70 0 0 1 160 90"
                        fill="none"
                        stroke="url(#cadiArcGradient)"
                        strokeWidth="16"
                        strokeLinecap="round"
                        strokeDasharray={220}
                        strokeDashoffset={220 - (220 * Math.min(lastResult.cadiScore, 100)) / 100}
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>

                    {/* Score Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-1 pointer-events-none">
                      <span className="text-4xl font-black font-heading text-[#102A43] leading-none">
                        {lastResult.cadiScore}
                      </span>
                      <span className="text-xs font-bold text-[#829AB1] mt-0.5 uppercase">/100</span>
                    </div>
                  </div>

                  {/* Status Badge Pill */}
                  <div className="text-center space-y-1 pt-1">
                    <span
                      className="text-xs font-extrabold font-heading uppercase px-4 py-1.5 rounded-full inline-block tracking-wider"
                      style={{
                        backgroundColor: `${lastResult.hazardColor}15`,
                        color: lastResult.hazardColor,
                        border: `1.5px solid ${lastResult.hazardColor}40`,
                      }}
                    >
                      {lastResult.hazardLevel}
                    </span>
                    <p className="text-[11px] text-[#52606D] max-w-[200px] leading-tight">
                      Your environment shows a {lastResult.hazardLevel.toLowerCase()} level.
                    </p>
                  </div>
                </div>

                {/* Right Scale Indicator Rows inside Left Box */}
                <div className="w-full sm:w-auto space-y-3 border-t sm:border-t-0 sm:border-l border-[#D9E2EC] pt-4 sm:pt-0 sm:pl-6 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#22A06B] shrink-0" />
                    <div>
                      <span className="font-bold text-[#102A43] font-mono">0 – 25</span>
                      <div className="text-[#52606D] text-[11px]">Clean Atmosphere</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#E3A008] shrink-0" />
                    <div>
                      <span className="font-bold text-[#102A43] font-mono">26 – 50</span>
                      <div className="text-[#52606D] text-[11px]">Moderate Chemical Loading</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#E76F00] shrink-0" />
                    <div>
                      <span className="font-bold text-[#102A43] font-mono">51 – 75</span>
                      <div className="text-[#52606D] text-[11px]">High Chemical Load</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#D64545] shrink-0" />
                    <div>
                      <span className="font-bold text-[#102A43] font-mono">76 – 100</span>
                      <div className="text-[#52606D] text-[11px]">Severe Acidification Hazard</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Test Summary Table Box */}
              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-base font-bold text-[#102A43] font-heading border-b border-[#D9E2EC]/70 pb-2">
                  Test Summary
                </h3>

                <div className="divide-y divide-[#D9E2EC]/70 text-xs font-medium bg-white rounded-xl border border-[#D9E2EC] shadow-2xs">
                  {/* Row 1: Indicator Colour */}
                  <div className="p-3.5 flex items-center justify-between">
                    <span className="text-[#52606D] flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-[#087F8C]" /> Indicator Colour:
                    </span>
                    <span className="font-bold text-[#102A43] flex items-center gap-1.5">
                      <span
                        className={`w-3 h-3 rounded-full inline-block ${
                          phColor === 'red' ? 'bg-[#D64545]' : phColor === 'blue' ? 'bg-[#2563EB]' : 'bg-[#E3A008]'
                        }`}
                      />
                      {phColor === 'red' ? 'Red (Acidic)' : phColor === 'blue' ? 'Blue (Basic)' : 'Yellow (Neutral)'}
                    </span>
                  </div>

                  {/* Row 2: Initial TDS */}
                  <div className="p-3.5 flex items-center justify-between">
                    <span className="text-[#52606D] flex items-center gap-2">
                      <FlaskConical className="w-4 h-4 text-[#087F8C]" /> Initial TDS:
                    </span>
                    <span className="font-bold text-[#102A43] font-mono">{parsedInit} ppm</span>
                  </div>

                  {/* Row 3: Final TDS */}
                  <div className="p-3.5 flex items-center justify-between">
                    <span className="text-[#52606D] flex items-center gap-2">
                      <FlaskConical className="w-4 h-4 text-[#087F8C]" /> Final TDS:
                    </span>
                    <span className="font-bold text-[#102A43] font-mono">{parsedFinal} ppm</span>
                  </div>

                  {/* Row 4: TDS Change */}
                  <div className="p-3.5 flex items-center justify-between">
                    <span className="text-[#52606D] flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-[#087F8C]" /> TDS Change:
                    </span>
                    <span className="font-bold text-[#087F8C] font-mono text-sm">+{lastResult.tdsDelta} ppm</span>
                  </div>

                  {/* Row 5: Location Verification */}
                  <div className="p-3.5 flex items-center justify-between">
                    <span className="text-[#52606D] flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#087F8C]" /> Location Verification:
                    </span>
                    <span>
                      {submittedLog?.verified ? (
                        <span className="text-[#22A06B] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Verified
                        </span>
                      ) : (
                        <span className="text-[#E3A008] font-bold flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" /> Off-Site
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Grid: 3 Analytical Dashboard Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Widget 1: Interactive Mini Environmental Map */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#D9E2EC] shadow-xs space-y-4 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2 border-b border-[#D9E2EC]/70 pb-3">
                <h3 className="text-sm font-bold text-[#102A43] font-heading flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#087F8C]" />
                  Environmental Map
                </h3>

                <div className="flex items-center gap-2">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-[#829AB1] absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={miniMapSearch}
                      onChange={(e) => setMiniMapSearch(e.target.value)}
                      placeholder="Search district..."
                      className="pl-8 pr-2 py-1 rounded-lg bg-[#F5F8F8] border border-[#D9E2EC] text-[11px] text-[#102A43] w-28 focus:outline-none focus:border-[#087F8C]"
                    />
                  </div>

                  {/* Filter Dropdown */}
                  <select
                    value={miniMapFilter}
                    onChange={(e) => setMiniMapFilter(e.target.value)}
                    className="px-2 py-1 rounded-lg bg-[#F5F8F8] border border-[#D9E2EC] text-[11px] text-[#102A43] focus:outline-none"
                  >
                    <option value="all">CADI Levels</option>
                    <option value="high">High & Severe</option>
                    <option value="clean">Clean</option>
                  </select>
                </div>
              </div>

              {/* Mini Map Canvas Box */}
              <div className="relative rounded-xl overflow-hidden border border-[#D9E2EC] bg-[#EBF4F6] min-h-[220px] flex items-center justify-center">
                <ResultMiniMap
                  logs={initialSeedLogs}
                  searchQuery={miniMapSearch}
                  filterLevel={miniMapFilter}
                />
              </div>
            </div>

            {/* Widget 2: Dynamic TDS Reading Trend Line Chart */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-[#D9E2EC] shadow-xs space-y-4 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-[#D9E2EC]/70 pb-3">
                <h3 className="text-sm font-bold text-[#102A43] font-heading flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#087F8C]" />
                  TDS Reading Trend
                </h3>
                <div className="flex items-center gap-3 text-[10px] font-semibold">
                  <span className="flex items-center gap-1 text-[#2563EB]">
                    <span className="w-2 h-2 rounded-full bg-[#2563EB]" /> Initial TDS
                  </span>
                  <span className="flex items-center gap-1 text-[#087F8C]">
                    <span className="w-2 h-2 rounded-full bg-[#087F8C]" /> Final TDS
                  </span>
                </div>
              </div>

              {/* Dynamic SVG Trend Line Chart */}
              <div className="relative pt-6 pb-2 px-1">
                <svg className="w-full h-36 overflow-visible" viewBox="0 0 240 100">
                  {/* Grid Lines */}
                  <line x1="20" y1="20" x2="230" y2="20" stroke="#E2E8F0" strokeDasharray="3 3" />
                  <line x1="20" y1="50" x2="230" y2="50" stroke="#E2E8F0" strokeDasharray="3 3" />
                  <line x1="20" y1="80" x2="230" y2="80" stroke="#E2E8F0" strokeDasharray="3 3" />

                  {/* Initial TDS Flat Line (Blue) */}
                  <line x1="25" y1="65" x2="225" y2="65" stroke="#2563EB" strokeWidth="2.5" />
                  <circle cx="25" cy="65" r="4" fill="#2563EB" />
                  <circle cx="75" cy="65" r="4" fill="#2563EB" />
                  <circle cx="125" cy="65" r="4" fill="#2563EB" />
                  <circle cx="175" cy="65" r="4" fill="#2563EB" />
                  <circle cx="225" cy="65" r="4" fill="#2563EB" />

                  {/* Final TDS Curve Line (Teal) */}
                  <path
                    d="M 25 65 Q 125 50 225 32"
                    fill="none"
                    stroke="#087F8C"
                    strokeWidth="3"
                  />
                  <circle cx="25" cy="65" r="4" fill="#087F8C" />
                  <circle cx="75" cy="56" r="4" fill="#087F8C" />
                  <circle cx="125" cy="48" r="4" fill="#087F8C" />
                  <circle cx="175" cy="40" r="4" fill="#087F8C" />
                  <circle cx="225" cy="32" r="5" fill="#087F8C" stroke="#FFFFFF" strokeWidth="2" />

                  {/* Floating Tooltip Callout at 20 min mark */}
                  <g transform="translate(170, 0)">
                    <rect x="0" y="0" width="65" height="24" rx="6" fill="#FFFFFF" stroke="#087F8C" strokeWidth="1" />
                    <text x="32" y="11" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#102A43">
                      {parsedFinal} ppm
                    </text>
                    <text x="32" y="20" textAnchor="middle" fontSize="7" fill="#52606D">
                      Final TDS
                    </text>
                  </g>
                </svg>

                {/* X Axis Time Labels */}
                <div className="flex justify-between text-[10px] text-[#52606D] font-mono px-2 pt-2">
                  <span>0 min</span>
                  <span>5 min</span>
                  <span>10 min</span>
                  <span>15 min</span>
                  <span>20 min</span>
                </div>
              </div>
            </div>

            {/* Widget 3: CADI Classification Scale Card */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-[#D9E2EC] shadow-xs space-y-4 flex flex-col justify-between">
              <h3 className="text-sm font-bold text-[#102A43] font-heading border-b border-[#D9E2EC]/70 pb-3">
                CADI Classification
              </h3>

              <div className="space-y-2.5 text-xs">
                {/* 0-25 Clean */}
                <div className="p-2.5 rounded-xl bg-[#22A06B]/10 border border-[#22A06B]/30 flex items-center justify-between">
                  <span className="font-extrabold font-mono px-2.5 py-0.5 rounded-md bg-[#22A06B] text-white text-[11px]">
                    0 – 25
                  </span>
                  <span className="text-[11px] font-bold text-[#102A43]">Clean Atmosphere</span>
                </div>

                {/* 26-50 Moderate */}
                <div className="p-2.5 rounded-xl bg-[#E3A008]/10 border border-[#E3A008]/30 flex items-center justify-between">
                  <span className="font-black font-mono px-2.5 py-0.5 rounded-md bg-[#D99B00] text-white text-[11px] shadow-2xs">
                    26 – 50
                  </span>
                  <span className="text-[11px] font-bold text-[#102A43]">Moderate Loading</span>
                </div>

                {/* 51-75 High */}
                <div className="p-2.5 rounded-xl bg-[#E76F00]/10 border border-[#E76F00]/30 flex items-center justify-between">
                  <span className="font-extrabold font-mono px-2.5 py-0.5 rounded-md bg-[#E76F00] text-white text-[11px]">
                    51 – 75
                  </span>
                  <span className="text-[11px] font-bold text-[#102A43]">High Chemical Load</span>
                </div>

                {/* 76-100 Severe */}
                <div className="p-2.5 rounded-xl bg-[#D64545]/10 border border-[#D64545]/30 flex items-center justify-between">
                  <span className="font-extrabold font-mono px-2.5 py-0.5 rounded-md bg-[#D64545] text-white text-[11px]">
                    76 – 100
                  </span>
                  <span className="text-[11px] font-bold text-[#102A43]">Severe Acidification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location Verification Modal (>100m displacement) */}
      {showDisplacementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#102A43]/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-5 border border-[#D9E2EC] shadow-2xl">
            <div className="flex items-center gap-2.5 text-[#E3A008] font-bold text-base font-heading">
              <ShieldAlert className="w-6 h-6 shrink-0" />
              LOCATION VERIFICATION
            </div>

            <div className="space-y-2 text-xs text-[#52606D] leading-relaxed">
              <p className="font-semibold text-[#102A43]">Location changed during test</p>
              <p>
                The submission location is more than 100m ({displacementDistance}m) from the test start location. Automatic GPS coordinates will not be used for the public map pin.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#102A43]">
                SELECT TEST LOCATION
              </label>
              <select
                value={manualDistrict}
                onChange={(e) => setManualDistrict(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#D9E2EC] text-[#102A43] text-xs font-mono focus:outline-none focus:border-[#087F8C]"
              >
                {DISTRICT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowDisplacementModal(false)}
              className="w-full py-3 rounded-xl bg-[#087F8C] hover:bg-[#06646E] text-white font-bold text-xs shadow-sm transition-all"
            >
              CONFIRM LOCATION
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
