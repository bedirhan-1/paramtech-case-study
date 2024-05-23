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
import { AddressInfo, IAddress } from '../../types/addressTypes';
import { AddressForm } from './AddressForm';
import { useTranslation } from 'react-i18next';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import { ParamText } from '../../components/Text';
import BottomSheet from '@gorhom/bottom-sheet';
import { ContentType, SheetContent } from './SheetContent';
import { StatusTypes } from '../../types/addressSliceTypes';

export const AddNewAddress: React.FC = () => {
	const navigation =
		useNavigation<
			StackNavigationProp<RootStackParamList, StackScreens.addNewAddress>
		>();
	const { params } =
		useRoute<RouteProp<RootStackParamList, StackScreens.addNewAddress>>();
	const { passedAddress } = params ?? {};
	const [actionType, setActionType] = useState<ContentType>();
	const { ColorPallet } = useTheme();
	const { t } = useTranslation();
	const { status } = useSelector((state: RootState) => state.address);
	const dispatch = useDispatch<AppDispatch>();
	const bottomSheetRef = useRef<BottomSheet>(null);
	const [componentDidFinish, setComponentDidFinish] = useState(false);
	const [address, setAddress] = useState<IAddress>({
		[AddressInfo.AddressTitle]: passedAddress?.addressTitle ?? '',
		[AddressInfo.City]: passedAddress?.city ?? '',
		[AddressInfo.District]: passedAddress?.district ?? '',
		[AddressInfo.AddressDetails]: passedAddress?.addressDetails ?? '',
		id: params?.passedAddress?.id ?? '',
	});
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const snapPoints = useMemo(() => ['30%'], []);

	const handleChange = useCallback((field: AddressInfo, value: string) => {
		setAddress((prevState: IAddress) => ({
			...prevState,
			[field]: value,
		}));
	}, []);

	const handleSubmit = async () => {
		if (params?.passedAddress) {
			setActionType(ContentType.update);
			dispatch(updateAddress(address));
		} else {
			if (actionType === ContentType.delete) {
				dispatch(deleteAddress(address.id));
			} else {
				setActionType(ContentType.create);
				dispatch(addAddress(address));
			}
		}
		setComponentDidFinish(true);
	};

	const handleDelete = async () => {
		await dispatch(deleteAddress(address.id));
		setActionType(ContentType.delete);
		setComponentDidFinish(true);
	};

	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);

	useEffect(() => {
		if (componentDidFinish && status === StatusTypes.succeeded) {
			bottomSheetRef.current?.expand();
			setTimeout(() => {
				navigation.goBack();
			}, 5000);
		}
	}, [componentDidFinish, status, navigation]);

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
	}, [address, params]);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View
				style={[
					styles.container,
					{ backgroundColor: ColorPallet.brand.background },
				]}
			>
				<AddressForm address={address} onChange={handleChange} />
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
							type={ButtonTypes.primary}
							onPress={handleDelete}
							style={styles.deleteButton}
						/>
					)}
					<Button
						title={
							params?.passedAddress ? t('Global.update') : t('Global.save')
						}
						type={ButtonTypes.primary}
						onPress={handleSubmit}
						disabled={isDisabled || status === 'loading'}
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
				{componentDidFinish && <View style={styles.overlay} />}
				<BottomSheet
					snapPoints={snapPoints}
					ref={bottomSheetRef}
					onChange={handleSheetChanges}
					index={-1}
					handleIndicatorStyle={{
						backgroundColor: ColorPallet.grayscale.lightGrey,
					}}
				>
					<SheetContent contentType={actionType} />
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
