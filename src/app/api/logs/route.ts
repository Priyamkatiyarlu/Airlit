import { NextResponse } from 'next/server';
import { getLogsFromStore, addLogToStore } from '@/lib/dbStore';
import { calculateCADI, calculateHaversineDistance } from '@/lib/cadiEngine';
import { CadiTestLog, PhColor } from '@/types';

export async function GET() {
  try {
    const logs = await getLogsFromStore();
    return NextResponse.json({ success: true, logs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      locationA,
      locationB,
      manualDistrict,
      phColor,
      initialTDS,
      finalTDS,
      notes,
    } = body;

    if (!locationA || !phColor || initialTDS === undefined || finalTDS === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required field inputs.' },
        { status: 400 }
      );
    }

    // Determine final location and calculate Haversine distance
    const endLoc = locationB || locationA;
    const distanceMeters = calculateHaversineDistance(locationA, endLoc);

    // Geospatial Time-Lock Security Protocol
    // Distance < 100 meters -> verified = true
    // Distance >= 100 meters -> verified = false (requires manual district selection)
    const verified = distanceMeters < 100;
    const district = verified
      ? `Live GPS Pin (${locationA.lat.toFixed(3)}°, ${locationA.lng.toFixed(3)}°)`
      : manualDistrict || 'Self-Reported Historical Spot';

    // Calculate CADI score and hazard tier using SRS formulas
    const calc = calculateCADI(phColor as PhColor, Number(initialTDS), Number(finalTDS));

    const newLogItem: CadiTestLog = {
      id: `airlit-log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      locationA,
      locationB: endLoc,
      distanceMeters,
      verified,
      district,
      phColor: phColor as PhColor,
      initialTDS: Number(initialTDS),
      finalTDS: Number(finalTDS),
      tdsDelta: calc.tdsDelta,
      cadiScore: calc.cadiScore,
      hazardLevel: calc.hazardLevel,
      hazardColor: calc.hazardColor,
      notes: notes || '',
    };

    const savedLog = await addLogToStore(newLogItem);
    return NextResponse.json({ success: true, log: savedLog });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
