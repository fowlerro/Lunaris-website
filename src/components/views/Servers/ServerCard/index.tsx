import { Button, Paper, styled, Tooltip, Typography } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';

import Link from '@components/Link';
import ServerIcon from '@components/ServerIcon';
import Skeleton from '@components/Loading/Skeleton';

interface IProps {
	id?: string;
	name?: string;
	icon?: string | null;
	permissions?: 'owner' | 'manager' | 'member';
	excluded?: boolean;
}

const Card = styled(Paper)(({ theme }) => ({
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-end',
	justifyContent: 'flex-end',
	backgroundColor: theme.colors.background.lighter,
	textAlign: 'left',
	borderRadius: '12px',
	maxWidth: '18rem',
	padding: '.5rem',
	paddingLeft: '1rem',
	paddingTop: '3.5rem',
	boxShadow: theme.shadows[4],
}));

const Wrapper = styled('div')({
	display: 'flex',
	justifyContent: 'space-between',
	width: '100%',
	marginTop: '.5rem',
});

const AvatarWrapper = styled('div')(({ theme }) => ({
	position: 'absolute',
	top: 0,
	left: '50%',
	transform: 'translate(-50%, -50%)',
	backgroundColor: theme.colors.background.lighter,
	width: '4rem',
	height: '4rem',
	borderRadius: '50%',
}));

const StyledButton = styled(Button)({
	fontSize: '.8rem',
});

export default function ServerCard({ id, name, icon, permissions, excluded }: IProps): JSX.Element {
	const { t } = useTranslation();
	const buttonLink =
		permissions === 'member'
			? ''
			: excluded
			? `${process.env.INVITE_URL}&guild_id=${id}&disable_guild_select=true`
			: `/dashboard/${id}`;

	const Icon = id && name ? <ServerIcon id={id} name={name} icon={icon ?? null} /> : <Skeleton variant='circular' />;
	const ServerName = name ? name : <Skeleton variant='text' width='10ch' />;
	const Permissions = permissions ? permissions : <Skeleton variant='text' width='8ch' height='20px' />;
	const ButtonComponent = permissions ? (
		<StyledButton
			variant={permissions === 'member' || excluded ? 'outlined' : 'contained'}
			sx={{ alignSelf: 'flex-end' }}
			href={buttonLink}
			LinkComponent={Link}
		>
			{permissions === 'member' ? t('serversPage:seeProfile') : excluded ? t('common:invite') : t('common:manage')}
		</StyledButton>
	) : (
		<Skeleton variant='rectangular' width='90px' height='30px' sx={{ borderRadius: 1 }} />
	);

	return (
		<Card elevation={0}>
			<AvatarWrapper>{Icon}</AvatarWrapper>
			<Tooltip title={name || ''} placement='top' arrow>
				<Typography variant='h3' component='h2' sx={{ overflow: 'hidden', width: '100%' }}>
					{ServerName}
				</Typography>
			</Tooltip>
			<Wrapper>
				<Typography variant='caption' sx={{ textTransform: 'uppercase' }}>
					{Permissions}
				</Typography>
				{ButtonComponent}
			</Wrapper>
		</Card>
	);
}
