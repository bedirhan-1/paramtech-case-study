import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
	<Svg
		width={props.width ?? 24}
		height={props.height ?? 24}
		data-name="Layer 1"
		viewBox="0 0 24 24"
		{...props}
	>
		<Path d="M11.5 14.5v-8c0-.28.22-.5.5-.5s.5.22.5.5v8c0 .28-.22.5-.5.5s-.5-.22-.5-.5ZM12 17c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1Zm11.61 3.07C22.97 21.3 21.62 22 19.9 22H4.1c-1.71 0-3.07-.7-3.71-1.93-.65-1.24-.47-2.87.48-4.24L9.3 2.43C9.92 1.53 10.93 1 12 1s2.08.53 2.69 1.41l8.44 13.43c.95 1.37 1.13 2.99.48 4.23ZM22.3 16.4s0-.01-.01-.02L13.86 2.96C13.44 2.35 12.76 2 12 2s-1.44.36-1.87.98l-8.42 13.4c-.75 1.08-.91 2.31-.43 3.23.47.9 1.47 1.39 2.82 1.39h15.81c1.35 0 2.35-.49 2.82-1.39.48-.91.32-2.14-.42-3.21Z" />
	</Svg>
);
export default SvgComponent;
