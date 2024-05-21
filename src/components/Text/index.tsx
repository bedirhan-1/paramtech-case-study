import React, { ReactNode } from 'react';
import {
	StyleSheet,
	Text as NativeText,
	TextProps,
	TextStyle,
} from 'react-native';
import { ColorPallet, FontStyleEnum, FontTheme } from '../../theme';

interface ParamTextType extends TextProps {
	children: string | ReactNode | ReactNode[];
	style?: any;
	fontType?: keyof typeof FontStyleEnum;
	color?: keyof typeof FontTheme;
}

export const ParamText: React.FC<ParamTextType> = ({
	children,
	style,
	fontType = 'regular16',
	...props
}) => {
	return children ? (
		<NativeText
			style={StyleSheet.flatten([FontTheme[fontType], style])}
			accessibilityRole="text"
			testID="text"
			{...props}
		>
			{children}
		</NativeText>
	) : null;
};