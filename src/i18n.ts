import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi) // Load JSON files
  .use(LanguageDetector) // Detect user's language
  .use(initReactI18next) // Bind with React
  .init({
    supportedLngs: ["en", "ru", "uz", "kr"], // Add languages here
    fallbackLng: "ru",
    debug: true,
    interpolation: { escapeValue: false },
    backend: {
      loadPath: "/locales/{{lng}}.json", // Path to JSON files
    },
  });

export default i18n;
