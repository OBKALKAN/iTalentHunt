import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: number;
  sender: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

interface MessagesState {
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'read' | 'date'>) => void;
  markAsRead: (id: number) => void;
  deleteMessage: (id: number) => void;
}

const useMessagesStore = create<MessagesState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              ...message,
              id: Date.now(),
              date: new Date().toISOString().split('T')[0],
              read: false,
            },
          ],
        })),
      markAsRead: (id) =>
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === id ? { ...msg, read: true } : msg
          ),
        })),
      deleteMessage: (id) =>
        set((state) => ({
          messages: state.messages.filter((msg) => msg.id !== id),
        })),
    }),
    {
      name: 'messages-storage',
    }
  )
);

export default useMessagesStore;