import {
	StyleProp,
	StyleSheet,
	TextInput,
	TextInputProps,
	TextStyle,
	TouchableOpacity,
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
import ArrowDown from '../../../assets/Icons/arrowDown';
import { ParamText } from '../Text';

type Props = TextInputProps & {
	style?: StyleProp<TextStyle>;
	error?: boolean;
	onChangeText?: (text: string) => void;
	value?: string;
	multipleSelect?: boolean;
	onMultiSelect?: () => void;
	maxLength?: number;
};

const HEIGHT = 60;
const ICON_SIZE = 16;

export const ParamInput: FC<Props> = ({
	style,
	placeholder,
	error = false,
	onChangeText,
	value,
	multipleSelect = false,
	onMultiSelect,
	maxLength,
}) => {
	const { Inputs, activeOpacity } = useTheme();
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
			style={[
				styles.container,
				style,
				animatedContainerView,
				Inputs.border,
				{ zIndex: multipleSelect ? -1 : undefined },
			]}
		>
			{!multipleSelect && (
				<TextInput
					value={value}
					onChangeText={onChangeText}
					onFocus={onFocus}
					onBlur={onBlur}
					editable={!multipleSelect}
					style={styles.textInput}
					maxLength={maxLength}
				/>
			)}
			{multipleSelect && (
				<ParamText style={{ paddingLeft: 20 }} fontType={'regular14'}>
					{value}
				</ParamText>
			)}
			<Animated.Text style={[styles.placeholder, animatedPlaceholderStyle]}>
				{placeholder}
			</Animated.Text>
			{multipleSelect && (
				<>
					<ArrowDown
						style={styles.rightArrow}
						width={ICON_SIZE}
						height={ICON_SIZE}
					/>
					<TouchableOpacity
						onPress={onMultiSelect}
						style={{ position: 'absolute', height: '100%', width: '100%' }}
					/>
				</>
			)}
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
	rightArrow: {
		position: 'absolute',
		alignSelf: 'center',
		right: 16,
		top: (HEIGHT - ICON_SIZE) / 2,
	},
});
