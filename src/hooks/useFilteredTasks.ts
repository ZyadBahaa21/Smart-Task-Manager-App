import { useMemo } from 'react';

import { compareByPriority } from '../utils/task';
import { Task, TaskFilter } from '../types/task';

interface UseFilteredTasksParams {
  tasks: Task[];
  query: string;
  filter: TaskFilter;
}

export const useFilteredTasks = ({
  tasks,
  query,
  filter,
}: UseFilteredTasksParams) => {
  return useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tasks
      .filter(task => {
        if (filter === 'completed' && !task.completed) {
          return false;
        }

        if (filter === 'pending' && task.completed) {
          return false;
        }

        if (!normalizedQuery) {
          return true;
        }

        return (
          task.title.toLowerCase().includes(normalizedQuery) ||
          task.description.toLowerCase().includes(normalizedQuery)
        );
      })
      .sort((a, b) => {
        if (a.completed !== b.completed) {
          return Number(a.completed) - Number(b.completed);
        }

        if (a.dueDate || b.dueDate) {
          const aDate = a.dueDate ? new Date(a.dueDate).getTime() : Number.POSITIVE_INFINITY;
          const bDate = b.dueDate ? new Date(b.dueDate).getTime() : Number.POSITIVE_INFINITY;

          if (aDate !== bDate) {
            return aDate - bDate;
          }
        }

        const prioritySort = compareByPriority(a.priority, b.priority);
        if (prioritySort !== 0) {
          return prioritySort;
        }

        return b.updatedAt.localeCompare(a.updatedAt);
      });
  }, [tasks, query, filter]);
};
