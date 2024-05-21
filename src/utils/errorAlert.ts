import { Alert } from 'react-native';

export const ErrorAlert = (
	message: string = 'Something went Wrong',
	title = 'Error',
) => {
	Alert.alert(title, message, [
		{ text: 'OK', onPress: () => console.log('OK Pressed') },
	]);
};
