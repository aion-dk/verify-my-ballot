import 'react-i18next'
import en from './config/lang/en.json'

// react-i18next versions lower than 11.11.0
// declare module 'react-i18next' {
//   type DefaultResources = typeof resources['en']
//   interface Resources extends DefaultResources {}
// }

// react-i18next versions higher than 11.11.0
declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      en: typeof en
    }
  }
}
