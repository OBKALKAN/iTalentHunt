import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ApplicationStatus = 
  | 'new'
  | 'accepted'
  | 'rejected'
  | 'first_meeting'
  | 'second_meeting'
  | 'third_meeting'
  | 'fourth_meeting'
  | 'allianz_meeting';

export interface StatusUpdate {
  id: number;
  status: ApplicationStatus;
  comment: string;
  date: string;
}

export interface Application {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  coverLetter: string;
  currentStatus: ApplicationStatus;
  statusHistory: StatusUpdate[];
  date: string;
}

interface ApplicationsState {
  applications: Application[];
  addApplication: (application: Omit<Application, 'id' | 'currentStatus' | 'statusHistory' | 'date'>) => void;
  updateStatus: (id: number, status: ApplicationStatus, comment: string) => void;
}

const useApplicationsStore = create<ApplicationsState>()(
  persist(
    (set) => ({
      applications: [],
      addApplication: (application) =>
        set((state) => ({
          applications: [
            ...state.applications,
            {
              ...application,
              id: Date.now(),
              currentStatus: 'new',
              statusHistory: [{
                id: Date.now(),
                status: 'new',
                comment: 'Application received',
                date: new Date().toISOString(),
              }],
              date: new Date().toISOString(),
            },
          ],
        })),
      updateStatus: (id, status, comment) =>
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id
              ? {
                  ...app,
                  currentStatus: status,
                  statusHistory: [
                    ...app.statusHistory,
                    {
                      id: Date.now(),
                      status,
                      comment,
                      date: new Date().toISOString(),
                    },
                  ],
                }
              : app
          ),
        })),
    }),
    {
      name: 'applications-storage',
    }
  )
);

export default useApplicationsStore;