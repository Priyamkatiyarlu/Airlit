'use client';

import React from 'react';
import {
  ArrowRight,
  Droplets,
  Wind,
  Sliders,
  Radio,
  ShieldCheck,
  Award,
  Play,
  Zap,
  Monitor,
  Leaf,
  BarChart3,
  Users,
} from 'lucide-react';

interface HeroSectionProps {
  onLaunchDashboard: () => void;
  onExploreHowItWorks: () => void;
  onOpenHardwareModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onLaunchDashboard,
  onExploreHowItWorks,
  onOpenHardwareModal,
}) => {
  return (
    <div className="w-full">
      {/* SECTION 1: Full-Bleed Edge-to-Edge Hero Banner */}
      <section className="relative w-full overflow-hidden min-h-[540px] lg:min-h-[620px] flex items-center border-b border-[#D9E2EC]">
        {/* Full-bleed background image */}
        <div
          className="absolute inset-0 bg-cover bg-right lg:bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url('/hero-bg.jpg')` }}
        />

        {/* Crisp light overlay gradient on the left for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 sm:via-white/90 to-transparent z-10 max-w-4xl" />

        {/* Hero Content Container (Expanded width max-w-[1440px], reduced side padding) */}
        <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* Left Text & Actions */}
          <div className="lg:col-span-7 space-y-6 max-w-2xl">
            <div className="inline-block px-3.5 py-1 rounded-full bg-[#18B7B0]/15 border border-[#18B7B0]/30 text-[#087F8C] text-xs font-bold font-mono tracking-widest uppercase">
              ENVIRONMENTAL INTELLIGENCE
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-[#102A43] font-heading leading-[1.08]">
              Exposing the <br />
              <span className="text-[#087F8C]">Corrosive Air</span> <br />
              Traditional Monitors <br />
              Can't See.
            </h1>

            {/* Subtext with high contrast bold font and legibility backing */}
            <p className="text-base sm:text-lg text-[#102A43] font-medium leading-relaxed drop-shadow-sm">
              A dual-phase environmental kit designed to trap invisible industrial gases, map acid
              deposition hazards, and audit home air purifiers using stable, un-driftable chemistry.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onLaunchDashboard}
                className="px-8 py-4 rounded-xl bg-[#087F8C] hover:bg-[#06646E] text-white font-semibold text-base shadow-md transition-all flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5"
              >
                LAUNCH ANALYZER <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onExploreHowItWorks}
                className="px-8 py-4 rounded-xl bg-white hover:bg-[#F5F8F8] border-2 border-[#087F8C] text-[#087F8C] font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                EXPLORE HOW IT WORKS
              </button>
            </div>
          </div>

          {/* Right Spacer */}
          <div className="hidden lg:block lg:col-span-5 h-full min-h-[400px]" />
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS (Simple Steps. Meaningful Insights.) */}
      <section id="how-it-works" className="w-full bg-gradient-to-r from-[#EEF8F8] via-[#F4FAF9] to-[#EBF6F7] py-10 lg:py-14 border-y border-[#D9E2EC]/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold text-[#087F8C] uppercase tracking-widest">
              HOW IT WORKS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#102A43] font-heading tracking-tight">
              Simple Steps. <span className="text-[#087F8C]">Meaningful Insights.</span>
            </h2>
          </div>

          {/* 4-Step Cards Grid with Naked Arrows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch relative">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs h-full flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-full bg-[#087F8C] text-white font-bold text-sm flex items-center justify-center font-heading">
                    1
                  </div>
                  <div className="py-4 flex items-center justify-center min-h-[210px]">
                    <img
                      src="/step-1.png"
                      alt="Set Baseline"
                      className="max-h-48 w-auto object-contain mx-auto"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#102A43] font-heading">Set Baseline</h3>
                  <p className="text-xs sm:text-sm text-[#52606D] leading-relaxed">
                    Measure fresh distilled water with the TDS meter.
                  </p>
                </div>
              </div>
              {/* Naked Right Arrow (Desktop) */}
              <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-[#102A43] items-center justify-center pointer-events-none">
                <ArrowRight className="w-5 h-5 text-[#102A43]" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs h-full flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-full bg-[#087F8C] text-white font-bold text-sm flex items-center justify-center font-heading">
                    2
                  </div>
                  <div className="py-4 flex items-center justify-center min-h-[210px]">
                    <img
                      src="/step-2.png"
                      alt="Scrub Atmosphere"
                      className="max-h-48 w-auto object-contain mx-auto"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#102A43] font-heading">Scrub Atmosphere</h3>
                  <p className="text-xs sm:text-sm text-[#52606D] leading-relaxed">
                    Run the AC aquarium pump for 20 minutes.
                  </p>
                </div>
              </div>
              {/* Naked Right Arrow (Desktop) */}
              <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-[#102A43] items-center justify-center pointer-events-none">
                <ArrowRight className="w-5 h-5 text-[#102A43]" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs h-full flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-full bg-[#087F8C] text-white font-bold text-sm flex items-center justify-center font-heading">
                    3
                  </div>
                  <div className="py-4 flex items-center justify-center min-h-[210px]">
                    <img
                      src="/indicatorstrips.png"
                      alt="Read Endpoints"
                      className="max-h-48 w-auto object-contain mx-auto"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#102A43] font-heading">Read Endpoints</h3>
                  <p className="text-xs sm:text-sm text-[#52606D] leading-relaxed">
                    Check indicator colour and final TDS.
                  </p>
                </div>
              </div>
              {/* Naked Right Arrow (Desktop) */}
              <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-[#102A43] items-center justify-center pointer-events-none">
                <ArrowRight className="w-5 h-5 text-[#102A43]" />
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs h-full flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-full bg-[#087F8C] text-white font-bold text-sm flex items-center justify-center font-heading">
                    4
                  </div>
                  <div className="py-4 flex items-center justify-center min-h-[210px]">
                    <img
                      src="/step-4.png"
                      alt="Analyze & Map"
                      className="max-h-48 w-auto object-contain mx-auto"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#102A43] font-heading">Analyze & Map</h3>
                  <p className="text-xs sm:text-sm text-[#52606D] leading-relaxed">
                    Submit your results to calculate the score and map the risk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE SCIENCE BEHIND AIRLIT (Appears right after How It Works) */}
      <section id="science" className="w-full bg-gradient-to-r from-[#EEF8F8] via-[#F4FAF9] to-[#EBF6F7] py-10 lg:py-14 border-y border-[#D9E2EC]/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column (Text & CTA) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-mono font-bold text-[#087F8C] uppercase tracking-widest">
                THE SCIENCE BEHIND AIRLIT
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#102A43] font-heading tracking-tight leading-[1.12]">
                Seeing <span className="text-[#087F8C]">Beyond</span> Traditional Air Quality Monitoring
              </h2>

              <p className="text-sm sm:text-base text-[#52606D] leading-relaxed max-w-xl">
                Most air quality monitors measure only particulate matter (PM). AIRLIT addresses the invisible gaseous pollutants by capturing them in distilled water and evaluating the resulting chemical change.
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenHardwareModal}
                  className="px-6 py-3.5 rounded-xl bg-[#087F8C] hover:bg-[#06646E] text-white font-semibold text-sm transition-all inline-flex items-center gap-2.5 shadow-md hover:-translate-y-0.5"
                >
                  Explore the Science <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: 2 Comparison Cards + Arrow */}
            <div className="lg:col-span-7 flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
              {/* Card 1: Traditional AQI Monitoring */}
              <div className="flex-1 w-full bg-white rounded-2xl p-3.5 sm:p-4 border border-[#D9E2EC] shadow-sm space-y-3 flex flex-col justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-sm sm:text-base font-bold text-[#102A43] font-heading">
                    Traditional AQI Monitoring
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#52606D]">
                    Measures particles in the air
                  </p>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-[#D9E2EC]">
                  <img
                    src="/traditional-aqi.jpg"
                    alt="Traditional AQI Monitoring"
                    className="w-full h-48 sm:h-52 object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-[#52606D]/95 backdrop-blur-xs p-2.5 text-[11px] sm:text-[12px] text-white leading-tight font-medium">
                    Shows particulate pollution. Invisible gases remain undetected.
                  </div>
                </div>
              </div>

              {/* Connecting Right Arrow */}
              <div className="shrink-0 text-[#102A43] hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-white border border-[#D9E2EC] shadow-sm">
                <ArrowRight className="w-5 h-5 text-[#102A43]" />
              </div>

              {/* Card 2: AIRLIT Gaseous Detection */}
              <div className="flex-1 w-full bg-white rounded-2xl p-3.5 sm:p-4 border border-[#D9E2EC] shadow-sm space-y-3 flex flex-col justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-sm sm:text-base font-bold text-[#102A43] font-heading">
                    <span className="text-[#087F8C]">AIRLIT</span> Gaseous Detection
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#52606D]">
                    Captures invisible industrial gases
                  </p>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-[#D9E2EC]">
                  <img
                    src="/airlit-gaseous.jpg"
                    alt="AIRLIT Gaseous Detection"
                    className="w-full h-48 sm:h-52 object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-xs p-2.5 text-[11px] sm:text-[12px] text-[#102A43] leading-tight font-medium border-t border-[#D9E2EC]">
                    Traps gases in distilled water and converts the chemical change into measurable endpoints.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: ANALYZER DASHBOARD CTA (Soft tint background + Devices Mockup) */}
      <section id="analyzer" className="w-full bg-gradient-to-r from-[#EEF8F8] via-[#F4FAF9] to-[#EBF6F7] py-10 lg:py-14 border-y border-[#D9E2EC]/50 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-6 space-y-6 max-w-xl">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#18B7B0]/15 text-[#087F8C] text-xs font-bold font-mono tracking-wider uppercase">
              AIRLIT ANALYZER
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#102A43] font-heading tracking-tight leading-[1.12]">
              Upload Your Results. <br />
              <span className="text-[#087F8C]">See the Bigger Picture.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#52606D] leading-relaxed">
              Get instant risk assessment, visualize high-risk areas on the map, and contribute to better air quality insights.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
              <button
                onClick={onLaunchDashboard}
                className="px-7 py-3.5 rounded-xl bg-[#087F8C] hover:bg-[#06646E] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                Try the Analyzer <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onLaunchDashboard}
                className="px-5 py-3.5 text-[#087F8C] hover:text-[#06646E] font-semibold text-sm transition-colors text-center"
              >
                View Sample Results
              </button>
            </div>

            {/* Feature Pills Footer */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#D9E2EC]/70 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#18B7B0]/15 text-[#087F8C] flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#102A43]">Free to use</div>
                  <div className="text-[11px] text-[#52606D]">No login required</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#18B7B0]/15 text-[#087F8C] flex items-center justify-center shrink-0">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#102A43]">Works on any device</div>
                  <div className="text-[11px] text-[#52606D]">Web, tablet or mobile</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#18B7B0]/15 text-[#087F8C] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#102A43]">Your data stays private</div>
                  <div className="text-[11px] text-[#52606D]">We don't store personal data</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Devices Graphic Column */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
            <img
              src="/dashboard-devices.png"
              alt="AIRLIT Analyzer Dashboard Laptop & Mobile Devices"
              className="w-full h-auto max-h-[480px] lg:w-[110%] lg:max-w-none object-contain drop-shadow-xl lg:translate-x-4"
            />
          </div>
        </div>
      </section>

      {/* SECTION 5: KEY INSIGHTS YOU CAN UNLOCK */}
      <section id="insights" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8 py-10 lg:py-14">
        <div className="text-center space-y-3">
          <div className="text-xs font-mono font-bold text-[#087F8C] uppercase tracking-widest">
            KEY INSIGHTS YOU CAN UNLOCK
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] font-heading tracking-tight">
            More Than a Number — Real Insights for a Cleaner Tomorrow
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Insight 1 */}
          <div className="airlit-card p-6 space-y-4 hover:border-[#087F8C]/60 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#22A06B]/15 text-[#22A06B] flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#102A43] font-heading">Identify High-Risk Areas</h3>
              <p className="text-xs text-[#52606D] leading-relaxed">
                See where industrial emissions may be impacting your environment.
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <ArrowRight className="w-4 h-4 text-[#087F8C] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Insight 2 */}
          <div className="airlit-card p-6 space-y-4 hover:border-[#087F8C]/60 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#2563EB]/15 text-[#2563EB] flex items-center justify-center">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#102A43] font-heading">Track Changes Over Time</h3>
              <p className="text-xs text-[#52606D] leading-relaxed">
                Monitor air quality trends in your city, neighbourhood or home.
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <ArrowRight className="w-4 h-4 text-[#087F8C] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Insight 3 */}
          <div className="airlit-card p-6 space-y-4 hover:border-[#087F8C]/60 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#E3A008]/15 text-[#E3A008] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#102A43] font-heading">Take Informed Action</h3>
              <p className="text-xs text-[#52606D] leading-relaxed">
                Use data to make better decisions for your health and environment.
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <ArrowRight className="w-4 h-4 text-[#087F8C] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Insight 4 */}
          <div className="airlit-card p-6 space-y-4 hover:border-[#087F8C]/60 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/15 text-[#8B5CF6] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#102A43] font-heading">Build a Cleaner Community</h3>
              <p className="text-xs text-[#52606D] leading-relaxed">
                Contribute your data and support a safer, healthier future for everyone.
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <ArrowRight className="w-4 h-4 text-[#087F8C] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: BE A PART OF CLEANER AIR (Responsive Full-bleed City River Banner) */}
      <section id="join" className="relative w-full overflow-hidden min-h-[420px] sm:min-h-[360px] lg:min-h-[420px] flex items-center border-t border-[#D9E2EC]">
        {/* Mobile portrait background image (< 640px) */}
        <div
          className="sm:hidden absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url('/cleaner-air-mobile-bg.jpg')` }}
        />

        {/* Desktop widescreen background image (≥ 640px) */}
        <div
          className="hidden sm:block absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url('/cleaner-air-bg.png')` }}
        />

        {/* Centered Content Container */}
        <div className="relative z-20 max-w-3xl mx-auto px-4 text-center py-10 lg:py-14 space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#102A43] font-heading tracking-tight drop-shadow-sm leading-tight">
            Be a Part of Cleaner Air
          </h2>

          <p className="text-base sm:text-lg text-[#102A43] font-medium leading-relaxed drop-shadow-xs max-w-2xl mx-auto">
            Use AIRLIT to analyze, map, and understand the invisible gases in your environment — for a healthier tomorrow.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onLaunchDashboard}
              className="px-8 py-4 rounded-xl bg-[#087F8C] hover:bg-[#06646E] text-white font-semibold text-base shadow-md transition-all flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5"
            >
              Launch Analyzer <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenHardwareModal}
              className="px-8 py-4 rounded-xl bg-white hover:bg-[#F5F8F8] border-2 border-[#087F8C] text-[#087F8C] font-semibold text-base transition-all shadow-sm"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
