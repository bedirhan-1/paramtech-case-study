// useAddAddress.ts
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AxiosResponse } from 'axios';
import BottomSheet from '@gorhom/bottom-sheet';
import { RootStackParamList, StackScreens } from '../types/navigationTypes';
import { AppDispatch, RootState } from '../store/store';
import { AddressInfo, City, IAddress } from '../types/addressTypes';
import { api } from '../service/service';
import {
	addAddress,
	deleteAddress,
	updateAddress,
} from '../store/features/address/addressSlice';
import { StatusTypes } from '../types/addressSliceTypes';
import { ContentType } from '../components/Sheet/InfoSheet';

export const useAddAddress = () => {
	const navigation =
		useNavigation<
			StackNavigationProp<RootStackParamList, StackScreens.addNewAddress>
		>();
	const { params } =
		useRoute<RouteProp<RootStackParamList, StackScreens.addNewAddress>>();
	const { passedAddress } = params ?? {};
	const { status } = useSelector((state: RootState) => state.address);
	const dispatch = useDispatch<AppDispatch>();
	const alertSheetRef = useRef<BottomSheet>(null);
	const citySheetRef = useRef<BottomSheet>(null);
	const [currentAction, setCurrentAction] = useState<ContentType | undefined>();
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
			.catch((error: any) => console.error(error));
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
		setAlertSheetStatus(0);
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
			setConfirmationResponse(null);
		} else if (confirmationResponse === false) {
			setAlertSheetStatus(-1);
			alertSheetRef.current?.close();
			setConfirmationResponse(null);
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

	return {
		params,
		navigation,
		alertSheetRef,
		citySheetRef,
		currentAction,
		isComponentFinished,
		address,
		selectedCity,
		isSubmitDisabled,
		alertSnapPoints,
		cities,
		alertSheetStatus,
		citySheetStatus,
		confirmationResponse,
		handleInputChange,
		handleCitySelection,
		handleCitySelect,
		handleSubmit,
		handleDelete,
		setAlertSheetStatus,
		setCitySheetStatus,
		setConfirmationResponse,
	};
};
