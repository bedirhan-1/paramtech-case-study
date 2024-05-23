import {
	StyleProp,
	StyleSheet,
	TextInput,
	TextInputProps,
	TextStyle,
} from 'react-native';
import { FC, useEffect } from 'react';
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
	error?: boolean;
	multipleSelect?: boolean;
	onChangeText?: (text: string) => void;
	value?: string;
};

const HEIGHT = 60;

export const ParamInput: FC<Props> = ({
	style,
	placeholder,
	error = false,
	onChangeText,
	value,
}) => {
	const { Inputs } = useTheme();
	const placeholderProgress = useSharedValue(0);
	const offset = useSharedValue(0);

	useEffect(() => {
		if (value) {
			placeholderProgress.value = 1;
		}
	}, [value]);

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
			fontSize: withTiming(
				interpolate(placeholderProgress.value, [0, 1], [14, 11]),
			),
			color: withTiming(
				interpolateColor(
					placeholderProgress.value,
					[0, 1],
					[Inputs.primary.color, Inputs.selectedPrimary.color],
				),
			),
		};
	});

	const animatedContainerView = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: offset.value }],
			paddingTop: withTiming(
				interpolate(placeholderProgress.value, [0, 1], [0, 20]),
				{ duration: 300 },
			),
		};
	});

	const onFocus = () => {
		placeholderProgress.value = 1;
	};

	const onBlur = () => {
		if (value?.length === 0) {
			placeholderProgress.value = 0;
		}
	};

	return (
		<Animated.View
			style={[styles.container, style, animatedContainerView, Inputs.border]}
		>
			<TextInput
				value={value}
				onChangeText={onChangeText}
				onFocus={onFocus}
				onBlur={onBlur}
				style={[styles.textInput]}
			/>
			<Animated.Text style={[styles.placeholder, animatedPlaceholderStyle]}>
				{placeholder}
			</Animated.Text>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignSelf: 'stretch',
		height: HEIGHT,
		borderRadius: 4,
		justifyContent: 'center',
	},
	textInput: {
		height: HEIGHT,
		paddingLeft: 20,
		justifyContent: 'center',
		color: 'black',
	},
	placeholder: {
		position: 'absolute',
		left: 20,
		zIndex: -1,
		fontFamily: 'poppinsRegular',
		color: 'black',
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center',
	},
});
