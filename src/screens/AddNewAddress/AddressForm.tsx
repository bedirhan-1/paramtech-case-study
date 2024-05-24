import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ParamInput } from '../../components/Input';
import { IAddress, AddressInfo } from '../../types/addressTypes';
import { useTranslation } from 'react-i18next';

interface AddressFormProps {
	address: IAddress;
	onChange: (field: AddressInfo, value: string) => void;
	cityOnPress: () => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({
	address,
	onChange,
	cityOnPress,
}) => {
	const { t } = useTranslation();
	return (
		<View style={styles.innerContainer}>
			<ParamInput
				maxLength={12}
				placeholder={t('Add-Address.address-title')}
				style={styles.input}
				value={address[AddressInfo.AddressTitle]}
				onChangeText={value => onChange(AddressInfo.AddressTitle, value)}
			/>
			<ParamInput
				placeholder={t('Add-Address.city')}
				style={styles.input}
				value={address[AddressInfo.City]}
				multipleSelect={true}
				onMultiSelect={cityOnPress}
				onChangeText={value => onChange(AddressInfo.City, value)}
			/>
			<ParamInput
				placeholder={t('Add-Address.district')}
				style={styles.input}
				value={address[AddressInfo.District]}
				onChangeText={value => onChange(AddressInfo.District, value)}
			/>
			<ParamInput
				placeholder={t('Add-Address.address-details')}
				style={styles.input}
				value={address[AddressInfo.AddressDetails]}
				onChangeText={value => onChange(AddressInfo.AddressDetails, value)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	innerContainer: {
		flex: 1,
		padding: 20,
	},
	input: {
		marginBottom: 10,
	},
});
