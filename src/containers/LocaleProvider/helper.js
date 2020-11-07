import translations from '../../translations';

export const getTranslate = (locale) => (key) =>
  translations[String(locale)][String(key)] || key;

export default { getTranslate };
