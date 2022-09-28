import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './config/lang/en.json'

export const resources = {
  en: {
    translation: en,
  },
  // fr: {
  //   translation: {
  //     'Welcome to React': 'Bienvenue à React et react-i18next',
  //   },
  // },
}

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React is already safe from XSS
    },
  })

export default i18n
