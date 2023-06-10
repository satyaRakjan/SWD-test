import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as en from "./en.json";
import * as th from "./th.json";
export const defaultNS = "translation";
const resources = {
  en,
  th,
};

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  resources,
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
