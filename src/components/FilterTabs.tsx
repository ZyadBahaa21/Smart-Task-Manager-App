import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { palette } from '../theme/palette';
import { radius, spacing } from '../theme/spacing';
import { TaskFilter } from '../types/task';

interface FilterTabsProps {
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  isDarkMode: boolean;
}

const filters: TaskFilter[] = ['all', 'pending', 'completed'];

export const FilterTabs = memo(
  ({ activeFilter, onFilterChange, isDarkMode }: FilterTabsProps) => {
    const colors = isDarkMode ? palette.dark : palette.light;

    return (
      <View style={styles.container}>
        {filters.map(filter => {
          const isActive = activeFilter === filter;
          const textColorStyle = { color: isActive ? '#ffffff' : colors.text };

          return (
            <Pressable
              key={filter}
              onPress={() => onFilterChange(filter)}
              style={[
                styles.tab,
                {
                  backgroundColor: isActive ? colors.accent : colors.card,
                  borderColor: colors.border,
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
    fontSize: 13,
    fontWeight: '600',
  },
});
