import { Fragment, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { MenuItem, styled, TextField, Typography } from '@mui/material';

import BugReportForm from '@components/Forms/BugReportForm';
import CommandForm from '@components/Forms/CommandForm';
import ModuleForm from '@components/Forms/ModuleForm';
import OtherForm from '@components/Forms/OtherForm';

const Section = styled('div')({
	maxWidth: '25rem',
	paddingTop: '2rem',
	paddingInline: '1rem',
	textAlign: 'center',
});

export default function Form(): JSX.Element {
	const [topic, setTopic] = useState('');

	const SelectedForm =
		topic === 'command'
			? CommandForm
			: topic === 'module'
			? ModuleForm
			: topic === 'bug'
			? BugReportForm
			: topic === 'other'
			? OtherForm
			: Fragment;

	const { t } = useTranslation();
	return (
		<Section>
			<Typography variant='body2' paragraph>
				{t('contactPage:formParagraph')}
			</Typography>
			<TextField
				fullWidth
				size='small'
				select
				label={t('contactPage:selectTopic')}
				value={topic}
				onChange={e => setTopic(e.target.value)}
			>
				<MenuItem value='command'>{t('contactPage:topics.command')}</MenuItem>
				<MenuItem value='module'>{t('contactPage:topics.module')}</MenuItem>
				<MenuItem value='bug'>{t('contactPage:topics.bug')}</MenuItem>
				<MenuItem value='other'>{t('contactPage:topics.other')}</MenuItem>
			</TextField>
			<SelectedForm />
		</Section>
	);
}
