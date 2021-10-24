import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-fs-backend";

//https://github.com/i18next/i18next-fs-backend

i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
    lng: "en",
    fallbackLng: "en",
    initImmediate: false,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    backend: {
      loadPath: "public/locales/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
