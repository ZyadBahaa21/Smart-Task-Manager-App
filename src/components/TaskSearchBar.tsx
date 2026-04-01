import { memo } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { palette } from '../theme/palette';
import { radius, spacing } from '../theme/spacing';

interface TaskSearchBarProps {
  value: string;
  onChangeText: (value: string) => void;
  isDarkMode: boolean;
}

export const TaskSearchBar = memo(
  ({ value, onChangeText, isDarkMode }: TaskSearchBarProps) => {
    const colors = isDarkMode ? palette.dark : palette.light;

    return (
      <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}> 
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search tasks..."
          placeholderTextColor={colors.secondaryText}
          style={[styles.input, { color: colors.text }]}
          autoCorrect={false}
          clearButtonMode="while-editing"
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
    fontSize: 16,
    paddingVertical: spacing.md,
  },
});
