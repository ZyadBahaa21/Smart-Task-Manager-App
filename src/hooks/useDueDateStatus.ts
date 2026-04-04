import { useMemo } from 'react';

interface UseDueDateStatusParams {
  dueDate?: string;
  completed: boolean;
}

export const useDueDateStatus = ({ dueDate, completed }: UseDueDateStatusParams) => {
  return useMemo(() => {
    if (!dueDate) {
      return {
        hasDueDate: false,
        isOverdue: false,
        label: 'No due date',
      };
    }

    const date = new Date(dueDate);
    const now = new Date();

    const isOverdue = !completed && date.getTime() < now.getTime();

    return {
      hasDueDate: true,
      isOverdue,
      label: dueDate,
    };
  }, [dueDate, completed]);
};
