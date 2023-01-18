import { create } from "zustand";

// type Task = {
//   title: string;
// };

type TasksState = {
  newTaskTitle: string;
  tasks: string[];
  addTask: (task: string) => void;
  setNewTaskTitle: (title: string) => void;
  clearTasks: () => void;
};

export const useTasksStore = create<TasksState>((set) => ({
  newTaskTitle: "",
  tasks: [],
  addTask: (task) => {
    set((state) => ({ tasks: [...state.tasks, task] }));
  },
  setNewTaskTitle: (title) => {
    set((state) => ({ newTaskTitle: title }));
  },
  clearTasks: () => {
    set((state) => ({ tasks: [] }));
  },
}));
