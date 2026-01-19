import { StyleSheet, Dimensions } from "react-native";
import { ThemeColors } from "../Constants/theme";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

export const getSkeletonStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        card: {
            backgroundColor: colors.card,
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: 16,
            width: CARD_WIDTH,
            elevation: 4,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        },
        imagePlaceholder: {
            width: "100%",
            height: 180,
            backgroundColor: colors.mode === "light" ? "#EADBC8" : "#2C2C2C",
        },
        gemContainer: {
            width: "100%",
            height: 180,
            backgroundColor: colors.mode === "light" ? "#F5F5F0" : "#222",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
        },
        gemShape: {
            width: 120,
            height: 120,
            backgroundColor: colors.mode === "light" ? "#EADBC8" : "#333",
            transform: [{ rotate: "45deg" }],
            borderRadius: 12,
        },
        content: {
            padding: 12,
        },
        ratingPlaceholder: {
            width: 40,
            height: 14,
            borderRadius: 4,
            backgroundColor: colors.mode === "light" ? "#EADBC8" : "#333",
            marginBottom: 8,
        },
        titlePlaceholder: {
            width: "100%",
            height: 14,
            borderRadius: 4,
            backgroundColor: colors.mode === "light" ? "#EADBC8" : "#333",
            marginBottom: 6,
        },
        titlePlaceholderShort: {
            width: "70%",
            height: 14,
            borderRadius: 4,
            backgroundColor: colors.mode === "light" ? "#EADBC8" : "#333",
            marginBottom: 12,
        },
        footer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 4,
        },
        pricePlaceholder: {
            width: 60,
            height: 20,
            borderRadius: 4,
            backgroundColor: colors.mode === "light" ? "#EADBC8" : "#333",
        },
        cartBtnPlaceholder: {
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: colors.mode === "light" ? "#EADBC8" : "#333",
        },
        shimmer: {
            flex: 1,
            backgroundColor: colors.mode === "light" ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.05)",
        },
    });
