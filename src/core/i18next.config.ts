import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { en, tr } from './localization';

const resources = {
	en: {
		translation: en,
	},
	tr: {
		translation: tr,
	},
};

const LANGUAGE_PREFERENCE_KEY = 'LANGUAGE_PREFERENCE';

const getDeviceLanguage = async () => {
	const storedLanguage = await AsyncStorage.getItem(LANGUAGE_PREFERENCE_KEY);
	if (storedLanguage) {
		return storedLanguage;
	}
	const locales = Localization.getLocales();

	if (locales && locales.length > 0) {
		return locales[0].languageTag.split('-')[0];
	}
	return 'en';
};

const setLanguage = async (languageTag: string) => {
	await AsyncStorage.setItem(LANGUAGE_PREFERENCE_KEY, languageTag);
	await i18next.changeLanguage(languageTag);
};

getDeviceLanguage().then(lng => {
	i18next
		.use(initReactI18next)
		.init({
			compatibilityJSON: 'v3',
			debug: true,
			lng,
			fallbackLng: 'en',
			interpolation: {
				escapeValue: false,
			},
			resources,
		})
		.then();
});

export { setLanguage };
