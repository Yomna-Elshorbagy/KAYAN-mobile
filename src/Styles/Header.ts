import { StyleSheet } from "react-native";

export const HomeHeaderStyles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  left: {
    flex: 1,
    alignItems: "flex-start",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 2,
  },
  right: {
    flex: 1,
    alignItems: "flex-end",
  },
});