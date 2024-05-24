import React, {
	Keyboard,
	Platform,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	StyleSheet,
} from 'react-native';
import { Button, ButtonTypes } from '../../components/Button';
import { useTheme } from '../../hooks/useTheme';
import { AddressForm } from './Items/AddressForm';
import { useTranslation } from 'react-i18next';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import { ParamText } from '../../components/Text';
import { InfoSheet } from '../../components/Sheet/InfoSheet';
import SelectSheet from '../../components/Sheet/SelectSheet';
import { useAddAddress } from '../../hooks/useAddAddress';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { StatusTypes } from '../../types/addressSliceTypes';

export const AddNewAddress = () => {
	const { ColorPallet } = useTheme();
	const { t } = useTranslation();
	const { status } = useSelector((state: RootState) => state.address);
	const {
		params,
		alertSheetRef,
		citySheetRef,
		currentAction,
		address,
		selectedCity,
		isSubmitDisabled,
		alertSnapPoints,
		cities,
		alertSheetStatus,
		citySheetStatus,
		handleInputChange,
		handleCitySelection,
		handleCitySelect,
		handleSubmit,
		handleDelete,
		setAlertSheetStatus,
		setCitySheetStatus,
		setConfirmationResponse,
	} = useAddAddress();

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
					cityOnPress={() => {
						setCitySheetStatus(0);
					}}
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
						disabled={isSubmitDisabled || status === StatusTypes.loading}
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
				<InfoSheet
					contentType={currentAction}
					setAnswerYesOrNo={setConfirmationResponse}
					onChange={setAlertSheetStatus}
					snapPoints={alertSnapPoints}
					ref={alertSheetRef}
					index={alertSheetStatus}
				/>
				<SelectSheet
					snapPoints={['80%']}
					index={citySheetStatus}
					ref={citySheetRef}
					onChange={setCitySheetStatus}
					data={cities}
					onPress={handleCitySelection}
					onSelect={handleCitySelect}
					selectedItem={selectedCity}
				/>
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
