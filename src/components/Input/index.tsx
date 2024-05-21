import {
	StyleProp,
	StyleSheet,
	TextInput,
	TextInputProps,
	TextStyle,
} from 'react-native';
import { FC, useState } from 'react';
import Animated, {
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';

type Props = TextInputProps & {
	style?: StyleProp<TextStyle>;
	error: boolean;
};

const HEIGHT = 54;

export const ParamInput: FC<Props> = ({
	style,
	placeholder,
	error = false,
}) => {
	const { ColorPallet } = useTheme();
	const [value, setValue] = useState('');
	const placeholderProgress = useSharedValue(0);
	const offset = useSharedValue(0);

	if (error) {
		offset.value = withSequence(
			withTiming(15, { duration: 100 }),
			withTiming(-15, { duration: 100 }),
			withTiming(0, { duration: 100 }),
		);
	} else {
		offset.value = 0;
	}

	const animatedPlaceholderStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: withTiming(
						interpolate(placeholderProgress.value, [0, 1], [0, -13]),
					),
				},
			],
		};
	});

	const animatedContainerView = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: offset.value }],
			paddingTop: withTiming(
				interpolate(placeholderProgress.value, [0, 1], [0, 20]),
				{ duration: 300 },
			),
			borderColor: withTiming(
				interpolateColor(
					placeholderProgress.value,
					[0, 1],
					[ColorPallet.grayscale.lightGrey, ColorPallet.brand.primary],
				),
			),
		};
	});

	const onFocus = () => {
		placeholderProgress.value = 1;
	};

	const onBlur = () => {
		if (value.length === 0) {
			placeholderProgress.value = 0;
		}
	};

	return (
		<>
			<Animated.View
				style={[
					styles.container,
					style,
					animatedContainerView,
					{ backgroundColor: ColorPallet.grayscale.semiLightGrey },
				]}
			>
				<TextInput
					value={value}
					onChangeText={setValue}
					onFocus={onFocus}
					onBlur={onBlur}
					style={[styles.textInput]}
				/>
				<Animated.Text
					style={[
						styles.placeholder,
						animatedPlaceholderStyle,
						{ fontFamily: 'bold', letterSpacing: 1.5, opacity: 0.5 },
					]}
				>
					{placeholder}
				</Animated.Text>
			</Animated.View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		alignSelf: 'stretch',
		height: HEIGHT,
		borderWidth: 1,
		borderRadius: 4,
		justifyContent: 'center',
	},
	textInput: {
		height: HEIGHT,
		paddingLeft: 20,
		fontSize: 16,
		justifyContent: 'center',
		color: 'black',
	},
	placeholder: {
		fontSize: 14,
		position: 'absolute',
		left: 20,
		zIndex: -1,
		fontFamily: 'regular',
		color: 'black',
	},
});
