import { Dimensions, Image, StatusBar, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, StackScreens } from '../../types/navigationTypes';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppDispatch, RootState } from '../../store/store';
import { fetchAddresses } from '../../store/features/address/addressSlice';
import { ParamText } from '../../components/Text';
import { useTheme } from '../../hooks/useTheme';

export const Splash = () => {
	const { ColorPallet } = useTheme();
	const { replace } =
		useNavigation<
			StackNavigationProp<RootStackParamList, StackScreens.addNewAddress>
		>();
	const dispatch = useDispatch<AppDispatch>();
	const { status } = useSelector((state: RootState) => state.address);

	useEffect(() => {
		setTimeout(() => {
			if (status === 'idle') {
				dispatch(fetchAddresses());
			} else if (status === 'succeeded') {
				replace(StackScreens.addressList);
			}
		}, 1500);
	}, [status]);

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
		objectFit: 'contain',
		alignSelf: 'center',
	},
});
