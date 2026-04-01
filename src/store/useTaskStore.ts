import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Task, TaskDraft, TaskFilter } from '../types/task';

interface TaskState {
  tasks: Task[];
  query: string;
  filter: TaskFilter;
  isDarkMode: boolean;
  hasHydrated: boolean;
  addTask: (draft: TaskDraft) => void;
  updateTask: (taskId: string, updates: TaskDraft) => void;
  deleteTask: (taskId: string) => void;
  toggleTaskStatus: (taskId: string) => void;
  setQuery: (query: string) => void;
  setFilter: (filter: TaskFilter) => void;
  toggleDarkMode: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

const nowIso = () => new Date().toISOString();

export const useTaskStore = create<TaskState>()(
  persist(
    set => ({
      tasks: [],
      query: '',
      filter: 'all',
      isDarkMode: false,
      hasHydrated: false,
      addTask: draft => {
        const timestamp = nowIso();

        set(state => ({
          tasks: [
            {
              id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
              title: draft.title.trim(),
              description: draft.description.trim(),
              priority: draft.priority,
              completed: false,
              createdAt: timestamp,
              updatedAt: timestamp,
            },
            ...state.tasks,
          ],
        }));
      },
      updateTask: (taskId, updates) => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === taskId
              ? {
                  ...task,
                  title: updates.title.trim(),
                  description: updates.description.trim(),
                  priority: updates.priority,
                  updatedAt: nowIso(),
                }
              : task,
          ),
        }));
      },
      deleteTask: taskId => {
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== taskId),
        }));
      },
      toggleTaskStatus: taskId => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === taskId
              ? {
                  ...task,
                  completed: !task.completed,
                  updatedAt: nowIso(),
                }
              : task,
          ),
        }));
      },
      setQuery: query => {
        set({ query });
      },
      setFilter: filter => {
        set({ filter });
      },
      toggleDarkMode: () => {
        set(state => ({ isDarkMode: !state.isDarkMode }));
      },
      setHasHydrated: hasHydrated => {
        set({ hasHydrated });
      },
    }),
    {
      name: 'smart-task-manager-storage',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      onRehydrateStorage: () => state => {
        state?.setHasHydrated(true);
      },
      partialize: state => ({
        tasks: state.tasks,
        isDarkMode: state.isDarkMode,
      }),
    },
  ),
);
