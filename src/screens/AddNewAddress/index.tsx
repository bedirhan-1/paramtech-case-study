import React, { useEffect, useState, useCallback } from 'react';
import {
	Keyboard,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { Button, ButtonTypes } from '../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList, StackScreens } from '../../types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootState, AppDispatch } from '../../store/store';
import {
	addAddress,
	updateAddress,
} from '../../store/features/address/addressSlice';
import { AddressInfo, IAddress } from '../../types/addressTypes';
import { AddressForm } from './AddressForm';
import { useTranslation } from 'react-i18next';

export const AddNewAddress: React.FC = () => {
	const navigation =
		useNavigation<
			StackNavigationProp<RootStackParamList, StackScreens.addNewAddress>
		>();
	const { params } =
		useRoute<RouteProp<RootStackParamList, StackScreens.addNewAddress>>();
	const { passedAddress } = params ?? {};
	const { ColorPallet } = useTheme();
	const { t } = useTranslation();
	const { status } = useSelector((state: RootState) => state.address);
	const dispatch = useDispatch<AppDispatch>();
	const buttonTitle = params?.passedAddress
		? t('Global.update')
		: t('Global.save');

	const [address, setAddress] = useState<IAddress>({
		[AddressInfo.AddressTitle]: passedAddress?.addressTitle ?? '',
		[AddressInfo.City]: passedAddress?.city ?? '',
		[AddressInfo.District]: passedAddress?.district ?? '',
		[AddressInfo.AddressDetails]: passedAddress?.addressDetails ?? '',
		id: params?.passedAddress?.id ?? '',
	});
	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	const handleChange = useCallback((field: AddressInfo, value: string) => {
		setAddress((prevState: IAddress) => ({
			...prevState,
			[field]: value,
		}));
	}, []);

	const handleSubmit = async () => {
		dispatch(
			params?.passedAddress ? updateAddress(address) : addAddress(address),
		);
		setTimeout(() => {
			navigation.goBack();
		}, 5000);
	};

	useEffect(() => {
		const isFormEmpty =
			!address[AddressInfo.AddressTitle] ||
			!address[AddressInfo.City] ||
			!address[AddressInfo.District] ||
			!address[AddressInfo.AddressDetails];

		if (!params?.passedAddress) {
			setIsDisabled(isFormEmpty);
		} else {
			const isFormUnchanged =
				address[AddressInfo.AddressTitle] ===
					params.passedAddress.addressTitle &&
				address[AddressInfo.City] === params.passedAddress.city &&
				address[AddressInfo.District] === params.passedAddress.district &&
				address[AddressInfo.AddressDetails] ===
					params.passedAddress.addressDetails;

			setIsDisabled(isFormEmpty || isFormUnchanged);
		}
	}, [address, params, passedAddress]);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView
				edges={['bottom']}
				style={[
					styles.container,
					{ backgroundColor: ColorPallet.brand.background },
				]}
			>
				<AddressForm address={address} onChange={handleChange} />
				<View
					style={[
						styles.footerContainer,
						{ borderColor: ColorPallet.grayscale.lightGrey },
					]}
				>
					<Button
						title={buttonTitle}
						type={ButtonTypes.primary}
						onPress={handleSubmit}
						disabled={isDisabled || status === 'loading'}
					/>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	flex: {
		flex: 1,
	},
	footerContainer: {
		borderTopWidth: 1,
		padding: 20,
	},
});
