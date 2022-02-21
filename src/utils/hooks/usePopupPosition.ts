import { RefObject, useEffect, useState } from 'react';

export interface Position {
	vertical: 'top' | 'center' | 'bottom';
	horizontal: 'left' | 'center' | 'right';
}
export default function usePopupPosition<
	T extends HTMLElement = HTMLDivElement,
	K extends HTMLElement = HTMLDivElement
>(anchor: RefObject<T>, transform: RefObject<K>, anchorPosition: Position, transformPosition: Position) {
	const [position, setPosition] = useState({ top: 0, left: 0 });

	useEffect(() => {
		console.log('rerun');
		const anchorPos = anchor.current?.getBoundingClientRect();
		const transformPos = transform.current?.getBoundingClientRect();

		const point = {
			x:
				(anchorPosition.horizontal === 'left' || anchorPosition.horizontal === 'right'
					? anchorPos?.[anchorPosition.horizontal]
					: (anchorPos?.left || 0) + (anchorPos?.width || 0) / 2) || 0,
			y:
				(anchorPosition.vertical === 'top' || anchorPosition.vertical === 'bottom'
					? anchorPos?.[anchorPosition.vertical]
					: (anchorPos?.top || 0) + (anchorPos?.height || 0) / 2) || 0,
		};
		let top = point.y;
		if (transformPosition.vertical === 'center') top -= (transformPos?.height || 0) / 2;
		if (transformPosition.vertical === 'bottom') top -= transformPos?.height || 0;
		if (top < 16) top = 16;
		if (screen?.height && top > screen.height - 16) top = screen.height - 16;

		let left = point.x;
		if (transformPosition.horizontal === 'center') left -= (transformPos?.width || 0) / 2;
		if (transformPosition.horizontal === 'right') left -= transformPos?.width || 0;
		if (left < 16) left = 16;
		if (screen?.width && left > screen.width - 16) left = screen.width - 16;
		setPosition({ top, left });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		anchor,
		anchorPosition.horizontal,
		anchorPosition.vertical,
		transformPosition.horizontal,
		transformPosition.vertical,
	]);
	return position;
}
