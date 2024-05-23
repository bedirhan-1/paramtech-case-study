import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ParamText } from '../../components/Text';
import LocationFill from '../../../assets/Icons/locationFill';
import ArrowRight from '../../../assets/Icons/arrowRight';
import { useTheme } from '../../hooks/useTheme';
import { capitalize, formatDistrictCity } from '../../utils/formatting';
import { IAddress } from '../../types/addressTypes';

interface AddressItemProps {
	item: IAddress;
	onPress: () => void;
}

export const AddressItem: React.FC<AddressItemProps> = ({ item, onPress }) => {
	const { ColorPallet } = useTheme();

	return (
		<TouchableOpacity style={styles.renderItemContainer} onPress={onPress}>
			<View style={styles.renderItemLeft}>
				<LocationFill style={styles.locationIcon} />
				<View style={styles.renderItemTexts}>
					<ParamText numberOfLines={2} fontType={'medium14'}>
						{capitalize(item.addressTitle)}
					</ParamText>
					<ParamText
						numberOfLines={1}
						fontType={'light12'}
						style={{ color: ColorPallet.brand.secondaryText }}
					>
						{capitalize(item.addressDetails)}
					</ParamText>
				</View>
			</View>
			<View style={styles.renderItemRight}>
				<ParamText
					style={{ color: ColorPallet.brand.primaryText }}
					fontType={'light12'}
				>
					{formatDistrictCity(item)}
				</ParamText>
				<ArrowRight />
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	renderItemContainer: {
		flexDirection: 'row',
		padding: 16,
	},
	renderItemLeft: {
		flexDirection: 'row',
		flex: 1,
	},
	renderItemTexts: {
		width: Dimensions.get('window').width * 0.35,
	},
	renderItemRight: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	locationIcon: {
		marginRight: 16,
	},
});
