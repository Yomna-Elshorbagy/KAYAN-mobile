//===> here theme colors
const palette = {
  gold: "#D4A017",
  goldLight: "#E5B13D",
  white: "#FFFFFF",
  black: "#000000",
  greyLight: "#F5F5F5",
  greyMedium: "#999999",
  greyDark: "#333333",
  backgroundLight: "#faf7f2",
  backgroundDark: "#1a1a1a",
};

export const Colors = {
  light: {
    background: palette.backgroundLight,
    primary: palette.gold,
    text: palette.black,
    subText: palette.greyMedium,
    inputBackground: palette.white,
    inputBorder: "#E8E8E8",
    placeholder: "#A0A0A0",
    buttonText: palette.white,
    mode: 'light' as const,
  },
  dark: {
    background: palette.backgroundDark,
    primary: palette.gold,
    text: palette.white,
    subText: palette.greyMedium,
    inputBackground: "#2C2C2C",
    inputBorder: "#3E3E3E",
    placeholder: "#707070",
    buttonText: palette.white,
    mode: 'dark' as const,
  },
};

export type ThemeMode = 'light' | 'dark';
export type ThemeColors = typeof Colors.light | typeof Colors.dark;
