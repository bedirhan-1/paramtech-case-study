import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList, StackScreens } from '../types/navigationTypes';
import { AddressList } from '../screens/AddressList';
import { AddNewAddress } from '../screens/AddNewAddress';
import { Header } from '../components/Navigator/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Splash } from '../screens/Splash';
import { NavigationContainer } from '@react-navigation/native';

const RootNavigation = () => {
	const Stack = createStackNavigator<RootStackParamList>();

	return (
		<NavigationContainer>
			<SafeAreaProvider>
				<Stack.Navigator
					screenOptions={{
						header: props => <Header {...props} />,
					}}
					initialRouteName={StackScreens.splash}
				>
					<Stack.Screen
						name={StackScreens.splash}
						component={Splash}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name={StackScreens.addressList}
						component={AddressList}
						options={{ title: 'Adres Bilgilerin', headerTitle: 'Adreslerim' }}
					/>
					<Stack.Screen
						name={StackScreens.addNewAddress}
						component={AddNewAddress}
						options={{ title: 'Adres Bilgilerin', headerTitle: 'Adreslerim' }}
					/>
				</Stack.Navigator>
			</SafeAreaProvider>
		</NavigationContainer>
	);
};

export default RootNavigation;
