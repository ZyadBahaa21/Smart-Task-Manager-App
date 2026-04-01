import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { getTheme } from '../theme/palette';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { TaskFilter } from '../types/task';

interface FilterTabsProps {
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  isDarkMode: boolean;
}

const filters: TaskFilter[] = ['all', 'pending', 'completed'];

export const FilterTabs = memo(
  ({ activeFilter, onFilterChange, isDarkMode }: FilterTabsProps) => {
    const colors = getTheme(isDarkMode);

    return (
      <View style={styles.container}>
        {filters.map(filter => {
          const isActive = activeFilter === filter;
          const textColorStyle = { color: isActive ? '#ffffff' : colors.text };

          return (
            <Pressable
              key={filter}
              onPress={() => onFilterChange(filter)}
              style={({ pressed }) => [
                styles.tab,
                {
                  backgroundColor: isActive ? colors.primary : colors.card,
                  borderColor: colors.border,
                  opacity: pressed ? 0.84 : 1,
                },
              ]}>
              <Text
                style={[
                  styles.tabText,
                  textColorStyle,
                ]}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  tab: {
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  tabText: {
    ...typography.label,
  },
});
