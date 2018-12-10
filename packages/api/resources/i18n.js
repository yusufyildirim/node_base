const { i18n } = require('../utils');
const translations = require('./translations');

i18n.fallbacks = true;
i18n.defaultLocale = 'en';

i18n.translations = translations;

module.exports = i18n;
