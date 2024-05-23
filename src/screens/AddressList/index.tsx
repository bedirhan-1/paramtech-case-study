import React from 'react';
import {
	Dimensions,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { ParamText } from '../../components/Text';
import { Button, ButtonTypes } from '../../components/Button';
import { useTheme } from '../../hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList, StackScreens } from '../../types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import Location from '../../../assets/Icons/location';
import LocationFill from '../../../assets/Icons/locationFill';
import ArrowRight from '../../../assets/Icons/arrowRight';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { capitalize, formatDistrictCity } from '../../utils/formatting';
import { StackNavigationProp } from '@react-navigation/stack';
import { IAddress } from '../../types/addressTypes';

const width = Dimensions.get('window').width;
const textsWidth = width * 0.35;
const containerPadding = 20;
const renderRowPadding = 16;
const seperatorWidth = width - (renderRowPadding + containerPadding) * 2;

export const AddressList = () => {
	const { navigate } =
		useNavigation<
			StackNavigationProp<RootStackParamList, StackScreens.addressList>
		>();
	const { ColorPallet, TextTheme } = useTheme();
	const { addresses } = useSelector((state: RootState) => state.address);

	const handlePressed = (address: IAddress) => {
		navigate(StackScreens.addNewAddress, {
			passedAddress: address,
		});
	};

	const RenderItem = ({ item }: { item: IAddress }) => {
		return (
			<TouchableOpacity
				style={styles.renderItemContainer}
				onPress={() => handlePressed(item)}
			>
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

	const EmptyList = () => {
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
					renderItem={({ item }) => <RenderItem item={item} />}
					scrollEnabled={addresses.length !== 0}
					keyExtractor={(_, index) => index.toString()}
					extraData={addresses.length}
					ListEmptyComponent={() => <EmptyList />}
					ItemSeparatorComponent={() => (
						<View
							style={[
								styles.seperator,
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
					onPress={() => navigate(StackScreens.addNewAddress)}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	renderItemContainer: {
		flexDirection: 'row',
		padding: renderRowPadding,
	},
	renderItemLeft: {
		flexDirection: 'row',
		flex: 1,
	},
	iconMargin: {
		marginRight: 16,
	},
	renderItemTexts: {
		width: textsWidth,
	},
	renderItemRight: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	seperator: {
		height: 1,
		alignSelf: 'center',
		width: seperatorWidth,
	},
	emptyListContainer: {
		paddingVertical: width * 0.3,
		alignItems: 'center',
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
	locationIcon: {
		marginRight: 16,
	},
});
