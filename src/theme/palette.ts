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
    background: '#f3f6fb',
    card: '#ffffff',
    cardElevated: '#f8fbff',
    text: '#0f172a',
    secondaryText: '#475569',
    border: '#cbd5e1',
    borderStrong: '#94a3b8',
    primary: '#2563eb',
    primaryMuted: '#dbeafe',
    danger: '#dc2626',
    success: '#059669',
    warning: '#d97706',
    overlay: 'rgba(15, 23, 42, 0.52)',
    shadow: 'rgba(15, 23, 42, 0.12)',
    placeholder: '#94a3b8',
  },
  dark: {
    background: '#020817',
    card: '#0f172a',
    cardElevated: '#172036',
    text: '#f8fafc',
    secondaryText: '#cbd5e1',
    border: '#334155',
    borderStrong: '#475569',
    primary: '#60a5fa',
    primaryMuted: '#1e3a8a',
    danger: '#fda4af',
    success: '#6ee7b7',
    warning: '#fdba74',
    overlay: 'rgba(2, 6, 23, 0.55)',
    shadow: 'rgba(2, 6, 23, 0.5)',
    placeholder: '#93a4bb',
  },
};

export const getTheme = (isDarkMode: boolean): AppThemeColors =>
  isDarkMode ? palette.dark : palette.light;
