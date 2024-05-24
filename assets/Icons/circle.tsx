import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
	<Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
		<Path
			stroke="#000"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
		/>
	</Svg>
);
export default SvgComponent;
