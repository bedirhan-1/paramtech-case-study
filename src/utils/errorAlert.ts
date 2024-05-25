import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

export const ErrorAlert = (
	message: string = 'Something went wrong',
	title: string = 'Error',
	text: string = 'OK',
) => {
	const { t } = useTranslation();
	
	Alert.alert(t(title), t(message), [
		{ text: t(text), onPress: () => console.log('OK Pressed') },
	]);
};
