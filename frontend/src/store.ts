import { create } from 'zustand';
import { Task } from './types/Task';

type Store = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  updateTaskStatus: (id: string, status: Task["status"]) => void;
  shouldRefresh: boolean;
  refresh: () => void;
  doneRefresh: () => void;
};

export const useStore = create<Store>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  updateTaskStatus: (id, status) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, status } : task
    ),
  })),
  shouldRefresh: false,
  refresh: () => set({ shouldRefresh: true }),
  doneRefresh: () => set({ shouldRefresh: false }),
}));
