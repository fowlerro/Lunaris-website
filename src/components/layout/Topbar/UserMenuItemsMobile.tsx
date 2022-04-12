import useTranslation from 'next-translate/useTranslation';

import { Box } from '@mui/system';
import { IconButton, List, ListItem, styled, Tooltip } from '@mui/material';

import { faFolder, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Avatar from '@components/Avatar';
import Link from '@components/Link';
import { getUserAvatar } from '@utils/utils';

import type { User } from 'types';

interface IProps {
	user: User;
}

const StyledList = styled(List)({
	display: 'flex',
});

const Item = styled(ListItem)({
	justifyContent: 'center',
	padding: '.5rem 0',
});

const Icon = styled(FontAwesomeIcon)(({ theme }) => ({
	color: theme.colors.text.secondary,
	fontSize: '1.5rem',
}));

const ServerIcon = styled(Box)({
	position: 'relative',
	width: '2rem',
	height: '2rem',
});

export default function UserMenuItemsMobile({ user }: IProps): JSX.Element {
	const { t } = useTranslation('layout');
	const avatarURL = getUserAvatar(user.discordId, user.avatar);
	return (
		<StyledList>
			<Item>
				<Tooltip title={t('profileMenu.profile').toString()}>
					<IconButton component={Link} href='/dashboard'>
						<ServerIcon>
							<Avatar src={avatarURL} alt='Avatar' layout='fill' objectFit='contain' />
						</ServerIcon>
					</IconButton>
				</Tooltip>
			</Item>
			<Item>
				<Tooltip title={t('profileMenu.servers').toString()}>
					<IconButton component={Link} href='/servers'>
						<Icon icon={faFolder} />
					</IconButton>
				</Tooltip>
			</Item>
			<Item>
				<Tooltip title={t('profileMenu.logout').toString()}>
					<IconButton component={Link} href={`${process.env.API_URL}/auth/logout`}>
						<Icon icon={faRightFromBracket} sx={{ color: theme => theme.palette.error.main }} />
					</IconButton>
				</Tooltip>
			</Item>
		</StyledList>
	);
}
