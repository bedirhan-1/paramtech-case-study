import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
	<Svg width={props.width ?? 16} height={props.height ?? 16} {...props}>
		<Path
			fill={props.color ?? 'black'}
			fillRule="evenodd"
			d="M5.504 3.504a.583.583 0 0 0 0 .825L9.175 8l-3.67 3.67a.583.583 0 1 0 .824.826l4.083-4.084a.583.583 0 0 0 0-.824L6.33 3.504a.583.583 0 0 0-.825 0Z"
			clipRule="evenodd"
		/>
	</Svg>
);
export default SvgComponent;
