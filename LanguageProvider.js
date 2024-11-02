// LanguageProvider.js
import React, { createContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    // تحميل اللغة من AsyncStorage عند بدء التطبيق
    AsyncStorage.getItem('language').then((storedLanguage) => {
      if (storedLanguage) {
        i18n.changeLanguage(storedLanguage);
        setLanguage(storedLanguage);
      }
    });
  }, []);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    AsyncStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
