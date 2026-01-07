import { StyleSheet } from "react-native";

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 50,
    marginTop: 20,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 4,
  },
  subLogoText: {
    fontSize: 14,
    letterSpacing: 1,
    marginTop: 5,
  },
  welcomeContainer: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subWelcomeText: {
    fontSize: 16,
    marginTop: 8,
  },
  formContainer: {
    width: "100%",
  },
  forgotPassword: {
    alignSelf: "flex-start",
    marginBottom: 20,
    marginTop: -5,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "600",
  },
  footerContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  footerText: {
    fontSize: 14,
  },
});
