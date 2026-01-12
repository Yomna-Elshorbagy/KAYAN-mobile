import { StyleSheet, Dimensions } from "react-native";
import { ThemeColors } from "../Constants/theme";

const { width } = Dimensions.get("window");

export const getCheckoutStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        scrollContent: {
            paddingHorizontal: 20,
            paddingBottom: 40,
        },

        // Stepper Styles
        stepperContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 30,
        },
        stepWrapper: {
            flexDirection: "row",
            alignItems: "center",
        },
        stepCircle: {
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: colors.sage[100],
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: colors.sage[300],
        },
        activeStepCircle: {
            backgroundColor: colors.primary,
            borderColor: colors.primary,
        },
        completedStepCircle: {
            backgroundColor: colors.primary,
            borderColor: colors.primary,
        },
        stepNumber: {
            fontSize: 14,
            fontWeight: "bold",
            color: colors.subText,
        },
        activeStepNumber: {
            color: colors.white,
        },
        stepLine: {
            width: 60,
            height: 2,
            backgroundColor: colors.sage[200],
            marginHorizontal: 10,
        },
        activeStepLine: {
            backgroundColor: colors.primary,
        },

        // Form Styles
        sectionHeader: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
        },
        sectionIcon: {
            marginRight: 10,
        },
        sectionTitle: {
            fontSize: 20,
            fontFamily: "Outfit-Bold", // Matching design font if available, fallback to bold
            fontWeight: "bold",
            color: colors.text,
        },
        row: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
        halfInput: {
            width: (width - 50) / 2,
        },
        fullInput: {
            width: "100%",
        },
        phoneInput: {
            width: "100%",
            marginBottom: 20
        },

        // Order Summary Styles (Step 2)
        summaryCard: {
            backgroundColor: colors.sage[50], // Very light background for cards
            borderRadius: 15,
            padding: 15,
            marginBottom: 20,
        },
        summaryTitle: {
            fontSize: 18,
            fontWeight: "bold",
            color: colors.text,
            marginBottom: 15,
        },
        orderItem: {
            flexDirection: "row",
            marginBottom: 15,
        },
        itemImage: {
            width: 60,
            height: 60,
            borderRadius: 10,
            backgroundColor: colors.white,
        },
        itemDetails: {
            flex: 1,
            marginLeft: 15,
            justifyContent: "center",
        },
        itemName: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.text,
        },
        itemQty: {
            fontSize: 14,
            color: colors.subText,
            marginTop: 2,
        },
        itemPrice: {
            fontSize: 16,
            fontWeight: "bold",
            color: colors.primary,
            marginTop: 2,
        },
        addressDetails: {
            marginTop: 5,
        },
        addressLine: {
            fontSize: 14,
            color: colors.subText,
            marginBottom: 4,
        },

        // Price Breakdown
        breakdownContainer: {
            borderTopWidth: 1,
            borderTopColor: colors.sage[200],
            paddingTop: 15,
            marginTop: 10,
        },
        breakdownRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
        },
        breakdownLabel: {
            fontSize: 16,
            color: colors.subText,
        },
        breakdownValue: {
            fontSize: 16,
            color: colors.text,
            fontWeight: "500",
        },
        freeShipping: {
            color: "#4CAF50", // Green
            fontWeight: "bold",
        },
        totalRow: {
            marginTop: 15,
            paddingTop: 15,
            borderTopWidth: 2,
            borderTopColor: colors.sage[300],
        },
        totalLabel: {
            fontSize: 18,
            fontWeight: "bold",
            color: colors.text,
        },
        totalValue: {
            fontSize: 22,
            fontWeight: "bold",
            color: colors.primary,
        },

        // Footer / Buttons
        footer: {
            padding: 20,
            backgroundColor: colors.background,
        },
        continueButton: {
            backgroundColor: colors.primary,
            paddingVertical: 18,
            borderRadius: 15,
            alignItems: "center",
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
        },
        continueButtonText: {
            color: colors.white,
            fontSize: 18,
            fontWeight: "bold",
        },

        // Step 3 Success
        successContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
        },
        successTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.text,
            marginTop: 20,
            textAlign: 'center'
        },
        successDesc: {
            fontSize: 16,
            color: colors.subText,
            marginTop: 10,
            textAlign: 'center',
            lineHeight: 24
        }
    });
