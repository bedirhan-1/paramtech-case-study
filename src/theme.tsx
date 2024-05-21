import { Platform, StyleSheet, TextStyle } from 'react-native';

export const mediumOpacity = 0.5;
export const activeOpacity = 0.7;
export const heavyOpacity = 0.3;
export const borderRadius = 16;

const safeMarginTop = Platform.OS == 'ios' ? 60 : 40;
const size = Platform.OS == 'ios' ? 6 : 4;

export interface IGrayscaleColors {
	black: string;
	mediumGrey: string;
	grey: string;
	lightGrey: string;
	semiLightGrey: string;
	white: string;
}

export interface IBrandColors {
	primary: string;
	primaryDark: string;
	primaryText: string;
	secondaryText: string;
	secondary: string;
	background: string;
}

const GrayscaleColors = {
	lightGrey: '#EEF0F4',
	semiLightGrey: '#E6E9EE',
	grey: '#C2BBCF',
	mediumGrey: 'rgb(144,154,164)',
	white: '#FFFFFF',
	black: '#000000',
};

const BrandColors = {
	primary: `rgba(68, 14, 133, 1)`,
	primaryDark: 'rgba(34, 12, 69, 1)',
	secondary: '#019693',
	primaryText: '#3D2852',
	secondaryText: '#6F6085',
	background: '#FFFFFF',
};

export const ColorPallet: IColorPallet = {
	grayscale: GrayscaleColors,
	brand: BrandColors,
};

export const FontTheme = {
	light12: {
		fontSize: 12,
		fontWeight: 'poppinsLight',
	},
	light14: {
		fontSize: 14,
		fontFamily: 'poppinsLight',
	},
	light16: {
		fontSize: 16,
		fontFamily: 'poppinsLight',
	},
	light18: {
		fontSize: 16,
		fontFamily: 'poppinsLight',
	},
	light20: {
		fontSize: 20,
		fontFamily: 'poppinsLight',
	},
	light22: {
		fontSize: 22,
		fontFamily: 'poppinsLight',
	},
	light24: {
		fontSize: 24,
		fontFamily: 'poppinsLight',
	},
	light28: {
		fontSize: 28,
		fontFamily: 'poppinsLight',
	},
	light36: {
		fontSize: 36,
		fontFamily: 'poppinsLight',
	},
	regular12: {
		fontSize: 12,
		fontFamily: 'poppinsRegular',
	},
	regular14: {
		fontSize: 14,
		fontFamily: 'poppinsRegular',
	},
	regular16: {
		fontSize: 16,
		fontFamily: 'poppinsRegular',
	},
	regular18: {
		fontSize: 18,
		fontFamily: 'poppinsRegular',
	},
	regular20: {
		fontSize: 20,
		fontFamily: 'poppinsRegular',
	},
	regular22: {
		fontSize: 22,
		fontFamily: 'poppinsRegular',
	},
	regular24: {
		fontSize: 24,
		fontFamily: 'poppinsRegular',
	},
	regular28: {
		fontSize: 28,
		fontFamily: 'poppinsRegular',
	},
	regular36: {
		fontSize: 36,
		fontFamily: 'poppinsRegular',
	},
	medium14: {
		fontSize: 14,
		fontFamily: 'poppinsMedium',
	},
	medium16: {
		fontSize: 16,
		fontFamily: 'poppinsMedium',
	},
	medium18: {
		fontSize: 18,
		fontFamily: 'poppinsMedium',
	},
	medium20: {
		fontSize: 20,
		fontFamily: 'poppinsMedium',
	},
	medium22: {
		fontSize: 22,
		fontFamily: 'poppinsMedium',
	},
	medium24: {
		fontSize: 24,
		fontFamily: 'poppinsMedium',
	},
	medium28: {
		fontSize: 28,
		fontFamily: 'poppinsMedium',
	},
	medium36: {
		fontSize: 36,
		fontFamily: 'poppinsMedium',
	},
	bold14: {
		fontSize: 14,
		fontFamily: 'poppinsBold',
	},
	bold16: {
		fontSize: 16,
		fontFamily: 'poppinsBold',
	},
	bold22: {
		fontSize: 22,
		fontFamily: 'poppinsBold',
	},
	bold24: {
		fontSize: 24,
		fontFamily: 'poppinsBold',
	},
	bold28: {
		fontSize: 28,
		fontFamily: 'poppinsBold',
	},
	bold36: {
		fontSize: 28,
		fontFamily: 'poppinsBold',
	},
};

export enum FontStyleEnum {
	light12 = 'light12',
	light14 = 'light14',
	light16 = 'light16',
	light18 = 'light18',
	light20 = 'light20',
	light22 = 'light22',
	light24 = 'light24',
	light28 = 'light28',
	light36 = 'light36',
	regular12 = 'regular12',
	regular14 = 'regular14',
	regular16 = 'regular16',
	regular18 = 'regular18',
	regular20 = 'regular20',
	regular22 = 'regular22',
	regular24 = 'regular24',
	regular28 = 'regular28',
	regular36 = 'regular36',
	medium14 = 'medium14',
	medium16 = 'medium16',
	medium18 = 'medium18',
	medium20 = 'medium20',
	medium22 = 'medium22',
	medium24 = 'medium24',
	medium28 = 'medium28',
	medium36 = 'medium36',
	bold14 = 'bold14',
	bold16 = 'bold16',
	bold22 = 'bold22',
	bold24 = 'bold24',
	bold28 = 'bold28',
	bold36 = 'bold36',
}

export const TextTheme = {
	headerLabel: {
		color: ColorPallet.grayscale.mediumGrey,
		textAlign: 'center',
	},
	headerTitle: {
		color: ColorPallet.grayscale.white,
		textAlign: 'center',
	},
	listTitle: {
		marginBottom: 10,
		color: ColorPallet.brand.primaryText,
	},
};

export interface IColorPallet {
	brand: IBrandColors;
	grayscale: IGrayscaleColors;
}

const Inputs = StyleSheet.create({
	textInput: {
		borderColor: ColorPallet.brand.secondary,
		borderWidth: 2,
		fontSize: 16,
		borderRadius: borderRadius,
		padding: 10,
	},
	inputSelected: {
		borderColor: ColorPallet.brand.primary,
	},
	singleSelect: {
		borderRadius: borderRadius * 2,
		padding: 12,
	},

	singleSelectIcon: {
		color: ColorPallet.grayscale.white,
	},
	checkBoxColor: {
		color: ColorPallet.brand.primary,
	},
});

export const Buttons = {
	primary: {
		backgroundColor: BrandColors.secondary,
		borderRadius: size,
		padding: size * 3,
	},
	primaryDisabled: {
		backgroundColor: ColorPallet.grayscale.lightGrey,
		borderRadius: size,
		padding: size * 3,
	},
};

export interface IButtonText {
	primaryText: TextStyle;
	primaryDisabledText: TextStyle;
}

export const ButtonText: IButtonText = {
	primaryText: {
		color: GrayscaleColors.white,
		textAlign: 'center',
	},
	primaryDisabledText: {
		fontFamily: 'poppinsMedium',
		color: ColorPallet.grayscale.mediumGrey,
		textAlign: 'center',
	},
};

export type Theme = {
	BrandColors: typeof BrandColors;
	Buttons: typeof Buttons;
	ButtonText: typeof ButtonText;
	heavyOpacity: typeof heavyOpacity;
	activeOpacity: number;
	safeMarginTop: number;
	ColorPallet: typeof ColorPallet;
	Inputs: typeof Inputs;
	size: number;
	FontTheme: typeof FontTheme;
	TextTheme: typeof TextTheme;
};

export const theme: Theme = {
	BrandColors,
	activeOpacity,
	safeMarginTop,
	heavyOpacity,
	ColorPallet,
	FontTheme,
	TextTheme,
	Buttons,
	ButtonText,
	Inputs,
	size,
};
