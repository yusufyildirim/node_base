import { i18n } from '../utils';
import translations from './translations';

i18n.fallbacks = true;
i18n.defaultLocale = 'en';

i18n.translations = translations;

export default i18n;
