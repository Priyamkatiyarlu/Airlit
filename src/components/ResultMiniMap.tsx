'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { CadiTestLog } from '@/types';

const ResultMiniMapInner = dynamic(
  () => import('./ResultMiniMapInner').then((mod) => mod.ResultMiniMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="h-[220px] w-full rounded-xl bg-[#F5F8F8] border border-[#D9E2EC] flex flex-col items-center justify-center gap-2 text-[#087F8C] font-mono text-xs">
        <div className="w-6 h-6 rounded-full border-2 border-[#087F8C] border-t-transparent animate-spin" />
        <span>Loading OpenStreetMap Tile Engine...</span>
      </div>
    ),
  }
);

interface ResultMiniMapProps {
  logs: CadiTestLog[];
  searchQuery?: string;
  filterLevel?: string;
}

export const ResultMiniMap: React.FC<ResultMiniMapProps> = ({
  logs,
  searchQuery,
  filterLevel,
}) => {
  return (
    <ResultMiniMapInner
      logs={logs}
      searchQuery={searchQuery}
      filterLevel={filterLevel}
    />
  );
};
