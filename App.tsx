import React from 'react';
import RootNavigation from './src/navigation/root';
import { theme } from './src/theme';
import { ThemeProvider } from './src/context/theme';
import { store } from './src/store/store';
import { Provider } from 'react-redux';

export default function App() {
	return (
		<Provider store={store}>
			<ThemeProvider value={theme}>
				<RootNavigation />
			</ThemeProvider>
		</Provider>
	);
}
