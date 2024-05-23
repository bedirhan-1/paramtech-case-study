import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { ParamText } from '../../components/Text';
import { Button, ButtonTypes } from '../../components/Button';
import { useTheme } from '../../hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList, StackScreens } from '../../types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { IAddress } from '../../types/addressTypes';
import { AddressItem } from './AddressItem';
import { EmptyList } from './EmptyList';

const width = Dimensions.get('window').width;
const containerPadding = 20;
const renderRowPadding = 16;
const seperatorWidth = width - (renderRowPadding + containerPadding) * 2;

export const AddressList: React.FC = () => {
	const navigation =
		useNavigation<
			StackNavigationProp<RootStackParamList, StackScreens.addressList>
		>();
	const { ColorPallet, TextTheme } = useTheme();
	const { addresses } = useSelector((state: RootState) => state.address);

	const handlePressed = (address: IAddress) => {
		navigation.navigate(StackScreens.addNewAddress, {
			passedAddress: address,
		});
	};

	return (
		<SafeAreaView
			style={[
				styles.container,
				{ backgroundColor: ColorPallet.brand.background },
			]}
			edges={['bottom']}
		>
			<View style={styles.innerContainer}>
				<ParamText style={[TextTheme.listTitle]} fontType={'medium14'}>
					Kayıtlı Adresler
				</ParamText>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={addresses}
					renderItem={({ item }) => (
						<AddressItem item={item} onPress={() => handlePressed(item)} />
					)}
					scrollEnabled={addresses.length !== 0}
					keyExtractor={(item, index) => item.id || index.toString()}
					extraData={addresses.length}
					ListEmptyComponent={EmptyList}
					ItemSeparatorComponent={() => (
						<View
							style={[
								styles.separator,
								{ backgroundColor: ColorPallet.grayscale.lightGrey },
							]}
						/>
					)}
					style={[styles.flex, { marginBottom: 10 }]}
					contentContainerStyle={[
						styles.contentContainer,
						{ borderColor: ColorPallet.grayscale.lightGrey },
					]}
				/>
			</View>
			<View
				style={[
					styles.footerContainer,
					{ borderColor: ColorPallet.grayscale.lightGrey },
				]}
			>
				<Button
					title={'Yeni Adres Ekle'}
					type={ButtonTypes.primary}
					onPress={() => navigation.navigate(StackScreens.addNewAddress)}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	separator: {
		height: 1,
		alignSelf: 'center',
		width: seperatorWidth,
	},
	footerContainer: {
		borderTopWidth: 1,
		padding: 20,
	},
	flex: {
		flex: 1,
	},
	innerContainer: {
		flex: 1,
		paddingHorizontal: containerPadding,
		paddingTop: 20,
	},
	contentContainer: {
		borderWidth: 1,
		borderRadius: 4,
	},
});
