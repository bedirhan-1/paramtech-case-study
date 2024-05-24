import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
	<Svg
		width={props.width ?? 24}
		height={props.height ?? 24}
		fill={props.fill ?? 'none'}
		{...props}
	>
		<Path
			fill="#000"
			fillRule="evenodd"
			d="M12.496 5.504a.583.583 0 0 0-.825 0L8 9.175l-3.67-3.67a.583.583 0 0 0-.826.824l4.084 4.083a.583.583 0 0 0 .824 0l4.084-4.083a.583.583 0 0 0 0-.825Z"
			clipRule="evenodd"
		/>
	</Svg>
);
export default SvgComponent;
