import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { palette } from '../theme/palette';
import { spacing } from '../theme/spacing';

interface EmptyStateProps {
  isDarkMode: boolean;
}

export const EmptyState = memo(({ isDarkMode }: EmptyStateProps) => {
  const colors = isDarkMode ? palette.dark : palette.light;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>No tasks found</Text>
      <Text style={[styles.subtitle, { color: colors.secondaryText }]}>Try another filter or create a new task.</Text>
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
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
  },
});
