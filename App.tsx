import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import RootNavigation from './src/navigation/root';
import { theme } from './src/theme';
import { ThemeProvider } from './src/context/theme';
import { store } from './src/store/store';
import { Provider } from 'react-redux';
import './src/core/i18next.config';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from './src/hooks/useTheme';

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);
	const { ColorPallet } = useTheme();

	useEffect(() => {
		async function prepare() {
			try {
				await Font.loadAsync({
					poppinsBlack: require('./assets/Fonts/Poppins-Black.ttf'),
					poppinsBold: require('./assets/Fonts/Poppins-Bold.ttf'),
					poppinsRegular: require('./assets/Fonts/Poppins-Regular.ttf'),
					poppinsSemiBold: require('./assets/Fonts/Poppins-SemiBold.ttf'),
					poppinsLight: require('./assets/Fonts/Poppins-Light.ttf'),
					poppinsExtraLight: require('./assets/Fonts/Poppins-ExtraLight.ttf'),
					poppinsExtraBold: require('./assets/Fonts/Poppins-ExtraBold.ttf'),
					poppinsMedium: require('./assets/Fonts/Poppins-Medium.ttf'),
				});
				setAppIsReady(true);
			} catch (e) {
				console.warn(e);
			}
		}

		prepare();
	}, []);

	if (!appIsReady) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color={ColorPallet.brand.primary} />
			</View>
		);
	}

	return (
		<Provider store={store}>
			<ThemeProvider value={theme}>
				<RootNavigation />
			</ThemeProvider>
		</Provider>
	);
}
