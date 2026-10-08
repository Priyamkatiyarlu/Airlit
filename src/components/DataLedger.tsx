'use client';

import React, { useState } from 'react';
import { CadiTestLog } from '@/types';
import { Download, Search, ShieldCheck, ShieldAlert, RefreshCw } from 'lucide-react';

interface DataLedgerProps {
  logs: CadiTestLog[];
  onResetSeed: () => void;
}

export const DataLedger: React.FC<DataLedgerProps> = ({ logs, onResetSeed }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'unverified'>('all');
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const filtered = logs.filter((log) => {
    if (statusFilter === 'verified' && !log.verified) return false;
    if (statusFilter === 'unverified' && log.verified) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        log.district.toLowerCase().includes(q) ||
        log.hazardLevel.toLowerCase().includes(q) ||
        log.phColor.toLowerCase().includes(q) ||
        (log.notes || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Timestamp',
      'District Location',
      'CADI Score',
      'Hazard Level',
      'pH Shift Color',
      'Initial TDS (ppm)',
      'Final TDS (ppm)',
      'TDS Delta (ppm)',
      'GPS Displacement (m)',
      'Verification Status',
      'Notes',
    ];

    const rows = filtered.map((log) => [
      `"${log.id}"`,
      `"${new Date(log.timestamp).toLocaleString()}"`,
      `"${log.district.replace(/"/g, '""')}"`,
      log.cadiScore,
      `"${log.hazardLevel}"`,
      `"${log.phColor}"`,
      log.initialTDS,
      log.finalTDS,
      log.tdsDelta,
      log.distanceMeters,
      log.verified ? 'Verified (Real-Time)' : 'Unverified (Off-Site)',
      `"${(log.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `airlit_public_ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = async () => {
    setIsResetting(true);
    try {
      await onResetSeed();
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="airlit-card p-6 sm:p-8 space-y-6">
      {/* Header & CSV Download */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D9E2EC] pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-[#087F8C] uppercase tracking-wider">
            ENVIRONMENTAL DATABASE
          </span>
          <h2 className="text-2xl font-extrabold text-[#102A43] font-heading mt-0.5">
            Public Data Ledger
          </h2>
          <p className="text-xs text-[#52606D] mt-0.5">
            Searchable log of crowdsourced environmental test uploads and verification statuses.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleReset}
            disabled={isResetting}
            className="px-3.5 py-2 rounded-xl bg-[#F5F8F8] hover:bg-[#E2E8F0] border border-[#D9E2EC] text-[#102A43] text-xs font-mono font-semibold flex items-center gap-2 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
            Seed Baseline
          </button>

          <button
            onClick={handleExportCSV}
            className="px-5 py-2.5 rounded-xl bg-[#087F8C] hover:bg-[#06646E] text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4" />
            DOWNLOAD CSV
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#829AB1] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search district or city..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#D9E2EC] text-xs text-[#102A43] placeholder-[#829AB1] focus:outline-none focus:border-[#087F8C] font-mono"
          />
        </div>

        <div className="flex items-center gap-1 bg-[#F5F8F8] p-1 rounded-xl border border-[#D9E2EC] text-xs font-mono">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === 'all'
                ? 'bg-white text-[#102A43] font-bold shadow-sm'
                : 'text-[#52606D] hover:text-[#102A43]'
            }`}
          >
            All ({logs.length})
          </button>
          <button
            onClick={() => setStatusFilter('verified')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              statusFilter === 'verified'
                ? 'bg-[#22A06B]/15 text-[#22A06B] font-bold border border-[#22A06B]/30'
                : 'text-[#52606D] hover:text-[#102A43]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Verified
          </button>
          <button
            onClick={() => setStatusFilter('unverified')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              statusFilter === 'unverified'
                ? 'bg-[#E3A008]/15 text-[#E3A008] font-bold border border-[#E3A008]/30'
                : 'text-[#52606D] hover:text-[#102A43]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" /> Unverified
          </button>
        </div>
      </div>

      {/* Desktop Datatable (hidden on small mobile screens) */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-[#D9E2EC] bg-white">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#F5F8F8] border-b border-[#D9E2EC] text-[#52606D] font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">District</th>
              <th className="py-3 px-4 text-center">pH Shift</th>
              <th className="py-3 px-4 text-center">TDS Delta</th>
              <th className="py-3 px-4 text-center">CADI Score</th>
              <th className="py-3 px-4">Verification Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D9E2EC] text-[#102A43]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-[#829AB1] italic font-sans">
                  No matching test records found.
                </td>
              </tr>
            ) : (
              filtered.map((log) => (
                <tr key={log.id} className="hover:bg-[#F5F8F8] transition-colors">
                  <td className="py-3 px-4 text-[#52606D] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#102A43]">
                    {log.district}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.phColor === 'red'
                          ? 'bg-[#D64545]/15 text-[#D64545]'
                          : log.phColor === 'blue'
                          ? 'bg-[#2563EB]/15 text-[#2563EB]'
                          : 'bg-[#E3A008]/15 text-[#E3A008]'
                      }`}
                    >
                      {log.phColor.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-[#087F8C]">
                    +{log.tdsDelta} ppm
                  </td>
                  <td className="py-3 px-4 text-center font-extrabold text-sm" style={{ color: log.hazardColor }}>
                    {log.cadiScore}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {log.verified ? (
                      <span className="inline-flex items-center gap-1 text-[#22A06B] font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" /> ✓ Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[#E3A008] font-bold">
                        <ShieldAlert className="w-3.5 h-3.5" /> ⚠ Unverified
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Data Cards (<768px viewports) */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 ? (
          <div className="py-8 text-center text-[#829AB1] italic font-sans text-xs">
            No matching test records found.
          </div>
        ) : (
          filtered.map((log) => (
            <div key={log.id} className="p-4 rounded-xl border border-[#D9E2EC] bg-white space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-[#D9E2EC] pb-2">
                <span className="font-bold text-[#102A43] font-heading">{log.district}</span>
                <span className="font-extrabold font-heading text-sm" style={{ color: log.hazardColor }}>
                  {log.cadiScore} / 100
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#52606D]">
                <div>Date: {new Date(log.timestamp).toLocaleDateString()}</div>
                <div>pH: <strong className="uppercase">{log.phColor}</strong></div>
                <div>TDS Δ: <strong>+{log.tdsDelta} ppm</strong></div>
                <div>
                  Status:{' '}
                  <strong className={log.verified ? 'text-[#22A06B]' : 'text-[#E3A008]'}>
                    {log.verified ? '✓ Verified' : '⚠ Unverified'}
                  </strong>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
