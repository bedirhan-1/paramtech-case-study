import React, { useCallback, useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation/root';
import { theme } from './src/theme';
import { ThemeProvider } from './src/context/theme';

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);

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
				await new Promise(resolve => setTimeout(resolve, 2000));
			} catch (e) {
				console.warn(e);
			} finally {
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	if (!appIsReady) {
		return null;
	}

	return (
		<ThemeProvider value={theme}>
			<NavigationContainer>
				<RootNavigation />
			</NavigationContainer>
		</ThemeProvider>
	);
}
