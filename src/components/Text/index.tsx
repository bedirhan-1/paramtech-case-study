import React, { ReactNode } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { FontStyleEnum, FontTheme } from '../../theme';

interface ParamTextType extends TextProps {
	children: string | ReactNode | ReactNode[];
	style?: any;
	fontType?: keyof typeof FontStyleEnum;
}

export const ParamText: React.FC<ParamTextType> = ({
	children,
	style,
	fontType = 'regular16',
	...props
}) => {
	return children ? (
		<Text
			style={StyleSheet.flatten([FontTheme[fontType], style])}
			accessibilityRole="text"
			testID="text"
			{...props}
		>
			{children}
		</Text>
	) : null;
};
