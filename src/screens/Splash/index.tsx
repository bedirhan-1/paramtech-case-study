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
import { useTranslation } from 'react-i18next';
import { ErrorAlert } from '../../utils/errorAlert';

export const Splash: React.FC = () => {
	const { ColorPallet } = useTheme();
	const navigation =
		useNavigation<
			StackNavigationProp<RootStackParamList, StackScreens.splash>
		>();
	const { t } = useTranslation();
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const prepareApp = async () => {
			try {
				await dispatch(fetchAddresses());
				navigation.replace(StackScreens.addressList);
			} catch (e: any) {
				ErrorAlert(e, t('Global.error'), t('Global.ok'));
			}
		};

		prepareApp();
	}, [dispatch, navigation]);

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Image style={styles.logo} source={require('../../../assets/Logo.png')} />
			<ParamText style={{ color: ColorPallet.brand.primary }}>
				<ParamText fontType={'bold16'}>{t('Global.pay')}</ParamText>
				{t('Global.or')}
				<ParamText fontType={'bold16'}>{t('Global.get-paid')}</ParamText>
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
