import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getTheme } from '../theme/palette';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface EmptyStateProps {
  isDarkMode: boolean;
  title?: string;
  subtitle?: string;
}

export const EmptyState = memo(({ isDarkMode, title, subtitle }: EmptyStateProps) => {
  const colors = getTheme(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>{title ?? 'No tasks found'}</Text>
      <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
        {subtitle ?? 'Try another filter or create a new task.'}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    gap: spacing.sm,
  },
  title: {
    ...typography.title,
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
});
