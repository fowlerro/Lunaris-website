/** @jsxImportSource @emotion/react */
import { cloneElement, createRef, Dispatch, ReactElement, RefObject, SetStateAction } from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import usePopupPosition, { Position } from '@hooks/usePopupPosition';

interface IProps {
	id?: string;
	name?: string;
	open: boolean;
	anchor: RefObject<HTMLElement>;
	setOpen: Dispatch<SetStateAction<boolean>>;
	onSelect?: (selectedItem: string) => void;
	children: ReactElement | ReactElement[];
	anchorPosition: Position;
	transformPosition: Position;
}

const StyledDropdown = styled.ul<{ open: boolean }>`
	${tw`bg-background-lighter rounded-xl w-max p-3 absolute shadow-lg z-50 block`}
`;

export default function Dropdown({
	anchor,
	open,
	setOpen,
	onSelect,
	children,
	anchorPosition,
	transformPosition,
	...dropdownProps
}: IProps): JSX.Element {
	const handleClick = (item: string) => {
		setOpen(false);
		onSelect?.(item);
	};

	const ref = createRef<HTMLUListElement>();

	const position = usePopupPosition(anchor, ref, anchorPosition, transformPosition);
	const items = Array.isArray(children)
		? children.map((child, index) => cloneElement(child, { key: index, handleClick }))
		: cloneElement(children, { handleClick });

	return (
		<StyledDropdown
			ref={ref}
			open={open}
			{...dropdownProps}
			css={{ opacity: open ? 1 : 0, left: position.left, top: position.top }}
		>
			{items}
		</StyledDropdown>
	);
}
