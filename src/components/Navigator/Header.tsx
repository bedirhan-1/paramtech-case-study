import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ParamText } from '../Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import GoBack from '../../../assets/Icons/goBack';
import Language from '../../../assets/Icons/language';
import { setLanguage } from '../../core/i18next.config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_PREFERENCE_KEY = 'LANGUAGE_PREFERENCE';

export const Header = (route: any) => {
	const { top } = useSafeAreaInsets();
	const { goBack } = useNavigation();
	const { TextTheme, ColorPallet } = useTheme();
	const { options } = route;
	const [currentLanguage, setCurrentLanguage] = useState<string>('en');

	useEffect(() => {
		const fetchLanguage = async () => {
			const storedLanguage = await AsyncStorage.getItem(
				LANGUAGE_PREFERENCE_KEY,
			);
			if (storedLanguage) {
				setCurrentLanguage(storedLanguage);
			}
		};
		fetchLanguage().then();
	}, []);

	const handleLanguageChange = async () => {
		const newLanguage = currentLanguage === 'en' ? 'tr' : 'en';
		await setLanguage(newLanguage);
		setCurrentLanguage(newLanguage);
	};

	return (
		<LinearGradient
			colors={[ColorPallet.brand.primaryDark, ColorPallet.brand.primary]}
			style={styles.container}
		>
			<StatusBar barStyle={'light-content'} />
			<View style={{ height: top * 0.5 }} />
			<View style={[styles.titleContainer, styles.endTitle]}>
				{route.progress.previous && (
					<TouchableOpacity
						onPress={() => goBack()}
						style={[styles.icon, styles.arrow]}
					>
						<GoBack color={ColorPallet.grayscale.grey} />
					</TouchableOpacity>
				)}
				<ParamText style={TextTheme.headerLabel} fontType={'regular16'}>
					{options.headerTitle}
				</ParamText>
				<TouchableOpacity
					onPress={handleLanguageChange}
					style={[styles.icon, styles.changeLang]}
				>
					<Language fill={ColorPallet.grayscale.grey} height={30} width={30} />
					<ParamText
						style={{ color: ColorPallet.grayscale.grey }}
						fontType={'medium16'}
					>
						{currentLanguage.toUpperCase()}
					</ParamText>
				</TouchableOpacity>
			</View>
			<View style={styles.endTitle}>
				<ParamText style={[TextTheme.headerTitle]} fontType={'medium20'}>
					{options.title}
				</ParamText>
			</View>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 24,
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
	},
	endTitle: {
		padding: 12,
	},
	icon: {
		position: 'absolute',
		padding: 12,
	},
	arrow: {
		left: 0,
	},
	changeLang: {
		right: 0,
		flexDirection: 'row',
		alignItems: 'center',
	},
});
