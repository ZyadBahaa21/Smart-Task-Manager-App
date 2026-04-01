import { memo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { getTheme } from '../theme/palette';
import { radius, spacing } from '../theme/spacing';

interface FloatingAddButtonProps {
  isDarkMode: boolean;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const FloatingAddButton = memo(({ isDarkMode, onPress }: FloatingAddButtonProps) => {
  const colors = getTheme(isDarkMode);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withTiming(0.96, { duration: 90 });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 120 });
      }}
      style={[styles.fab, animatedStyle, { backgroundColor: colors.primary, shadowColor: colors.shadow }]}>
      <Text style={styles.fabText}>+</Text>
    </AnimatedPressable>
  );
});

const styles = StyleSheet.create({
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
