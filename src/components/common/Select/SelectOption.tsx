import styled from '@emotion/styled';
import { ReactText } from 'react';
import tw from 'twin.macro';

interface IProps {
	value: string;
	children: ReactText;
	selected?: string;
	handleSelect?: (id: string | null, text: string | null) => void;
	handleKeySelect?: (e: React.KeyboardEvent<HTMLLIElement>) => void;
}

const Option = styled.li<{ selected: boolean }>`
	${tw`hover:bg-background-lighter px-6 py-4`}
	${({ selected }) => selected && tw`bg-background-lighter`}
`;

export default function SelectOption({
	value,
	selected,
	handleSelect,
	handleKeySelect,
	children,
}: IProps): JSX.Element {
	return (
		<Option
			role='option'
			tabIndex={0}
			id={value}
			onClick={e => handleSelect?.(e.currentTarget.id, e.currentTarget.textContent)}
			onKeyDown={handleKeySelect}
			selected={selected === value}
		>
			{children}
		</Option>
	);
}
