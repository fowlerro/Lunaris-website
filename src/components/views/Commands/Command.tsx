import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

import {
	Box,
	Collapse,
	Divider,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	listItemTextClasses,
	styled,
	Typography,
} from '@mui/material';

import Icon from '@components/Icon';

import { categories } from 'src/pages/commands';

interface CommandProps {
	command: {
		name: string;
		category: string;
		permissions?: string;
		options: boolean;
	};
}

const StyledListItemText = styled(ListItemText)({
	[`.${listItemTextClasses.primary}`]: {
		display: 'flex',
		gap: '.5rem',
	},
});

const TextWrapper = styled('div')({
	marginBottom: '1rem',
});

export default function Command({ command }: CommandProps): JSX.Element {
	const { t } = useTranslation('commands');

	const commandName = command.name;
	const category = categories.find(cat => cat.value === command.category);

	const [expanded, setExpanded] = useState(false);

	const handleExpand = () => {
		setExpanded(prev => !prev);
	};

	return (
		<li>
			<ListItemButton onClick={handleExpand}>
				{category ? (
					<ListItemIcon>
						<Icon icon={category.icon} />
					</ListItemIcon>
				) : null}
				<StyledListItemText
					primary={
						<>
							<Typography
								variant='body1'
								component='span'
								sx={{ fontWeight: theme => theme.typography.fontWeightRegular }}
							>
								/{commandName}
							</Typography>
						</>
					}
					secondary={t(`commands.${commandName}.description`)}
				/>
			</ListItemButton>
			<Collapse in={expanded} sx={{ marginInline: '5rem' }}>
				<Box sx={{ marginBottom: '1rem' }}>
					<Divider sx={{ marginBottom: '1rem' }} />
					<TextWrapper>
						<Typography variant='body1'>{t('common:permissions')}</Typography>
						<Typography variant='body2'>
							{command.permissions ? t(`permissions.${command.permissions}`) : t('common:none')}
						</Typography>
					</TextWrapper>
					{/* {command.subcommands ? (
						<TextWrapper>
							<Typography variant='body1'>{t('subcommands')}</Typography>
							<Typography variant='body2' whiteSpace='pre-line'>
								{t(`commands.${commandName}.subcommands`)}
							</Typography>
						</TextWrapper>
					) : null}
					{!command.subcommands ? (
						<TextWrapper>
							<Typography variant='body1'>{t('common:options')}</Typography>
							<Typography variant='body2' whiteSpace='pre-line'>
								{t(`commands.${commandName}.options`)}
							</Typography>
						</TextWrapper>
					) : null} */}
					<TextWrapper>
						<Typography variant='body1'>{t('common:example')}</Typography>
						<Typography variant='body2' whiteSpace='pre-line'>
							{t(`commands.${commandName}.example`)}
						</Typography>
					</TextWrapper>
					{command.options ? (
						<TextWrapper>
							<Typography variant='body1'>{t('common:options')}</Typography>
							<Typography variant='body2' whiteSpace='pre-line'>
								{t(`commands.${commandName}.options`)}
							</Typography>
						</TextWrapper>
					) : null}
				</Box>
			</Collapse>
		</li>
	);
}
