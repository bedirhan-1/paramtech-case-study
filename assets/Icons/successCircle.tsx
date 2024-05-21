import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
	<Svg
		width={props.width ?? 28}
		height={props.height ?? 28}
		{...props}
	>
		<Path
			fill={props.color ?? 'black'}
			fillRule="evenodd"
			d="M14 2.625C7.717 2.625 2.625 7.717 2.625 14c0 6.281 5.092 11.375 11.375 11.375S25.375 20.281 25.375 14c0-6.283-5.092-11.375-11.375-11.375ZM4.375 14A9.624 9.624 0 0 1 14 4.375 9.625 9.625 0 0 1 23.625 14c0 5.315-4.309 9.625-9.625 9.625S4.375 19.315 4.375 14Zm14.284-2.075a.875.875 0 0 0-1.238-1.237l-4.769 4.769-2.076-2.075a.875.875 0 0 0-1.237 1.237l2.695 2.694a.875.875 0 0 0 1.237 0l5.387-5.388Z"
			clipRule="evenodd"
		/>
	</Svg>
);
export default SvgComponent;
