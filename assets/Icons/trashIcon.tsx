import * as React from 'react';
import Svg, { SvgProps, Defs, G, Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style, title */
const SvgComponent = (props: SvgProps) => (
	<Svg
		viewBox="0 0 32 32"
		width={props.width ?? 56}
		height={props.height ?? 56}
		fill={props.fill ?? 'black'}
		{...props}
	>
		<Defs></Defs>
		<G id="Layer_17" data-name="Layer 17">
			<Path d="M24 31H8a3 3 0 0 1-3-3V9a1 1 0 0 1 2 0v19a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9a1 1 0 0 1 2 0v19a3 3 0 0 1-3 3ZM28 7H4a1 1 0 0 1 0-2h24a1 1 0 0 1 0 2Z" />
			<Path d="M20 7a1 1 0 0 1-1-1V3h-6v3a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1ZM16 26a1 1 0 0 1-1-1V11a1 1 0 0 1 2 0v14a1 1 0 0 1-1 1ZM21 24a1 1 0 0 1-1-1V13a1 1 0 0 1 2 0v10a1 1 0 0 1-1 1ZM11 24a1 1 0 0 1-1-1V13a1 1 0 0 1 2 0v10a1 1 0 0 1-1 1Z" />
		</G>
	</Svg>
);
export default SvgComponent;
