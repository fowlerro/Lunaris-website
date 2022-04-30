import { Box, Button, styled, Typography } from '@mui/material';

import { faMeteor } from '@fortawesome/free-solid-svg-icons';

import DashboardCard from '@components/DashboardCard';
import FeatureBadge from '@components/Badges/FeatureBadge';
import Icon from '@components/Icon';

const Content = styled('div')({
	display: 'flex',
	gap: '1rem',
});

export default function Modules(): JSX.Element {
	return (
		<>
			{/* <DashboardCard
				header='Welcome Messages'
				action={<FeatureBadge feature='Welcome Messages' variant='wip' />}
				initialExpand
				disableIcon
			>
				<Content>
					<Typography paragraph variant='body2'>
						Coming Soon!
					</Typography>
				</Content>
				<Typography paragraph variant='body2' sx={{ marginBottom: 0 }}>
					Wanna try this feature early?
				</Typography>
				<Button variant='outlined' size='small'>
					Sign in to the beta testers!
				</Button>
			</DashboardCard> */}
			<ModuleCard title='Welcome Messages' />
			<DashboardCard header='Auto Roles' action={<Typography color='green'>ON</Typography>} initialExpand disableIcon>
				<Content>
					<Typography paragraph variant='body2'>
						0/5 in use
					</Typography>
				</Content>
				<ManageButton />
			</DashboardCard>
			<DashboardCard header='Levels' action={<Typography color='green'>ON</Typography>} initialExpand disableIcon>
				<Content>
					<div>
						<Typography variant='h6'>Text Rewards</Typography>
						<Typography paragraph variant='body2'>
							5/20 in use
						</Typography>
					</div>
					<div>
						<Typography variant='h6'>Voice Rewards</Typography>
						<Typography paragraph variant='body2'>
							3/20 in use
						</Typography>
					</div>
				</Content>
				<ManageButton />
			</DashboardCard>
			<DashboardCard
				header='Interactive Roles'
				action={<FeatureBadge feature='Interactive Roles' variant='new' />}
				initialExpand
				disableIcon
			>
				<Content>
					<Typography paragraph variant='body2'>
						2/10 in use
					</Typography>
				</Content>
				<ManageButton />
			</DashboardCard>
			<DashboardCard header='Embed Messages' initialExpand disableIcon>
				<Content>
					<Box>
						<Typography paragraph variant='body2' color='error' sx={{ marginBottom: 0 }}>
							15/15 in use
						</Typography>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBlock: '.5rem', color: 'gold' }}>
							<Icon icon={faMeteor} size='1x' color='gold' />
							<Typography variant='caption'>Upgrade to get more!</Typography>
						</Box>
					</Box>
				</Content>
				<ManageButton />
			</DashboardCard>
			<DashboardCard header='Server Logs' action={<Typography color='error'>OFF</Typography>} initialExpand disableIcon>
				<Content sx={{ marginBottom: '1rem' }}></Content>
				<ManageButton />
			</DashboardCard>
		</>
	);
}

interface ModuleCardProps {
	title: string;
	moduleState?: boolean;
}

function ModuleCard({ title }: ModuleCardProps) {
	return (
		<DashboardCard
			header={title}
			action={<FeatureBadge feature='Welcome Messages' variant='wip' />}
			initialExpand
			disableIcon
		>
			<Content>
				<Typography paragraph variant='body2'>
					Coming Soon!
				</Typography>
			</Content>
			<Typography paragraph variant='body2' sx={{ marginBottom: 0 }}>
				Wanna try this feature early?
			</Typography>
			<Button variant='outlined' size='small'>
				Sign in to the beta testers!
			</Button>
		</DashboardCard>
	);
}

const ManageButton = () => {
	return (
		<Button variant='contained' size='small'>
			MANAGE
		</Button>
	);
};
