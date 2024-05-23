import React, { useEffect, useState, useCallback } from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { ParamInput } from '../../components/Input';
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

export const AddNewAddress: React.FC = () => {
	const navigation =
		useNavigation<
			StackNavigationProp<RootStackParamList, StackScreens.addNewAddress>
		>();
	const { params } =
		useRoute<RouteProp<RootStackParamList, StackScreens.addNewAddress>>();
	const { passedAddress } = params ?? {};
	const { ColorPallet } = useTheme();
	const { status } = useSelector((state: RootState) => state.address);
	const dispatch = useDispatch<AppDispatch>();

	const [buttonTitle, setButtonTitle] = useState(
		params?.passedAddress ? 'Güncelle' : 'Kaydet',
	);
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
		setIsDisabled(isFormEmpty);
	}, [address]);

	useEffect(() => {
		if (params?.passedAddress) {
			const isFormUnchanged =
				address[AddressInfo.AddressTitle] ===
					params.passedAddress.addressTitle &&
				address[AddressInfo.City] === params.passedAddress.city &&
				address[AddressInfo.District] === params.passedAddress.district &&
				address[AddressInfo.AddressDetails] ===
					params.passedAddress.addressDetails;
			setIsDisabled(isFormUnchanged);
		}
	}, [address, params, passedAddress]);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={[
					styles.container,
					{ backgroundColor: ColorPallet.brand.background },
				]}
			>
				<SafeAreaView edges={['bottom']} style={styles.flex}>
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
			</KeyboardAvoidingView>
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
