import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ParamText } from '../../components/Text';
import Location from '../../../assets/Icons/location';
import { useTheme } from '../../hooks/useTheme';

export const EmptyList: React.FC = () => {
	const { ColorPallet } = useTheme();

	return (
		<View
			style={[
				styles.emptyListContainer,
				{ borderColor: ColorPallet.grayscale.lightGrey },
			]}
		>
			<Location color={ColorPallet.brand.primary} />
			<ParamText style={{ color: ColorPallet.brand.primaryText }}>
				Henüz hiç adresiniz yok
			</ParamText>
		</View>
	);
};

const styles = StyleSheet.create({
	emptyListContainer: {
		paddingVertical: Dimensions.get('window').width * 0.3,
		alignItems: 'center',
	},
});
