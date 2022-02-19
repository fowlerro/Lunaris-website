import React, { cloneElement, createRef, Dispatch, ReactElement, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';

import { faChevronDown, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
	placeholder?: string;
	id?: string;
	name?: string;
	withClearSelection?: boolean;
	selected: string;
	setSelected: Dispatch<SetStateAction<string>>;
	onSelect?: (selectedValue: string) => void;
	children: ReactElement | ReactElement[];
}

const SelectContainer = styled.ul`
	${tw`list-none relative cursor-pointer my-8`}
`;

const Input = styled.li<{ open: boolean; showPlaceholder: boolean }>`
	${tw`bg-background-input border-0 rounded-xl shadow-xl py-4 px-6`}
	${({ open }) => open && tw`rounded-b-none`}
  ${({ showPlaceholder }) => showPlaceholder && tw`text-text-muted`}
`;

const ClearIcon = styled(FontAwesomeIcon)`
	${tw`absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted hover:text-white`}
`;

const ArrowIcon = styled(FontAwesomeIcon)<{ open: boolean }>`
	${tw`absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 transition-transform duration-150 pointer-events-none`}
	${({ open }) => open && tw`rotate-180`}
`;
const OptionsContainer = styled.li<{ open: boolean }>`
	${({ open }) => (open ? tw`block` : tw`hidden`)}
	${tw`bg-background-input rounded-b-xl shadow-xl absolute w-full z-50 border-t-2 border-background-lighter`}
`;
const Options = styled.ul``;

export default function Select({
	placeholder,
	withClearSelection,
	selected,
	setSelected,
	onSelect,
	children,
}: IProps): JSX.Element {
	const [open, setOpen] = useState(false);
	const [selectedText, setSelectedText] = useState<string>('');

	const selectRef = createRef<HTMLLIElement>();
	const optionsRef = createRef<HTMLUListElement>();

	const handleSelect = (id: string, text: string) => {
		setSelected(id);
		setSelectedText(text);
		handleClose();
		onSelect?.(id);
	};

	const handleKeySelect = (e: React.KeyboardEvent<HTMLLIElement>) => {
		if (e.key === 'Escape') handleClose();
		if (e.key === 'Enter') handleSelect(e.currentTarget.id, e.currentTarget.textContent || '');
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			focusSelectItem(e);
		}
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			focusSelectItem(e);
		}
	};

	const handleClick = () => {
		setOpen(!open);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const toggleSelect = (e: React.KeyboardEvent<HTMLLIElement>) => {
		if (e.key === 'Escape') return handleClose();
		const openSelect = e.key === ' ' || e.key === 'Enter';
		if (openSelect) setOpen(!open);
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			focusSelectItem(e);
		}
	};

	const focusSelectItem = (e: React.KeyboardEvent) => {
		const { activeElement } = document;
		const optionList = optionsRef.current?.childNodes;
		if (!optionList) return;

		if (activeElement === selectRef.current) return (optionList[0] as HTMLElement)?.focus?.();
		if (e.key === 'ArrowUp' && activeElement === optionList[0]) return selectRef.current?.focus();
		if (e.key === 'ArrowUp') return (e.currentTarget.previousElementSibling as HTMLElement)?.focus?.();
		if (e.key === 'ArrowDown') return (e.currentTarget.nextElementSibling as HTMLElement)?.focus?.();
	};

	const clearSelection = () => {
		setSelected('');
		setSelectedText('');
		handleClose();
	};

	const OptionItems = Array.isArray(children)
		? children.map((child, index) => cloneElement(child, { key: index, selected, handleKeySelect, handleSelect }))
		: cloneElement(children, { selected, handleKeySelect, handleSelect });

	return (
		<SelectContainer>
			<Input
				role='button'
				aria-labelledby='label'
				tabIndex={0}
				ref={selectRef}
				open={open}
				showPlaceholder={!selected}
				onKeyDown={toggleSelect}
				onClick={handleClick}
			>
				{selectedText || placeholder || ''}
			</Input>
			{withClearSelection && Boolean(selected) ? (
				<ClearIcon title='Clear selection' icon={faClose} onClick={clearSelection} tabIndex={0} />
			) : undefined}
			<ArrowIcon title='Open select menu' icon={faChevronDown} open={open} />
			<OptionsContainer aria-expanded={open} role='listbox' open={open}>
				<Options ref={optionsRef}>{OptionItems}</Options>
			</OptionsContainer>
		</SelectContainer>
	);
}
