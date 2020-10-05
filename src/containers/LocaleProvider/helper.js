import translations from '../../translations';

export const getTranslate = locale => key => translations[locale][key] || key;
