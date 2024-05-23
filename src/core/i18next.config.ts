import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { en, tr } from './localization';

const resources = {
	en: {
		translation: en,
	},
	tr: {
		translation: tr,
	},
};

const getDeviceLanguage = () => {
	const locales = Localization.getLocales();
	if (locales && locales.length > 0) {
		return locales[0].languageTag.split('-')[0];
	}
	return 'en';
};

i18next
	.use(initReactI18next)
	.init({
		compatibilityJSON: 'v3',
		debug: true,
		lng: getDeviceLanguage(),
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
		resources,
	});

const setLanguage = (languageTag: string) => {
	i18next.changeLanguage(languageTag);
};

export { setLanguage };
