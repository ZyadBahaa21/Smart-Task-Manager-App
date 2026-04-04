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
      <View style={[styles.container, { backgroundColor: colors.cardElevated, borderColor: colors.border }]}> 
        {filters.map(filter => {
          const isActive = activeFilter === filter;
          const textColorStyle = { color: isActive ? '#ffffff' : colors.secondaryText };

          return (
            <Pressable
              key={filter}
              onPress={() => onFilterChange(filter)}
              style={({ pressed }) => [
                styles.tab,
                {
                  backgroundColor: isActive ? colors.primary : 'transparent',
                  borderColor: isActive ? colors.primary : 'transparent',
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
    borderWidth: 1,
    borderRadius: radius.pill,
    padding: spacing.xs,
  },
  tab: {
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    ...typography.label,
  },
});
