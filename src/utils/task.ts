import { TaskPriority } from '../types/task';

const priorityRank: Record<TaskPriority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export const formatPriorityLabel = (priority: TaskPriority): string => {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
};

export const compareByPriority = (a: TaskPriority, b: TaskPriority): number => {
  return priorityRank[b] - priorityRank[a];
};
