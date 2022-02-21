/** @jsxImportSource @emotion/react */
import React, { createRef, ReactNode, RefObject, useState } from 'react';
import styled from '@emotion/styled';
import useEventListener from '@hooks/useEventListener';
import tw from 'twin.macro';
import usePopupPosition from '@hooks/usePopupPosition';

interface Position {
	vertical: 'top' | 'center' | 'bottom';
	horizontal: 'left' | 'center' | 'right';
}

interface IProps {
	children: ReactNode;
	anchor: RefObject<HTMLElement>;
	anchorPosition: Position;
	popupPosition: Position;
}

const Container = styled.div<{ show: boolean }>`
	${tw`bg-background-lighter rounded-lg w-max py-2 px-4 font-light text-sm absolute z-50 shadow-lg pointer-events-none transition-opacity duration-300`}
	${({ show }) => (show ? { opacity: 1 } : { opacity: 0 })}
`;

export default function Popup({ children, anchor, anchorPosition, popupPosition }: IProps) {
	const [show, setShow] = useState(false);
	const ref = createRef<HTMLDivElement>();
	const position = usePopupPosition(anchor, ref, anchorPosition, popupPosition);

	const handleMouseEnter = () => {
		setShow(true);
	};
	const handleMouseLeave = () => {
		setShow(false);
	};

	useEventListener('mouseenter', handleMouseEnter, anchor);
	useEventListener('mouseleave', handleMouseLeave, anchor);

	return (
		<Container show={show} ref={ref} css={{ top: position.top, left: position.left }}>
			{children}
		</Container>
	);
}
