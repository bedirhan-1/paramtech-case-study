import React, { useEffect, useState } from 'react';
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

export const AddNewAddress: React.FC = () => {
	const { goBack } =
		useNavigation<
			StackNavigationProp<RootStackParamList, StackScreens.addNewAddress>
		>();
	const { params } =
		useRoute<RouteProp<RootStackParamList, StackScreens.addNewAddress>>();
	const { passedAddress } = params ?? {};
	const { ColorPallet } = useTheme();
	const { status } = useSelector((state: RootState) => state.address);
	const dispatch = useDispatch<AppDispatch>();

	const [address, setAddress] = useState<IAddress>({
		[AddressInfo.AddressTitle]: passedAddress?.addressTitle ?? '',
		[AddressInfo.City]: passedAddress?.city ?? '',
		[AddressInfo.District]: passedAddress?.district ?? '',
		[AddressInfo.AddressDetails]: passedAddress?.addressDetails ?? '',
		id: params?.passedAddress.id ?? '',
	});

	const [isDisabled, setIsDisabled] = useState(true);

	const handleChange = (field: AddressInfo) => (value: string) => {
		setAddress((prevState: IAddress) => ({ ...prevState, [field]: value }));
	};

	const handleSubmit = async () => {
		dispatch(
			params?.passedAddress ? updateAddress(address) : addAddress(address),
		);
		setTimeout(() => {
			goBack();
		}, 5000);
	};

	useEffect(() => {
		const isButtonDisabled =
			!address[AddressInfo.AddressTitle] ||
			!address[AddressInfo.City] ||
			!address[AddressInfo.District] ||
			!address[AddressInfo.AddressDetails];
		setIsDisabled(isButtonDisabled);
	}, [address]);

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
					<View style={styles.innerContainer}>
						<ParamInput
							placeholder="Adres başlığı (Ev, işyeri vs.)"
							style={styles.input}
							value={address[AddressInfo.AddressTitle]}
							onChangeText={handleChange(AddressInfo.AddressTitle)}
						/>
						<ParamInput
							placeholder="İl"
							style={styles.input}
							value={address[AddressInfo.City]}
							onChangeText={handleChange(AddressInfo.City)}
						/>
						<ParamInput
							placeholder="İlçe"
							style={styles.input}
							value={address[AddressInfo.District]}
							onChangeText={handleChange(AddressInfo.District)}
						/>
						<ParamInput
							placeholder="Adres Detayı"
							style={styles.input}
							value={address[AddressInfo.AddressDetails]}
							onChangeText={handleChange(AddressInfo.AddressDetails)}
						/>
					</View>
					<View
						style={[
							styles.footerContainer,
							{ borderColor: ColorPallet.grayscale.lightGrey },
						]}
					>
						<Button
							title="Kaydet"
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
	innerContainer: {
		flex: 1,
		padding: 20,
	},
	input: {
		marginBottom: 10,
	},
	footerContainer: {
		borderTopWidth: 1,
		padding: 20,
	},
});
