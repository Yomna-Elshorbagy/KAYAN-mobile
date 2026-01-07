import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/Localization/index";
import { LanguageProvider } from "./src/Contexts/LanguageProvider";
import store from "./src/Redux/store";
import { toastConfig } from "./src/Utilis/toastConfig";
import Router from "./src/Router/Router";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <LanguageProvider>
        <I18nextProvider i18n={i18n}>
          <Router />
        </I18nextProvider>
        </LanguageProvider>
      </Provider>
      <Toast config={toastConfig} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
