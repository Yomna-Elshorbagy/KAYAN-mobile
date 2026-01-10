import { StyleSheet } from "react-native";

export const CardStyles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: "hidden",
    width: "100%",
    marginBottom: 16,
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 170,
  },
  removeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 6,
    borderRadius: 20,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  cartBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderRadius: 25,
    paddingVertical: 8,
    gap: 6,
  },
  cartText: {
    fontWeight: "600",
  },
});


export const wishlistStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  list: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  cardContainer: {
    flex: 1,
    padding: 6,
  },
  row: {
    justifyContent: "space-between",
  },
});
