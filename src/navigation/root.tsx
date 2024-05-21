import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList, StackScreens } from './types';
import { AddressList } from '../screens/AddressList';
import { AddNewAddress } from '../screens/AddNewAddress';
import { Header } from '../components/Navigator/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const RootNavigation = () => {
	const Stack = createStackNavigator<RootStackParamList>();

	return (
		<SafeAreaProvider>
			<Stack.Navigator
				screenOptions={{
					header: props => <Header {...props} />,
				}}
			>
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
	);
};

export default RootNavigation;
