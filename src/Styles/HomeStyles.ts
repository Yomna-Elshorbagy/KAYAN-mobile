import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const HomeStyles = StyleSheet.create({
    heroContainer: {
        width: width - 32,
        height: 220,
        alignSelf: "center",
        marginTop: 15,
        borderRadius: 25,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 8,
    },
    heroImage: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.2)",
    },
    heroContent: {
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        margin: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.4)",
    },
    heroTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: "#333",
        marginBottom: 5,
        letterSpacing: 0.5,
    },
    heroSubtitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 12,
        fontWeight: "500",
    },
    heroButton: {
        backgroundColor: "#D4A017",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignSelf: "flex-start",
    },
    heroButtonText: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "700",
    },
    sectionContainer: {
        paddingVertical: 15,
        marginTop: 10,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    viewAllText: {
        fontSize: 14,
        fontWeight: "600",
    },
    horizontalList: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    cardContainer: {
        width: 200,
        marginRight: 15,
    },
    categoryCard: {
        borderRadius: 25,
        overflow: "hidden",
        width: 140,
        height: 180,
        marginRight: 15,
        backgroundColor: "#222",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 6,
    },
    categoryImage: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
    },
    categoryOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.25)",
    },
    categoryGradient: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "50%",
        backgroundColor: "rgba(0,0,0,0.4)", // Simple fallback if no LinearGradient
    },
    categoryText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#FFFFFF",
        textAlign: "center",
        marginBottom: 15,
        letterSpacing: 0.5,
        textShadowColor: "rgba(0, 0, 0, 0.75)",
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
});
