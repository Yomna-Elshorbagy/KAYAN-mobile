import { StyleSheet, useColorScheme } from "react-native";
import { Colors } from "../../Constants/theme";

export const useThemedStyles = (styleCreator: any) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  return StyleSheet.create(styleCreator(theme));
};
