import React, { memo } from 'react';
import { City } from '../../types/addressTypes';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ParamText } from '../../components/Text';
import Circle from '../../../assets/Icons/circle';
import { ColorPallet } from '../../theme';

const CityItem = memo(
	({
		item,
		onPress,
		isSelected,
	}: {
		item: City;
		onPress: (city: City) => void;
		isSelected: boolean;
	}) => (
		<TouchableOpacity
			onPress={() => onPress(item)}
			style={styles.renderItemContainer}
		>
			<ParamText style={{ color: ColorPallet.brand.primary }}>
				{item.city}
			</ParamText>
			{isSelected ? <Circle fill={ColorPallet.brand.primary} /> : <Circle />}
		</TouchableOpacity>
	),
);

const styles = StyleSheet.create({
	renderItemContainer: {
		padding: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});

export default CityItem;
