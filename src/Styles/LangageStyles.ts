import { StyleSheet } from "react-native";

export const LanguageStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 84,
    height: 34,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    padding: 3,
  },
  slider: {
    position: "absolute",
    width: 38,
    height: 28,
    borderRadius: 14,
    left: 3,
  },
  label: {
    flex: 1,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
    zIndex: 1,
  },
});
