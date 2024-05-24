import { Platform, View, StyleSheet } from 'react-native';
import { ParamText } from '../Text';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import CityItem from '../../screens/AddNewAddress/CityItem';
import { Button, ButtonTypes } from '../Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { City } from '../../types/addressTypes';

type SelectSheetProps = {
	data: City[];
	onSelect: () => void;
	onPress: (city: City) => void;
	selectedItem: string;
};

const SelectSheet: React.FC<SelectSheetProps> = ({
	data,
	onSelect,
	onPress,
	selectedItem,
}) => {
	const { t } = useTranslation();
	const { ColorPallet } = useTheme();
	return (
		<>
			<View
				style={{
					borderBottomWidth: 1,
					borderColor: ColorPallet.grayscale.semiLightGrey,
				}}
			>
				<ParamText
					style={[styles.cityListHeader, { color: ColorPallet.brand.primary }]}
				>
					{t('Add-Address.choose-city')}
				</ParamText>
			</View>
			<BottomSheetFlatList
				data={data}
				keyExtractor={item => item.id.toString()}
				renderItem={({ item }) => (
					<CityItem
						item={item}
						onPress={onPress}
						isSelected={item.city === selectedItem}
					/>
				)}
				ItemSeparatorComponent={() => (
					<View
						style={[
							styles.separator,
							{ backgroundColor: ColorPallet.grayscale.semiLightGrey },
						]}
					/>
				)}
				contentContainerStyle={styles.listContainer}
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
				<Button
					title={t('Global.choose')}
					type={ButtonTypes.Primary}
					disabled={selectedItem === ''}
					onPress={onSelect}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	cityListHeader: {
		padding: 16,
		textAlign: 'center',
	},
	separator: {
		width: '95%',
		height: 1,
		alignSelf: 'center',
	},
	listContainer: {
		flexGrow: 1,
	},
	footerContainer: {
		borderTopWidth: 1,
		padding: 20,
	},
});

export default SelectSheet;
