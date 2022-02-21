import Button from '@components/Button/Button';
import Dropdown from '@components/Dropdown/Dropdown';
import Input from '@components/Input/Input';
import Popup from '@components/Popup';
import Select from '@components/Select/Select';
import SelectOption from '@components/Select/SelectOption';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';
import { createRef, useState } from 'react';
import tw from 'twin.macro';

const Section = styled.section`
	${tw`m-4`}
`;

const Inputs = styled.div``;

const Span = styled.span`
	${tw`outline-white`}
`;

export default function CommandSection(): JSX.Element {
	const { t } = useTranslation();
	const [search, setSearch] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [open, setOpen] = useState(false);

	const tooltipRef = createRef<HTMLSpanElement>();
	const buttonRef = createRef<HTMLButtonElement>();

	return (
		<Section>
			<Inputs>
				<Input
					placeholder={t('commandsPage:search')}
					fullWidth
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
				<Select
					placeholder='Select category'
					selected={selectedCategory}
					setSelected={setSelectedCategory}
					withClearSelection
				>
					<SelectOption value='opt1'>Option 1</SelectOption>
					<SelectOption value='opt2'>Option 2</SelectOption>
				</Select>
			</Inputs>
			<Span ref={tooltipRef}>Hover</Span>
			<Popup
				anchor={tooltipRef}
				anchorPosition={{ horizontal: 'right', vertical: 'top' }}
				popupPosition={{ horizontal: 'left', vertical: 'top' }}
			>
				Popup!
			</Popup>
			<Button ref={buttonRef} onClick={() => setOpen(!open)}>
				Toggle dropdown
			</Button>
			<Dropdown
				open={open}
				setOpen={setOpen}
				anchor={buttonRef}
				anchorPosition={{ horizontal: 'center', vertical: 'bottom' }}
				transformPosition={{ horizontal: 'center', vertical: 'top' }}
			>
				<li>Chuj</li>
			</Dropdown>
		</Section>
	);
}
