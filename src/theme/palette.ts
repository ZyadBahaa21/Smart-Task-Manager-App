export interface AppThemeColors {
  background: string;
  card: string;
  cardElevated: string;
  text: string;
  secondaryText: string;
  border: string;
  borderStrong: string;
  primary: string;
  primaryMuted: string;
  danger: string;
  success: string;
  warning: string;
  overlay: string;
  shadow: string;
  placeholder: string;
}

export const palette: Record<'light' | 'dark', AppThemeColors> = {
  light: {
    background: '#f4f6fb',
    card: '#ffffff',
    cardElevated: '#ffffff',
    text: '#101828',
    secondaryText: '#475467',
    border: '#d0d5dd',
    borderStrong: '#98a2b3',
    primary: '#0f766e',
    primaryMuted: '#ccfbf1',
    danger: '#b42318',
    success: '#027a48',
    warning: '#b54708',
    overlay: 'rgba(15, 23, 42, 0.45)',
    shadow: 'rgba(16, 24, 40, 0.08)',
    placeholder: '#98a2b3',
  },
  dark: {
    background: '#0b1220',
    card: '#111827',
    cardElevated: '#182132',
    text: '#f8fafc',
    secondaryText: '#cbd5e1',
    border: '#334155',
    borderStrong: '#475569',
    primary: '#14b8a6',
    primaryMuted: '#134e4a',
    danger: '#fca5a5',
    success: '#6ee7b7',
    warning: '#fdba74',
    overlay: 'rgba(2, 6, 23, 0.55)',
    shadow: 'rgba(2, 6, 23, 0.45)',
    placeholder: '#94a3b8',
  },
};

export const getTheme = (isDarkMode: boolean): AppThemeColors =>
  isDarkMode ? palette.dark : palette.light;
