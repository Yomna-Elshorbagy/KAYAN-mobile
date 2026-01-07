//===> here theme colors
export const Colors = {
  light: {
    background: "#faf7f2",
    mode: 'light',
  },
  dark: {
    background: '#2b2521',
    mode: 'dark',
  },
};

export type ThemeMode = 'light' | 'dark';
export type ThemeColors = typeof Colors.light | typeof Colors.dark;
