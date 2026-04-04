export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskFilter = 'all' | 'completed' | 'pending';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskDraft {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate?: string;
}
