import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { Box, InputLabel, styled, TextField } from '@mui/material';

import Explanation from '@components/Explanation';
import useIsDesktop from '@hooks/useIsDesktop';

interface IProps {
	onChange?: (duration: number) => void;
	values: {
		days: string;
		hours: string;
		minutes: string;
		seconds: string;
	};
	setValues: Dispatch<
		SetStateAction<{
			days: string;
			hours: string;
			minutes: string;
			seconds: string;
		}>
	>;
}

const Inputs = styled(Box)<{ focused: boolean }>(({ theme, focused }) => ({
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
	backgroundColor: theme.colors.background.primary,
	padding: '1rem',
	borderRadius: '8px',
	border: focused ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',

	[theme.breakpoints.up('md')]: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
}));

export default function DurationPicker({ values, setValues, onChange }: IProps): JSX.Element {
	const { t } = useTranslation();
	const isDesktop = useIsDesktop();

	useEffect(() => {
		const seconds = parseInt(values.seconds, 10) * 1000;
		const minutes = parseInt(values.minutes, 10) * 60 * 1000;
		const hours = parseInt(values.hours, 10) * 60 * 60 * 1000;
		const days = parseInt(values.days, 10) * 24 * 60 * 60 * 1000;

		onChange?.(days + hours + minutes + seconds);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values.days, values.hours, values.minutes, values.seconds]);

	const [focused, setFocused] = useState(false);

	const handleChange =
		(unit: 'days' | 'hours' | 'minutes' | 'seconds') => (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
			const value = e.currentTarget.value;
			const parsed = parseInt(value, 10) || 0;
			if (unit === 'days' && parsed >= 31) return;
			if (unit === 'hours' && parsed >= 24) return;
			if (unit === 'minutes' && parsed >= 60) return;
			if (unit === 'seconds' && parsed >= 60) return;
			setValues({ ...values, [unit]: (parseInt(value, 10) || 0).toString() });
		};

	return (
		<Box sx={{ marginTop: '.5rem' }}>
			<Explanation label={t('autoRolesPage:durationTooltip')} overlap>
				<InputLabel sx={{ marginLeft: '.5rem', marginRight: '.25rem' }} focused={focused}>
					{t('common:duration')}
				</InputLabel>
			</Explanation>
			<Inputs focused={focused}>
				<TextField
					type='number'
					value={values.days}
					onChange={handleChange('days')}
					InputProps={{ endAdornment: t('common:durationUnits.days') }}
					size={isDesktop ? 'medium' : 'small'}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					sx={{ minWidth: '120px', flex: 1 }}
				/>
				<TextField
					type='number'
					value={values.hours}
					onChange={handleChange('hours')}
					InputProps={{ endAdornment: t('common:durationUnits.hours') }}
					size={isDesktop ? 'medium' : 'small'}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					sx={{ minWidth: '120px', flex: 1 }}
				/>
				<TextField
					type='number'
					value={values.minutes}
					onChange={handleChange('minutes')}
					InputProps={{ endAdornment: t('common:durationUnits.minutes') }}
					size={isDesktop ? 'medium' : 'small'}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					sx={{ minWidth: '120px', flex: 1 }}
				/>
				<TextField
					type='number'
					value={values.seconds}
					onChange={handleChange('seconds')}
					InputProps={{ endAdornment: t('common:durationUnits.seconds') }}
					size={isDesktop ? 'medium' : 'small'}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					sx={{ minWidth: '120px', flex: 1 }}
				/>
			</Inputs>
		</Box>
	);
}
