'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { CadiTestLog } from '@/types';

const MapViewInner = dynamic(
  () => import('./MapViewInner').then((mod) => mod.MapViewInner),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] w-full rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center gap-3 text-cyan-400 font-mono text-xs">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
        Loading Live OpenStreetMap Tile Engine & Danger Pin Layer...
      </div>
    ),
  }
);

interface MapViewProps {
  logs: CadiTestLog[];
}

export const MapView: React.FC<MapViewProps> = ({ logs }) => {
  return <MapViewInner logs={logs} />;
};
