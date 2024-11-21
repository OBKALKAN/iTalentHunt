import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Stats {
  totalApplications: number;
  newMessages: number;
  activeJobs: number;
  conversionRate: number;
}

interface StatsState extends Stats {
  updateStats: (newStats: Partial<Stats>) => void;
}

const useStatsStore = create<StatsState>()(
  persist(
    (set) => ({
      totalApplications: 0,
      newMessages: 0,
      activeJobs: 0,
      conversionRate: 0,
      updateStats: (newStats) =>
        set((state) => ({
          ...state,
          ...newStats,
        })),
    }),
    {
      name: 'stats-storage',
    }
  )
);

export default useStatsStore;