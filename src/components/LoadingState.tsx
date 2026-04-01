import { memo } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { getTheme } from '../theme/palette';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface LoadingStateProps {
  isDarkMode: boolean;
}

export const LoadingState = memo(({ isDarkMode }: LoadingStateProps) => {
  const colors = getTheme(isDarkMode);

  return (
    <Animated.View
      entering={FadeIn.duration(180)}
      exiting={FadeOut.duration(120)}
      style={styles.container}>
      <ActivityIndicator size="small" color={colors.primary} />
      <Text style={[styles.label, { color: colors.secondaryText }]}>Loading your tasks...</Text>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    gap: spacing.sm,
  },
  label: {
    ...typography.label,
  },
});
