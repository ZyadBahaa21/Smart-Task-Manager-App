import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp, LinearTransition } from 'react-native-reanimated';

import { getTheme } from '../theme/palette';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { Task } from '../types/task';
import { PriorityBadge } from './PriorityBadge';

interface TaskItemProps {
  task: Task;
  isDarkMode: boolean;
  onToggleComplete: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskItem = memo(
  ({ task, isDarkMode, onToggleComplete, onEditTask, onDeleteTask }: TaskItemProps) => {
    const colors = getTheme(isDarkMode);
    const checkboxFillStyle = {
      backgroundColor: task.completed ? colors.success : 'transparent',
    };

    return (
      <Animated.View
        entering={FadeInDown.duration(200)}
        exiting={FadeOutUp.duration(160)}
        layout={LinearTransition.duration(200)}
        style={[
          styles.container,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            shadowColor: colors.shadow,
          },
        ]}>
        <Pressable
          onPress={() => onToggleComplete(task.id)}
          style={({ pressed }) => [
            styles.statusRow,
            pressed && { opacity: 0.78 },
          ]}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: task.completed }}>
          <View
            style={[
              styles.checkbox,
              {
                borderColor: task.completed ? colors.success : colors.border,
              },
              checkboxFillStyle,
            ]}
          />
          <Text
            style={[
              styles.title,
              { color: colors.text },
              task.completed && styles.completedText,
            ]}>
            {task.title}
          </Text>
        </Pressable>

        {task.description ? (
          <Text
            style={[
              styles.description,
              { color: colors.secondaryText },
              task.completed && styles.completedText,
            ]}>
            {task.description}
          </Text>
        ) : null}

        <View style={styles.footerRow}>
          <PriorityBadge priority={task.priority} isDarkMode={isDarkMode} />
          <View style={styles.actionRow}>
            <Pressable
              onPress={() => onEditTask(task)}
              style={({ pressed }) => [
                styles.actionButton,
                { backgroundColor: colors.primaryMuted },
                pressed && styles.pressedAction,
              ]}>
              <Text style={[styles.actionText, { color: colors.primary }]}>Edit</Text>
            </Pressable>
            <Pressable
              onPress={() => onDeleteTask(task.id)}
              style={({ pressed }) => [
                styles.actionButton,
                { backgroundColor: colors.primaryMuted },
                pressed && styles.pressedAction,
              ]}>
              <Text style={[styles.actionText, { color: colors.danger }]}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.sm,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
  },
  title: {
    flex: 1,
    ...typography.body,
    fontWeight: '700',
  },
  description: {
    ...typography.body,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  footerRow: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
  },
  actionText: {
    ...typography.label,
  },
  pressedAction: {
    opacity: 0.72,
  },
});
