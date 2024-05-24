import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import {
	Keyboard,
	Platform,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { Button, ButtonTypes } from '../../components/Button';
import { useTheme } from '../../hooks/useTheme';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, StackScreens } from '../../types/navigationTypes';
import { AppDispatch, RootState } from '../../store/store';
import {
	addAddress,
	deleteAddress,
	updateAddress,
} from '../../store/features/address/addressSlice';
import { AddressInfo, City, IAddress } from '../../types/addressTypes';
import { AddressForm } from './AddressForm';
import { useTranslation } from 'react-i18next';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import { ParamText } from '../../components/Text';
import BottomSheet from '@gorhom/bottom-sheet';
import { ContentType, InfoSheet } from '../../components/Sheet/InfoSheet';
import { StatusTypes } from '../../types/addressSliceTypes';
import { api } from '../../service/service';
import { AxiosResponse } from 'axios';
import SelectSheet from '../../components/Sheet/SelectSheet';

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
	const alertSheetRef = useRef<BottomSheet>(null);
	const citySheetRef = useRef<BottomSheet>(null);
	const [currentAction, setCurrentAction] = useState<ContentType>();
	const [isComponentFinished, setIsComponentFinished] = useState(false);
	const [address, setAddress] = useState<IAddress>({
		[AddressInfo.AddressTitle]: passedAddress?.addressTitle ?? '',
		[AddressInfo.City]: passedAddress?.city ?? '',
		[AddressInfo.District]: passedAddress?.district ?? '',
		[AddressInfo.AddressDetails]: passedAddress?.addressDetails ?? '',
		id: passedAddress?.id ?? '',
	});
	const [selectedCity, setSelectedCity] = useState<string>(address.city);
	const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
	const alertSnapPoints = useMemo(() => ['30%'], []);
	const [cities, setCities] = useState<City[]>([]);
	const [alertSheetStatus, setAlertSheetStatus] = useState(-1);
	const [citySheetStatus, setCitySheetStatus] = useState(-1);
	const [confirmationResponse, setConfirmationResponse] = useState<
		boolean | null
	>(null);

	useEffect(() => {
		api.city
			.getAll()
			.then((res: AxiosResponse<City[], any>) => setCities(res.data))
			.catch(error => console.error(error));
	}, []);

	const handleInputChange = useCallback((field: AddressInfo, value: string) => {
		setAddress((prevState: IAddress) => ({
			...prevState,
			[field]: value,
		}));
	}, []);

	const handleCitySelection = useCallback((city: City) => {
		handleInputChange(AddressInfo.City, city.city);
		setSelectedCity(prevCity => (prevCity === city.city ? '' : city.city));
	}, []);

	const handleCitySelect = () => {
		citySheetRef.current?.close();
	};

	const handleSubmit = async () => {
		if (params?.passedAddress) {
			setCurrentAction(ContentType.update);
			dispatch(updateAddress(address));
		} else {
			setCurrentAction(ContentType.create);
			dispatch(addAddress(address));
		}
		setIsComponentFinished(true);
	};

	const handleDelete = async () => {
		setCurrentAction(ContentType.alert);
		setAlertSheetStatus(0);
	};

	useEffect(() => {
		if (confirmationResponse === true) {
			dispatch(deleteAddress(address.id));
			setCurrentAction(ContentType.delete);
			setIsComponentFinished(true);
			setConfirmationResponse(null); // Resetting the answer after deletion
		} else if (confirmationResponse === false) {
			setAlertSheetStatus(-1);
			alertSheetRef.current?.close();
			setConfirmationResponse(null); // Resetting the answer after closing
		}
	}, [confirmationResponse]);

	useEffect(() => {
		if (isComponentFinished && status === StatusTypes.succeeded) {
			alertSheetRef.current?.expand();
			setTimeout(() => {
				navigation.goBack();
			}, 5000);
		}
	}, [isComponentFinished, status, navigation]);

	useEffect(() => {
		const isFormEmpty =
			!address[AddressInfo.AddressTitle] ||
			!selectedCity ||
			!address[AddressInfo.District] ||
			!address[AddressInfo.AddressDetails];
		if (!params?.passedAddress) {
			setIsSubmitDisabled(isFormEmpty);
		} else {
			const isFormUnchanged =
				address[AddressInfo.AddressTitle] ===
					params.passedAddress.addressTitle &&
				selectedCity === params.passedAddress.city &&
				address[AddressInfo.District] === params.passedAddress.district &&
				address[AddressInfo.AddressDetails] ===
					params.passedAddress.addressDetails;
			setIsSubmitDisabled(isFormEmpty || isFormUnchanged);
		}
	}, [address, selectedCity, params]);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View
				style={[
					styles.container,
					{ backgroundColor: ColorPallet.brand.background },
				]}
			>
				<AddressForm
					address={address}
					onChange={handleInputChange}
					cityOnPress={() => citySheetRef.current?.expand()}
				/>
				<View
					style={[
						styles.footerContainer,
						{
							borderColor: ColorPallet.grayscale.lightGrey,
							marginBottom: Platform.OS === 'ios' ? 30 : 0,
						},
					]}
				>
					{params?.passedAddress && (
						<Button
							title={t('Global.delete')}
							type={ButtonTypes.Secondary}
							onPress={handleDelete}
							style={styles.deleteButton}
						/>
					)}
					<Button
						title={
							params?.passedAddress ? t('Global.update') : t('Global.save')
						}
						type={ButtonTypes.Primary}
						onPress={handleSubmit}
						disabled={isSubmitDisabled || status === 'loading'}
					/>
				</View>
				{Platform.OS === 'ios' && (
					<KeyboardAccessoryView
						style={[
							styles.keyboardButtonContainer,
							{
								borderColor: ColorPallet.grayscale.semiLightGrey,
								backgroundColor: ColorPallet.brand.background,
							},
						]}
					>
						<TouchableOpacity
							onPress={() => Keyboard.dismiss()}
							style={styles.doneButton}
						>
							<ParamText
								fontType="bold14"
								style={{ color: ColorPallet.brand.primaryText }}
							>
								{t('Global.done')}
							</ParamText>
						</TouchableOpacity>
					</KeyboardAccessoryView>
				)}
				{(alertSheetStatus === 0 || citySheetStatus === 0) && (
					<View style={styles.overlay} />
				)}
				<BottomSheet
					snapPoints={alertSnapPoints}
					ref={alertSheetRef}
					index={alertSheetStatus}
					handleIndicatorStyle={{
						backgroundColor: ColorPallet.grayscale.lightGrey,
					}}
					onChange={setAlertSheetStatus}
				>
					<InfoSheet
						contentType={currentAction}
						setAnswerYesOrNo={setConfirmationResponse}
					/>
				</BottomSheet>
				<BottomSheet
					snapPoints={['80%']}
					index={citySheetStatus}
					ref={citySheetRef}
					handleIndicatorStyle={{
						backgroundColor: ColorPallet.grayscale.lightGrey,
					}}
					onChange={setCitySheetStatus}
				>
					<SelectSheet
						data={cities}
						onPress={handleCitySelection}
						onSelect={handleCitySelect}
						selectedItem={selectedCity}
					/>
				</BottomSheet>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	footerContainer: {
		borderTopWidth: 1,
		padding: 20,
	},
	keyboardButtonContainer: {
		borderTopWidth: 1,
	},
	doneButton: {
		padding: 10,
		alignSelf: 'flex-end',
	},
	deleteButton: {
		marginBottom: 10,
	},
	overlay: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		left: 0,
		top: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
});
