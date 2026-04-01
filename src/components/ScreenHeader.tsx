import { memo } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { getTheme } from '../theme/palette';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface ScreenHeaderProps {
  title: string;
  subtitle: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const ScreenHeader = memo(
  ({ title, subtitle, isDarkMode, onToggleDarkMode }: ScreenHeaderProps) => {
    const colors = getTheme(isDarkMode);

    return (
      <View style={styles.container}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.subtitle, { color: colors.secondaryText }]}>{subtitle}</Text>
        </View>

        <View style={[styles.modeToggleCard, { backgroundColor: colors.cardElevated, borderColor: colors.border, shadowColor: colors.shadow }]}>
          <Text style={[styles.modeLabel, { color: colors.secondaryText }]}>Dark</Text>
          <Switch
            value={isDarkMode}
            onValueChange={onToggleDarkMode}
            thumbColor={isDarkMode ? colors.primary : '#f8fafc'}
            trackColor={{ false: '#cbd5e1', true: colors.primaryMuted }}
          />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...typography.display,
  },
  subtitle: {
    ...typography.body,
    marginTop: spacing.xs,
  },
  modeToggleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    paddingLeft: spacing.sm,
    paddingRight: spacing.xs,
    paddingVertical: spacing.xs,
    gap: spacing.xs,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 1,
  },
  modeLabel: {
    ...typography.caption,
  },
});
