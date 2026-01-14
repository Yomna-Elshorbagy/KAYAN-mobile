import { StyleSheet, Dimensions } from "react-native";
import { ThemeColors } from "../Constants/theme";

const { width } = Dimensions.get("window");

export const getProfileStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingBottom: 40,
    },
    // => Header Section
    headerBackground: {
      height: 220,
      backgroundColor: colors.primary,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    profileInfo: {
      marginTop: -60,
      alignItems: "center",
      paddingHorizontal: 20,
    },
    avatarWrapper: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: colors.white,
      padding: 4,
      elevation: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
    },
    avatar: {
      width: "100%",
      height: "100%",
      borderRadius: 56,
    },
    userName: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginTop: 15,
    },
    userEmail: {
      fontSize: 14,
      color: colors.subText,
      marginTop: 2,
    },

    // => Tabs/Segments
    tabsContainer: {
      flexDirection: "row",
      backgroundColor: colors.sage[100],
      marginHorizontal: 20,
      marginTop: 25,
      borderRadius: 15,
      padding: 5,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      alignItems: "center",
      borderRadius: 12,
    },
    activeTab: {
      backgroundColor: colors.white,
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    tabText: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.subText,
    },
    activeTabText: {
      color: colors.primary,
    },

    // => Sections container
    section: {
      paddingHorizontal: 20,
      marginTop: 25,
    },

    // => Info Cards
    infoCard: {
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 15,
      marginBottom: 15,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.sage[200],
    },
    infoIconWrapper: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: colors.sage[100],
      justifyContent: "center",
      alignItems: "center",
      marginRight: 15,
    },
    infoLabel: {
      fontSize: 12,
      color: colors.subText,
    },
    infoValue: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.text,
    },

    // => Settings / Actions Section
    actionList: {
      marginTop: 10,
    },
    actionItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.sage[100],
    },
    actionText: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
      marginLeft: 15,
    },
    logoutBtn: {
      marginTop: 30,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 15,
      marginHorizontal: 20,
      borderRadius: 15,
      backgroundColor: "#FFEBEB",
    },
    logoutText: {
      color: "#E63946",
      fontWeight: "bold",
      fontSize: 16,
      marginLeft: 10,
    },

    // => Order Card
    orderCard: {
      backgroundColor: colors.white,
      borderRadius: 15,
      padding: 15,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: colors.sage[200],
    },
    orderHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.sage[100],
    },
    orderID: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.text,
    },
    statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
    },
    statusText: {
      fontSize: 12,
      fontWeight: "bold",
    },
    orderBody: {
      paddingVertical: 12,
    },
    orderDate: {
      fontSize: 13,
      color: colors.subText,
    },
    orderItems: {
      fontSize: 14,
      color: colors.text,
      marginTop: 5,
    },
    orderFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 5,
    },
    orderTotal: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.primary,
    },
    trackingBtn: {
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 8,
      backgroundColor: colors.primary,
    },
    trackingBtnText: {
      color: colors.white,
      fontSize: 12,
      fontWeight: "600",
    },

    // => Tracking View
    trackingContainer: {
      padding: 20,
    },
    timelineItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      height: 80,
    },
    timelineLine: {
      width: 2,
      height: "100%",
      backgroundColor: colors.sage[200],
      position: "absolute",
      left: 11,
      top: 24,
    },
    timelineDot: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.sage[200],
      borderWidth: 4,
      borderColor: colors.white,
      zIndex: 1,
    },
    activeTimelineDot: {
      backgroundColor: colors.primary,
    },
    timelineContent: {
      marginLeft: 20,
      flex: 1,
    },
    timelineTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
    timelineDesc: {
      fontSize: 13,
      color: colors.subText,
    },
    summaryCard: {
      backgroundColor: colors.sage[100],
      padding: 15,
      borderRadius: 15,
      marginBottom: 20,
    },

    // => Edit Form
    editHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 25,
    },
    editTitle: {
      fontSize: 22,
      fontWeight: "bold",
      marginLeft: 15,
      color: colors.text,
    },
    editAvatarOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.3)",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 60,
    },
    genderContainer: {
      flexDirection: "row",
      marginBottom: 20,
      gap: 15,
    },
    genderOption: {
      flex: 1,
      paddingVertical: 12,
      borderWidth: 1.5,
      borderColor: colors.sage[200],
      borderRadius: 12,
      alignItems: "center",
      backgroundColor: colors.card,
    },
    activeGenderOption: {
      borderColor: colors.primary,
      backgroundColor: colors.primary + "10",
    },
    genderText: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.subText,
    },
    activeGenderText: {
      color: colors.primary,
    },
  });
