import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import en from "./Locals/en.json";
import ar from "./Locals/ar.json";

interface Resources {
  [key: string]: {
    translation: typeof en; 
  };
}

const resources: Resources = {
  en: { translation: en },
  ar: { translation: ar },
};

const locales = Localization.getLocales();

const languageTag: string =
  locales && locales.length > 0 && locales[0].languageTag
    ? locales[0].languageTag.split("-")[0]
    : "en";

i18n.use(initReactI18next).init({
  resources,
  lng: languageTag,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});


export default i18n;
