import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '../components/EmptyState';
import { FilterTabs } from '../components/FilterTabs';
import { TaskEditorModal } from '../components/TaskEditorModal';
import { TaskItem } from '../components/TaskItem';
import { TaskSearchBar } from '../components/TaskSearchBar';
import { useFilteredTasks } from '../hooks/useFilteredTasks';
import { palette } from '../theme/palette';
import { radius, spacing } from '../theme/spacing';
import { RootStackParamList } from '../types/navigation';
import { Task, TaskDraft } from '../types/task';
import { useTaskStore } from '../store/useTaskStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Tasks'>;

export const TaskListScreen = (_props: Props) => {
  const tasks = useTaskStore(state => state.tasks);
  const query = useTaskStore(state => state.query);
  const filter = useTaskStore(state => state.filter);
  const isDarkMode = useTaskStore(state => state.isDarkMode);
  const setQuery = useTaskStore(state => state.setQuery);
  const setFilter = useTaskStore(state => state.setFilter);
  const toggleDarkMode = useTaskStore(state => state.toggleDarkMode);
  const addTask = useTaskStore(state => state.addTask);
  const updateTask = useTaskStore(state => state.updateTask);
  const toggleTaskStatus = useTaskStore(state => state.toggleTaskStatus);
  const deleteTask = useTaskStore(state => state.deleteTask);

  const colors = isDarkMode ? palette.dark : palette.light;

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

  const taskSummary = useMemo(() => {
    const completedCount = tasks.filter(task => task.completed).length;
    return `${completedCount}/${tasks.length} completed`;
  }, [tasks]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Your Tasks</Text>
            <Text style={[styles.headerSubtitle, { color: colors.secondaryText }]}>{taskSummary}</Text>
          </View>
          <View style={styles.darkModeToggle}>
            <Text style={[styles.darkModeLabel, { color: colors.secondaryText }]}>Dark</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              thumbColor={isDarkMode ? colors.accent : '#f3f4f6'}
            />
          </View>
        </View>

        <TaskSearchBar value={query} onChangeText={setQuery} isDarkMode={isDarkMode} />
        <FilterTabs activeFilter={filter} onFilterChange={setFilter} isDarkMode={isDarkMode} />

        <FlatList
          data={visibleTasks}
          keyExtractor={item => item.id}
          contentContainerStyle={[
            styles.listContent,
            visibleTasks.length === 0 && styles.emptyListContent,
          ]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              isDarkMode={isDarkMode}
              onToggleComplete={toggleTaskStatus}
              onEditTask={openEditModal}
              onDeleteTask={handleDeleteTask}
            />
          )}
          ListEmptyComponent={<EmptyState isDarkMode={isDarkMode} />}
        />

        <Pressable
          style={[styles.fab, { backgroundColor: colors.accent }]}
          onPress={openCreateModal}>
          <Text style={styles.fabText}>+</Text>
        </Pressable>

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '800',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: spacing.xs,
  },
  darkModeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  darkModeLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  listContent: {
    gap: spacing.md,
    paddingBottom: 110,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.24,
    shadowRadius: 18,
    elevation: 5,
  },
  fabText: {
    color: '#ffffff',
    fontSize: 32,
    lineHeight: 34,
    marginTop: -1,
  },
});
