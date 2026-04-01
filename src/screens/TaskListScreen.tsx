import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '../components/EmptyState';
import { FilterTabs } from '../components/FilterTabs';
import { FloatingAddButton } from '../components/FloatingAddButton';
import { LoadingState } from '../components/LoadingState';
import { ScreenHeader } from '../components/ScreenHeader';
import { TaskEditorModal } from '../components/TaskEditorModal';
import { TaskItem } from '../components/TaskItem';
import { TaskSearchBar } from '../components/TaskSearchBar';
import { useFilteredTasks } from '../hooks/useFilteredTasks';
import { getTheme } from '../theme/palette';
import { spacing } from '../theme/spacing';
import { RootStackParamList } from '../types/navigation';
import { Task, TaskDraft } from '../types/task';
import { useTaskStore } from '../store/useTaskStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Tasks'>;

export const TaskListScreen = (_props: Props) => {
  const tasks = useTaskStore(state => state.tasks);
  const query = useTaskStore(state => state.query);
  const filter = useTaskStore(state => state.filter);
  const isDarkMode = useTaskStore(state => state.isDarkMode);
  const hasHydrated = useTaskStore(state => state.hasHydrated);
  const rehydrateError = useTaskStore(state => state.rehydrateError);
  const setQuery = useTaskStore(state => state.setQuery);
  const setFilter = useTaskStore(state => state.setFilter);
  const toggleDarkMode = useTaskStore(state => state.toggleDarkMode);
  const addTask = useTaskStore(state => state.addTask);
  const updateTask = useTaskStore(state => state.updateTask);
  const toggleTaskStatus = useTaskStore(state => state.toggleTaskStatus);
  const deleteTask = useTaskStore(state => state.deleteTask);

  const colors = getTheme(isDarkMode);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const visibleTasks = useFilteredTasks({ tasks, query, filter });

  const openCreateModal = useCallback(() => {
    setEditingTask(null);
    setIsEditorOpen(true);
  }, []);

  const openEditModal = useCallback((task: Task) => {
    setEditingTask(task);
    setIsEditorOpen(true);
  }, []);

  const closeEditor = useCallback(() => {
    setIsEditorOpen(false);
    setEditingTask(null);
  }, []);

  const handleSaveTask = useCallback(
    (draft: TaskDraft, taskId?: string) => {
      if (taskId) {
        updateTask(taskId, draft);
        return;
      }

      addTask(draft);
    },
    [addTask, updateTask],
  );

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      deleteTask(taskId);
    },
    [deleteTask],
  );

  const keyExtractor = useCallback((item: Task) => item.id, []);

  const renderItem = useCallback<ListRenderItem<Task>>(
    ({ item }) => (
      <TaskItem
        task={item}
        isDarkMode={isDarkMode}
        onToggleComplete={toggleTaskStatus}
        onEditTask={openEditModal}
        onDeleteTask={handleDeleteTask}
      />
    ),
    [handleDeleteTask, isDarkMode, openEditModal, toggleTaskStatus],
  );

  const taskSummary = useMemo(() => {
    const completedCount = tasks.filter(task => task.completed).length;
    return `${completedCount}/${tasks.length} completed`;
  }, [tasks]);

  const emptyStateContent = useMemo(() => {
    if (tasks.length === 0) {
      return {
        title: 'No tasks yet',
        subtitle: 'Tap the + button to add your first task and stay organized.',
      };
    }

    if (query.trim().length > 0) {
      return {
        title: 'No results',
        subtitle: 'Try a different keyword or clear your search.',
      };
    }

    if (filter !== 'all') {
      return {
        title: 'Nothing here yet',
        subtitle: 'Switch filters or update task statuses to see more items.',
      };
    }

    return {
      title: 'No tasks found',
      subtitle: 'Try another filter or create a new task.',
    };
  }, [filter, query, tasks.length]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ScreenHeader
            title="Your Tasks"
            subtitle={taskSummary}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        </View>

        <TaskSearchBar value={query} onChangeText={setQuery} isDarkMode={isDarkMode} />
        <FilterTabs activeFilter={filter} onFilterChange={setFilter} isDarkMode={isDarkMode} />

        {rehydrateError ? (
          <View style={styles.errorContainer}>
            <Text style={[styles.errorTitle, { color: colors.danger }]}>Failed to load tasks</Text>
            <Text style={[styles.errorSubtitle, { color: colors.secondaryText }]}>
              {rehydrateError.message || 'An unexpected error occurred. Please restart the app.'}
            </Text>
          </View>
        ) : !hasHydrated ? (
          <LoadingState isDarkMode={isDarkMode} />
        ) : (
          <FlatList
            data={visibleTasks}
            keyExtractor={keyExtractor}
            contentContainerStyle={[
              styles.listContent,
              visibleTasks.length === 0 && styles.emptyListContent,
            ]}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            initialNumToRender={8}
            maxToRenderPerBatch={8}
            windowSize={7}
            updateCellsBatchingPeriod={45}
            removeClippedSubviews
            ListEmptyComponent={
              <EmptyState
                isDarkMode={isDarkMode}
                title={emptyStateContent.title}
                subtitle={emptyStateContent.subtitle}
              />
            }
          />
        )}

        <FloatingAddButton isDarkMode={isDarkMode} onPress={openCreateModal} />

        <TaskEditorModal
          visible={isEditorOpen}
          isDarkMode={isDarkMode}
          task={editingTask}
          onClose={closeEditor}
          onSave={handleSaveTask}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  header: {
    marginBottom: spacing.xs,
  },
  listContent: {
    gap: spacing.md,
    paddingBottom: 110,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  errorSubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
});