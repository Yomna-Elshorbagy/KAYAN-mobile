import { StyleSheet } from "react-native";

export const cartItemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 20,
    marginBottom: 16,
    alignItems: "center",
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  imageContainer: {
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 16,
  },
  content: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "space-between",
    height: 85,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
    marginRight: 8,
    fontFamily: "Outfit-Bold",
  },
  deleteButton: {
    padding: 4,
  },
  category: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginTop: -4,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 17,
    fontWeight: "800",
    fontFamily: "Outfit-Bold",
  },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 4,
  },
  qtyBtn: {
    padding: 8,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "700",
    paddingHorizontal: 8,
    minWidth: 30,
    textAlign: "center",
  },
});

export const cartSummaryStyles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 24,
    marginTop: 8,
    elevation: 4,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  label: {
    fontSize: 14,
    fontFamily: "Outfit-Regular",
  },
  value: {
    fontSize: 14,
    fontFamily: "Outfit-SemiBold",
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Outfit-Bold",
  },
  totalValue: {
    fontSize: 22,
    fontWeight: "800",
    fontFamily: "Outfit-Bold",
  },
  checkoutBtn: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Outfit-Bold",
  },
});


export const emptyCartStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  iconContainer: {
    padding: 20,
    borderRadius: 100,
    marginBottom: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    fontFamily: "Outfit-Bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 32,
    textAlign: "center",
    lineHeight: 24,
    fontFamily: "Outfit-Regular",
  },
  button: {
    height: 56,
    paddingHorizontal: 48,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Outfit-Bold",
  },
});