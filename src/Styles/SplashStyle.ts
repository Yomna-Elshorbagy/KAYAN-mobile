import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../Constants/theme";
const { width } = Dimensions.get("window");

export const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: width * 0.6,
    height: width * 0.6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: (width * 0.6) / 2,
    elevation: 10,
    shadowColor: Colors.light.sage[50],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    overflow: "hidden",
  },
  logo: {
    width: "80%",
    height: "80%",
  },
  title: {
    marginTop: 25,
    fontSize: 32,
    fontWeight: "700",
    color: Colors.light.primary,
    letterSpacing: 1,
  },
});
