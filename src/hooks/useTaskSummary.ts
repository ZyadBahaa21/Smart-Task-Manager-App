import { useMemo } from 'react';

import { Task } from '../types/task';

interface UseTaskSummaryParams {
  tasks: Task[];
}

export const useTaskSummary = ({ tasks }: UseTaskSummaryParams) => {
  return useMemo(() => {
    const completedCount = tasks.filter(task => task.completed).length;

    return {
      completedCount,
      totalCount: tasks.length,
      summaryText: `${completedCount}/${tasks.length} completed`,
    };
  }, [tasks]);
};
