import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  list: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  cardContainer: {
    flex: 1,
    padding: 6,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topLoader: {
    position: "absolute",
    top: 5,
    right: 20,
    zIndex: 10,
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
});
