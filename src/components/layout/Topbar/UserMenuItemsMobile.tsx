import { useTranslation } from 'next-i18next';
import { Box } from '@mui/system';
import { IconButton, List, ListItem, styled, Tooltip } from '@mui/material';
import { faFolder, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Avatar from '@components/Avatar';
import Link from '@components/Link';
import { User } from 'types';

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
	return (
		<StyledList>
			<Item>
				<Tooltip title={t('profileMenu.profile') || 'Profile'}>
					<IconButton component={Link} href='/dashboard'>
						<ServerIcon>
							<Avatar
								src={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.webp`}
								alt='Avatar'
								layout='fill'
							/>
						</ServerIcon>
					</IconButton>
				</Tooltip>
			</Item>
			<Item>
				<Tooltip title={'Server Lunaris'}>
					<IconButton component={Link} href='/server/Lunaris'>
						<ServerIcon>
							<Avatar
								src={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.webp`}
								alt='Avatar'
								layout='fill'
							/>
						</ServerIcon>
					</IconButton>
				</Tooltip>
			</Item>
			<Item>
				<Tooltip title={t('profileMenu.servers') || 'Servers'}>
					<IconButton component={Link} href='/server'>
						<Icon icon={faFolder} />
					</IconButton>
				</Tooltip>
			</Item>
			<Item>
				<Tooltip title={t('profileMenu.logout') || 'Logout'}>
					<IconButton component={Link} href={`${process.env.apiDomain}/api/auth/logout`}>
						<Icon icon={faRightFromBracket} sx={{ color: theme => theme.palette.error.main }} />
					</IconButton>
				</Tooltip>
			</Item>
		</StyledList>
	);
}
