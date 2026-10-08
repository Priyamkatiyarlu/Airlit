import { NextResponse } from 'next/server';
import { resetStoreWithSeed } from '@/lib/dbStore';

export async function POST() {
  try {
    const logs = await resetStoreWithSeed();
    return NextResponse.json({ success: true, message: 'Database reset to initial seed data.', count: logs.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
