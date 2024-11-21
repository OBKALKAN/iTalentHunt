import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import fi from './locales/fi.json';
import tr from './locales/tr.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fi: { translation: fi },
      tr: { translation: tr }
    },
    fallbackLng: 'en',
    detection: {
      order: ['navigator'],
      lookupNavigator: true,
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;