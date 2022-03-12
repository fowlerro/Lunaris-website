import { useTranslation } from 'next-i18next';
import { Box, Divider, ListItemIcon, ListItemText, MenuItem, styled } from '@mui/material';
import { faFolder, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Avatar from '@components/Avatar';
import Link from '@components/Link';
import { User } from 'types';

interface IProps {
	user: User;
}

const StyledItem = styled(MenuItem)(({ theme }) => ({
	padding: 0,
	'&:hover': {
		backgroundColor: theme.colors.background.lighter,
	},
}));

const Icon = styled(FontAwesomeIcon)(({ theme }) => ({
	color: theme.colors.text.secondary,
	fontSize: '1.25rem',
}));

const ServerIcon = styled(Box)({
	position: 'relative',
	width: '1.5rem',
	height: '1.5rem',
});

const StyledLink = styled(Link)({
	display: 'flex',
	padding: '.5rem 1.25rem',
	textDecoration: 'none',
});

export default function UserMenuItems({ user }: IProps): JSX.Element {
	const { t } = useTranslation('layout');
	return (
		<>
			<StyledItem tabIndex={0}>
				<StyledLink href='/dashboard' noLinkStyle>
					<ListItemIcon>
						<Icon icon={faUser} />
					</ListItemIcon>
					<ListItemText>{t('profileMenu.profile')}</ListItemText>
				</StyledLink>
			</StyledItem>
			<Divider />
			<StyledItem>
				<StyledLink href={'/server/Lunaris'} noLinkStyle>
					<ListItemIcon>
						<ServerIcon>
							<Avatar
								src={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.webp`}
								alt='Avatar'
								layout='fill'
							/>
						</ServerIcon>
					</ListItemIcon>
					<ListItemText>Lunaris</ListItemText>
				</StyledLink>
			</StyledItem>
			<StyledItem>
				<StyledLink href='/server' noLinkStyle>
					<ListItemIcon>
						<Icon icon={faFolder} />
					</ListItemIcon>
					<ListItemText>{t('profileMenu.servers')}</ListItemText>
				</StyledLink>
			</StyledItem>
			<Divider />
			<StyledItem>
				<StyledLink href={`${process.env.API_URL}/auth/logout`} noLinkStyle>
					<ListItemIcon>
						<Icon icon={faRightFromBracket} sx={{ color: theme => theme.palette.error.main }} />
					</ListItemIcon>
					<ListItemText sx={{ color: theme => theme.palette.error.main }}>{t('profileMenu.logout')}</ListItemText>
				</StyledLink>
			</StyledItem>
		</>
	);
}
