import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { ParamText } from '../Text';

export enum ButtonTypes {
	primary = 'Primary',
}

interface ButtonProps {
	title: string;
	type: ButtonTypes;
	style?: any;
	disabled?: boolean;
	loading?: boolean;
	onPress?: () => void;
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
	});

	const getButtonStyle = () => {
		switch (type) {
			default:
				return disabled || loading ? styles.primaryDisabled : styles.primary;
		}
	};

	const getButtonTextStyle = () => {
		switch (type) {
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
