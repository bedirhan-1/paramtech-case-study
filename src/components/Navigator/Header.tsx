import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ParamText } from '../Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import GoBack from '../../../assets/Icons/goBack';

export const Header = (route: any) => {
	const { top } = useSafeAreaInsets();
	const { goBack } = useNavigation();
	const { TextTheme, ColorPallet } = useTheme();
	const { options } = route;

	return (
		<LinearGradient
			colors={[ColorPallet.brand.primaryDark, ColorPallet.brand.primary]}
			style={styles.container}
		>
			<StatusBar barStyle={'light-content'} />
			<View style={{ height: top * 0.5 }} />
			<View style={[styles.titleContainer, styles.endTitle]}>
				{route.progress.previous && (
					<TouchableOpacity onPress={() => goBack()} style={styles.icon}>
						<GoBack color={ColorPallet.grayscale.grey} />
					</TouchableOpacity>
				)}
				<ParamText style={TextTheme.headerLabel} fontType={'regular16'}>
					{options.headerTitle}
				</ParamText>
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
		left: 0,
	},
});
