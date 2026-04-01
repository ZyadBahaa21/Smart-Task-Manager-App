import { memo } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { getTheme } from '../theme/palette';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface TaskSearchBarProps {
  value: string;
  onChangeText: (value: string) => void;
  isDarkMode: boolean;
}

export const TaskSearchBar = memo(
  ({ value, onChangeText, isDarkMode }: TaskSearchBarProps) => {
    const colors = getTheme(isDarkMode);

    return (
      <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}> 
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search tasks..."
          placeholderTextColor={colors.placeholder}
          style={[styles.input, { color: colors.text }]}
          autoCorrect={false}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  input: {
    ...typography.body,
    paddingVertical: spacing.md,
  },
});
