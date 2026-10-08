import { CadiTestLog } from '@/types';
import { initialSeedLogs } from './initialData';

// Global memory cache for serverless hot-reloads
let globalMemoryLogs: CadiTestLog[] = [...initialSeedLogs];

export async function getLogsFromStore(): Promise<CadiTestLog[]> {
  try {
    if (process.env.MONGODB_URI) {
      const mongoose = await import('mongoose');
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(process.env.MONGODB_URI);
      }
      
      const LogModel = mongoose.models.CadiLog || mongoose.model('CadiLog', new mongoose.Schema({
        id: String,
        timestamp: String,
        locationA: Object,
        locationB: Object,
        distanceMeters: Number,
        verified: Boolean,
        district: String,
        phColor: String,
        initialTDS: Number,
        finalTDS: Number,
        tdsDelta: Number,
        cadiScore: Number,
        hazardLevel: String,
        hazardColor: String,
        notes: String,
      }));

      const docs = await LogModel.find().sort({ timestamp: -1 }).lean();
      if (docs && docs.length > 0) {
        return docs.map((d: any) => ({
          ...d,
          _id: d._id.toString(),
        })) as CadiTestLog[];
      }
    }
  } catch (err) {
    console.warn('MongoDB connection fallback to memory store:', err);
  }

  // Return memory logs sorted newest first
  return [...globalMemoryLogs].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export async function addLogToStore(newLog: CadiTestLog): Promise<CadiTestLog> {
  try {
    if (process.env.MONGODB_URI) {
      const mongoose = await import('mongoose');
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(process.env.MONGODB_URI);
      }
      const LogModel = mongoose.models.CadiLog || mongoose.model('CadiLog', new mongoose.Schema({
        id: String,
        timestamp: String,
        locationA: Object,
        locationB: Object,
        distanceMeters: Number,
        verified: Boolean,
        district: String,
        phColor: String,
        initialTDS: Number,
        finalTDS: Number,
        tdsDelta: Number,
        cadiScore: Number,
        hazardLevel: String,
        hazardColor: String,
        notes: String,
      }));

      const created = await LogModel.create(newLog);
      return {
        ...newLog,
        _id: created._id.toString(),
      };
    }
  } catch (err) {
    console.warn('MongoDB save fallback to memory store:', err);
  }

  // Prepend to memory store
  globalMemoryLogs.unshift(newLog);
  return newLog;
}

export async function resetStoreWithSeed(): Promise<CadiTestLog[]> {
  try {
    if (process.env.MONGODB_URI) {
      const mongoose = await import('mongoose');
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(process.env.MONGODB_URI);
      }
      const LogModel = mongoose.models.CadiLog;
      if (LogModel) {
        await LogModel.deleteMany({});
        await LogModel.insertMany(initialSeedLogs);
      }
    }
  } catch (err) {
    console.warn('MongoDB reset error:', err);
  }

  globalMemoryLogs = [...initialSeedLogs];
  return globalMemoryLogs;
}
