import Input from '@components/Input/Input';
import Select from '@components/Select/Select';
import SelectOption from '@components/Select/SelectOption';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import tw from 'twin.macro';

const Section = styled.section`
	${tw`m-4`}
`;

const Inputs = styled.div``;

export default function CommandSection(): JSX.Element {
	const { t } = useTranslation();
	const [search, setSearch] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');

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
		</Section>
	);
}
