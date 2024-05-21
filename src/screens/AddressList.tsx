import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { ParamText } from '../components/Text';
import { Button, ButtonTypes } from '../components/Button';
import { useTheme } from '../hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList, StackScreens } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import Location from '../../assets/Icons/location';
import LocationFill from '../../assets/Icons/locationFill';
import ArrowRight from '../../assets/Icons/arrowRight';
import { api } from '../service/service';

interface IAddress {
	addressTitle: string;
	addressDetails: string;
	city: string;
}

const width = Dimensions.get('window').width;
const textsWidth = width * 0.35;
const containerPadding = 20;
const renderRowPadding = 16;
const seperatorWidth = width - (renderRowPadding + containerPadding) * 2;

export const AddressList = () => {
	const [addresses, setAddresses] = useState<IAddress[]>([]);
	const { navigate } = useNavigation<RootStackParamList>();
	const [loading, setLoading] = useState(false);
	const { ColorPallet, TextTheme } = useTheme();

	useEffect(() => {
		try {
			setLoading(true);
			api.address.getAll().then(res => setAddresses(res.data));
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}, []);

	const RenderItem = ({ item }: { item: IAddress }) => {
		return (
			<TouchableOpacity style={styles.renderItemContainer}>
				<View style={styles.renderItemLeft}>
					<LocationFill style={styles.locationIcon} />
					<View style={styles.renderItemTexts}>
						<ParamText numberOfLines={2} fontType={'medium14'}>
							{item.addressTitle}
						</ParamText>
						<ParamText
							numberOfLines={1}
							fontType={'light12'}
							style={{ color: ColorPallet.brand.secondaryText }}
						>
							{item.addressDetails}
						</ParamText>
					</View>
				</View>
				<View style={styles.renderItemRight}>
					<ParamText
						style={{ color: ColorPallet.brand.primaryText }}
						fontType={'light12'}
					>
						{item.city}
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
			{loading ? (
				<ActivityIndicator style={styles.flex} />
			) : (
				<View style={styles.innerContainer}>
					<ParamText style={[TextTheme.listTitle]} fontType={'medium14'}>
						Kayıtlı Adresler
					</ParamText>
					<FlatList
						style={styles.flex}
						data={addresses}
						scrollEnabled={addresses.length !== 0}
						ListEmptyComponent={() =>
							loading ? <ActivityIndicator /> : <EmptyList />
						}
						keyExtractor={(_, index) => index.toString()}
						extraData={addresses.length}
						renderItem={({ item }) => <RenderItem item={item} />}
						contentContainerStyle={[
							styles.contentContainer,
							{ borderColor: ColorPallet.grayscale.lightGrey },
						]}
						ItemSeparatorComponent={() => (
							<View
								style={[
									styles.seperator,
									{ backgroundColor: ColorPallet.grayscale.lightGrey },
								]}
							/>
						)}
					/>
				</View>
			)}
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
