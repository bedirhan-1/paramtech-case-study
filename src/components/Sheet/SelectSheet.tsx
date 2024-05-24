import { Platform, View, StyleSheet } from 'react-native';
import { ParamText } from '../Text';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import CityItem from '../../screens/AddNewAddress/Items/CityItem';
import { Button, ButtonTypes } from '../Button';
import React, { Dispatch, SetStateAction, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { City } from '../../types/addressTypes';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

type SelectSheetProps = {
	data: City[];
	onSelect: () => void;
	onPress: (city: City) => void;
	selectedItem: string;
	snapPoints: string[];
	index: number;
	onChange: Dispatch<SetStateAction<number>>;
};

const SelectSheet = forwardRef<BottomSheetMethods, SelectSheetProps>(
	(
		{ data, onSelect, onPress, selectedItem, index, onChange, snapPoints },
		ref,
	) => {
		const { t } = useTranslation();
		const { ColorPallet } = useTheme();
		return (
			<BottomSheet
				snapPoints={snapPoints}
				index={index}
				ref={ref}
				onChange={onChange}
			>
				<View
					style={{
						borderBottomWidth: 1,
						borderColor: ColorPallet.grayscale.semiLightGrey,
					}}
				>
					<ParamText
						style={[
							styles.cityListHeader,
							{ color: ColorPallet.brand.primary },
						]}
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
			</BottomSheet>
		);
	},
);

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
