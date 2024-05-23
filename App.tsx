import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import RootNavigation from './src/navigation/root';
import { theme } from './src/theme';
import { ThemeProvider } from './src/context/theme';
import { ActivityIndicator } from 'react-native';
import { useTheme } from './src/hooks/useTheme';
import { store } from './src/store/store';
import { Provider } from 'react-redux';

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
		return (
			<ActivityIndicator
				size={'large'}
				color={ColorPallet.brand.primary}
				style={{ flex: 1 }}
			/>
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
