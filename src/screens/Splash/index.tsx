import { Dimensions, Image, StatusBar, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, StackScreens } from '../../types/navigationTypes';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppDispatch } from '../../store/store';
import { fetchAddresses } from '../../store/features/address/addressSlice';
import { ParamText } from '../../components/Text';
import { useTheme } from '../../hooks/useTheme';
import * as Font from 'expo-font';

export const Splash: React.FC = () => {
	const { ColorPallet } = useTheme();
	const navigation =
		useNavigation<
			StackNavigationProp<RootStackParamList, StackScreens.splash>
		>();
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const prepareApp = async () => {
			try {
				await Font.loadAsync({
					poppinsBlack: require('../../../assets/Fonts/Poppins-Black.ttf'),
					poppinsBold: require('../../../assets/Fonts/Poppins-Bold.ttf'),
					poppinsRegular: require('../../../assets/Fonts/Poppins-Regular.ttf'),
					poppinsSemiBold: require('../../../assets/Fonts/Poppins-SemiBold.ttf'),
					poppinsLight: require('../../../assets/Fonts/Poppins-Light.ttf'),
					poppinsExtraLight: require('../../../assets/Fonts/Poppins-ExtraLight.ttf'),
					poppinsExtraBold: require('../../../assets/Fonts/Poppins-ExtraBold.ttf'),
					poppinsMedium: require('../../../assets/Fonts/Poppins-Medium.ttf'),
				});
				await dispatch(fetchAddresses()).unwrap();
				navigation.replace(StackScreens.addressList);
			} catch (e) {
				console.warn(e);
			}
		};

		prepareApp();
	}, [dispatch, navigation]);

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Image style={styles.logo} source={require('../../../assets/Logo.png')} />
			<ParamText style={{ color: ColorPallet.brand.primary }}>
				<ParamText fontType={'bold16'}>Ödeme yap </ParamText>
				ya da <ParamText fontType={'bold16'}>ödeme al</ParamText>
			</ParamText>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		width: Dimensions.get('window').width - 80,
		resizeMode: 'contain',
		alignSelf: 'center',
	},
});
