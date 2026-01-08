import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../Constants/theme";

const { width, height } = Dimensions.get("window");

export const OnBoardStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  slide: {
    width,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  image: {
    width: width * 0.85,
    height: height * 0.42,
    resizeMode: "contain",

    borderRadius: 28,

    backgroundColor: Colors.light.sage[50],

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,

    elevation: 8,
  },

  textContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "600",
    letterSpacing: 0.8,
    textAlign: "center",
    marginBottom: 12,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },

  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },

  dot: {
    height: 4,
    borderRadius: 2,
    marginHorizontal: 4,
  },
});
