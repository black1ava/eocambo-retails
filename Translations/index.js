import i18n from "i18n-js";

i18n.translations = {
  en: require('./en.json'),
  kh: require('./kh.json')
};

i18n.fallbacks = true;
i18n.defaultLocale = 'en';

export default i18n;