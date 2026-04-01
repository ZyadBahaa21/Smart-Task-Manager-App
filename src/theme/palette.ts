export const palette = {
  light: {
    background: '#f4f6fb',
    card: '#ffffff',
    text: '#101828',
    secondaryText: '#475467',
    border: '#d0d5dd',
    accent: '#0f766e',
    accentMuted: '#ccfbf1',
    danger: '#b42318',
    success: '#027a48',
    shadow: 'rgba(16, 24, 40, 0.08)',
  },
  dark: {
    background: '#0f172a',
    card: '#111827',
    text: '#f8fafc',
    secondaryText: '#cbd5e1',
    border: '#334155',
    accent: '#14b8a6',
    accentMuted: '#134e4a',
    danger: '#fca5a5',
    success: '#6ee7b7',
    shadow: 'rgba(2, 6, 23, 0.45)',
  },
} as const;

export type AppThemeColors = (typeof palette)['light'];
