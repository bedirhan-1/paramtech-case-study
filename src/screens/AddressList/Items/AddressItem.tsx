import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ParamText } from '../../../components/Text';
import LocationFill from '../../../../assets/Icons/locationFill';
import ArrowRight from '../../../../assets/Icons/arrowRight';
import { useTheme } from '../../../hooks/useTheme';
import { capitalize } from '../../../utils/formatting';
import { IAddress } from '../../../types/addressTypes';

interface AddressItemProps {
	item: IAddress;
	onPress: () => void;
}

const width = Dimensions.get('window').width;
const textContainerWidth = (width - 40) / 2.5;
const rightSideWidth = textContainerWidth / 1.4;

export const AddressItem: React.FC<AddressItemProps> = ({ item, onPress }) => {
	const { ColorPallet } = useTheme();

	return (
		<TouchableOpacity style={styles.renderItemContainer} onPress={onPress}>
			<View style={styles.renderItemLeft}>
				<LocationFill style={styles.locationIcon} />
				<View style={styles.renderItemTexts}>
					<ParamText numberOfLines={1} fontType={'medium14'}>
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
					numberOfLines={1}
					style={{
						color: ColorPallet.brand.primaryText,
					}}
					fontType={'light12'}
				>
					{capitalize(item.city)}
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
		width: textContainerWidth,
	},
	renderItemRight: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		width: rightSideWidth,
	},
	locationIcon: {
		marginRight: 16,
	},
});
