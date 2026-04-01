import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useMemo } from 'react';

import { TaskListScreen } from '../screens/TaskListScreen';
import { RootStackParamList } from '../types/navigation';
import { palette } from '../theme/palette';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  isDarkMode: boolean;
}

export const AppNavigator = ({ isDarkMode }: AppNavigatorProps) => {
  const colors = isDarkMode ? palette.dark : palette.light;

  const navigationTheme = useMemo(() => {
    const baseTheme = isDarkMode ? DarkTheme : DefaultTheme;

    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: colors.background,
        card: colors.card,
        text: colors.text,
        border: colors.border,
        primary: colors.accent,
      },
    };
  }, [colors, isDarkMode]);

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Tasks"
          component={TaskListScreen}
          options={{ title: 'Smart Task Manager', headerShadowVisible: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
