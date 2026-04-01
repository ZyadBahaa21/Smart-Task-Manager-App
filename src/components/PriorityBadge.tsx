import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getTheme } from '../theme/palette';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { TaskPriority } from '../types/task';
import { formatPriorityLabel } from '../utils/task';

interface PriorityBadgeProps {
  priority: TaskPriority;
  isDarkMode: boolean;
}

export const PriorityBadge = memo(({ priority, isDarkMode }: PriorityBadgeProps) => {
  const colors = getTheme(isDarkMode);

  const priorityColor =
    priority === 'high' ? '#dc2626' : priority === 'medium' ? '#ea580c' : '#0284c7';

  return (
    <View style={[styles.container, { backgroundColor: colors.primaryMuted }]}> 
      <View style={[styles.dot, { backgroundColor: priorityColor }]} />
      <Text style={[styles.label, { color: colors.text }]}>{formatPriorityLabel(priority)}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    gap: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
  },
  label: {
    ...typography.caption,
    fontWeight: '700',
  },
});
