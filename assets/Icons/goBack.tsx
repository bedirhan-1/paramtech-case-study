import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
	<Svg
		width={props.width ?? 24}
		height={props.height ?? 24}
		{...props}
	>
		<Path
			fill={props.color ?? 'black'}
			fillRule="evenodd"
			d="M15.619 5.256a.875.875 0 0 1 0 1.238L10.112 12l5.507 5.506a.875.875 0 1 1-1.238 1.238l-6.125-6.125a.875.875 0 0 1 0-1.238l6.125-6.125a.875.875 0 0 1 1.238 0Z"
			clipRule="evenodd"
		/>
	</Svg>
);
export default SvgComponent;
