import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
	<Svg width={56} height={56} fill="none" {...props}>
		<Rect width={56} height={56} fill="#E3F7F7" rx={28} />
		<Path
			fill="#019693"
			fillRule="evenodd"
			d="M28 16.625c-6.283 0-11.375 5.092-11.375 11.375 0 6.281 5.092 11.375 11.375 11.375S39.375 34.281 39.375 28c0-6.283-5.092-11.375-11.375-11.375ZM18.375 28A9.624 9.624 0 0 1 28 18.375 9.624 9.624 0 0 1 37.625 28c0 5.315-4.309 9.625-9.625 9.625s-9.625-4.31-9.625-9.625Zm14.283-2.075a.875.875 0 0 0-1.237-1.237l-4.769 4.769-2.076-2.076a.875.875 0 0 0-1.237 1.238l2.695 2.694a.875.875 0 0 0 1.237 0l5.387-5.388Z"
			clipRule="evenodd"
		/>
	</Svg>
);
export default SvgComponent;
