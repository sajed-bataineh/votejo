// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ملفات الترجمة
import en from './locales/en.json';
import ar from './locales/ar.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: 'en', // اللغة الافتراضية
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // لا تستخدم escape في النصوص
  },
});

// تحميل اللغة المحفوظة من AsyncStorage
AsyncStorage.getItem('language').then((language) => {
  if (language) {
    i18n.changeLanguage(language);
  }
});

export default i18n;
