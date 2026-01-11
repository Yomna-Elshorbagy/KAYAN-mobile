import { StyleSheet, Dimensions } from "react-native";
import { ThemeColors } from "../Constants/theme";

const { width } = Dimensions.get("window");

export const getProductDetailsStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingBottom: 100,
    },
    imageContainer: {
      width: width,
      height: width * 0.8,
      backgroundColor: colors.white,
      justifyContent: "center",
      alignItems: "center",
    },
    productImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
    contentWrapper: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 10,
    },
    ratingRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
    },
    ratingText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginLeft: 5,
    },
    reviewsCount: {
      fontSize: 14,
      color: colors.subText,
      marginLeft: 5,
    },
    priceRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    price: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.primary,
    },
    oldPrice: {
      fontSize: 18,
      color: colors.subText,
      textDecorationLine: "line-through",
      marginLeft: 10,
    },
    stockStatus: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    stockDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#4CAF50",
      marginRight: 8,
    },
    stockText: {
      fontSize: 14,
      color: "#4CAF50",
      fontWeight: "500",
    },
    shippingCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.sage[100],
      padding: 15,
      borderRadius: 12,
      marginBottom: 25,
    },
    shippingIconBox: {
      marginRight: 15,
    },
    shippingTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
    shippingDesc: {
      fontSize: 12,
      color: colors.subText,
    },
    tabsContainer: {
      flexDirection: "row",
      backgroundColor: colors.sage[100],
      borderRadius: 12,
      padding: 5,
      marginBottom: 20,
    },
    tab: {
      flex: 1,
      paddingVertical: 10,
      alignItems: "center",
      borderRadius: 8,
    },
    activeTab: {
      backgroundColor: colors.white,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    tabText: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.subText,
    },
    activeTabText: {
      color: colors.text,
      fontWeight: "bold",
    },
    tabContent: {
      marginBottom: 30,
    },
    descriptionText: {
      fontSize: 15,
      color: colors.subText,
      lineHeight: 22,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 15,
    },
    relatedList: {
      paddingBottom: 10,
    },
    footerActions: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      padding: 20,
      backgroundColor: colors.white,
      borderTopWidth: 1,
      borderTopColor: colors.sage[300],
      alignItems: "center",
    },
    addToCartBtn: {
      flex: 1,
      backgroundColor: colors.primary,
      paddingVertical: 15,
      borderRadius: 12,
      alignItems: "center",
      marginLeft: 15,
    },
    addToCartText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: "bold",
    },
    wishlistActionBtn: {
      width: 50,
      height: 50,
      borderRadius: 12,
      backgroundColor: colors.sage[100],
      justifyContent: "center",
      alignItems: "center",
    },
    reviewItem: {
      marginBottom: 20,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.sage[300],
    },
    reviewHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    reviewerName: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
    reviewDate: {
      fontSize: 12,
      color: colors.subText,
    },
    reviewComment: {
      fontSize: 14,
      color: colors.subText,
      lineHeight: 20,
    },
    detailsRow: {
      flexDirection: "row",
      marginBottom: 10,
    },
    detailsLabel: {
      width: 100,
      fontSize: 14,
      fontWeight: "bold",
      color: colors.text,
    },
    detailsValue: {
      flex: 1,
      fontSize: 14,
      color: colors.subText,
    },
  });
