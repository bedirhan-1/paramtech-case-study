import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { ParamText } from '../Text';

export enum ButtonTypes {
	Primary = 'Primary',
	Secondary = 'Secondary',
}

interface ButtonProps {
	title: string;
	type: ButtonTypes;
	style?: any;
	disabled?: boolean;
	loading?: boolean;
	onPress?: any;
}

export const Button: React.FC<ButtonProps> = ({
	title,
	type,
	style,
	disabled,
	loading,
	onPress,
	...props
}) => {
	const { Buttons, ButtonText, activeOpacity } = useTheme();

	const styles = StyleSheet.create({
		primary: {
			...Buttons.primary,
		},
		primaryDisabled: {
			...Buttons.primaryDisabled,
		},
		primaryText: {
			...ButtonText.primaryText,
		},
		primaryDisabledText: {
			...ButtonText.primaryDisabledText,
		},
		secondary: {
			...Buttons.secondary,
		},
		secondaryDisabled: {
			...Buttons.secondaryDisabled,
		},
		secondaryText: {
			...ButtonText.secondaryText,
		},
		secondaryDisabledText: {
			...ButtonText.secondaryDisabledText,
		},
	});

	const getButtonStyle = () => {
		switch (type) {
			case ButtonTypes.Secondary:
				return disabled || loading
					? styles.secondaryDisabled
					: styles.secondary;
			default:
				return disabled || loading ? styles.primaryDisabled : styles.primary;
		}
	};

	const getButtonTextStyle = () => {
		switch (type) {
			case ButtonTypes.Secondary:
				return disabled || loading
					? styles.secondaryDisabledText
					: styles.secondaryText;
			default:
				return disabled ? styles.primaryDisabledText : styles.primaryText;
		}
	};

	return (
		<TouchableOpacity
			activeOpacity={activeOpacity}
			disabled={disabled || loading}
			style={[getButtonStyle(), style]}
			onPress={onPress}
			{...props}
		>
			{loading ? (
				<ActivityIndicator color={'white'} />
			) : (
				<ParamText fontType={'medium16'} style={getButtonTextStyle()}>
					{title}
				</ParamText>
			)}
		</TouchableOpacity>
	);
};
