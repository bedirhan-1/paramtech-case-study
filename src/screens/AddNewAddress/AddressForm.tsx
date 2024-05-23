import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ParamInput } from '../../components/Input';
import { IAddress, AddressInfo } from '../../types/addressTypes';

interface AddressFormProps {
	address: IAddress;
	onChange: (field: AddressInfo, value: string) => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({
	address,
	onChange,
}) => {
	return (
		<View style={styles.innerContainer}>
			<ParamInput
				placeholder="Adres başlığı (Ev, işyeri vs.)"
				style={styles.input}
				value={address[AddressInfo.AddressTitle]}
				onChangeText={value => onChange(AddressInfo.AddressTitle, value)}
			/>
			<ParamInput
				placeholder="İl"
				style={styles.input}
				value={address[AddressInfo.City]}
				onChangeText={value => onChange(AddressInfo.City, value)}
			/>
			<ParamInput
				placeholder="İlçe"
				style={styles.input}
				value={address[AddressInfo.District]}
				onChangeText={value => onChange(AddressInfo.District, value)}
			/>
			<ParamInput
				placeholder="Adres Detayı"
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
