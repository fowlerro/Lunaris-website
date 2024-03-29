import useTranslation from 'next-translate/useTranslation';

import { Button, styled, Typography, Tooltip } from '@mui/material';

import DashboardCard, { DashboardCardContainer } from '@components/DashboardCard';
import FeatureBadge from '@components/Badges/FeatureBadge';
import { featureBadges } from '@components/layout/Dashboard/Sidebar/Sidebar';
import { GuildOverviewModules } from 'types';
import useSWR from 'swr';
import { fetcher } from '@utils/utils';
import useGuildId from '@hooks/useGuildId';
import Link from '@components/Link';

const StyledContainer = styled(DashboardCardContainer)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	justifyContent: 'space-between',
});

const Content = styled('div')({
	display: 'flex',
	gap: '1rem',
});

export default function Modules(): JSX.Element {
	const { t } = useTranslation('layout');
	const guildId = useGuildId();

	const { data: guildModules } = useSWR<GuildOverviewModules>(
		`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/modules`,
		fetcher
	);

	return (
		<>
			<ModuleCard
				title={t('dashboardSidebar.autoRoles')}
				feature={'autoRoles'}
				moduleState={guildModules?.autoRoles?.status ?? false}
				limits={[{ amount: guildModules?.autoRoles?.amount, limit: 5 }]}
				url={`/dashboard/${guildId}/auto-roles`}
			/>
			<ModuleCard
				title={t('dashboardSidebar.levels')}
				feature={'levels'}
				moduleState={guildModules?.levels?.status ?? false}
				limits={[
					{
						title: t('dashboardPage:moduleCards.levels.textRewards'),
						amount: guildModules?.levels?.text?.amount,
						limit: 20,
					},
					{
						title: t('dashboardPage:moduleCards.levels.voiceRewards'),
						amount: guildModules?.levels?.voice?.amount,
						limit: 20,
					},
				]}
				url={`/dashboard/${guildId}/levels`}
			/>
			<ModuleCard
				title={t('dashboardSidebar.interactiveRoles')}
				feature={'interactiveRoles'}
				badges={['new']}
				limits={[{ amount: guildModules?.interactiveRoles?.amount, limit: 10 }]}
				url={`/dashboard/${guildId}/interactive-roles`}
			/>
			<ModuleCard
				title={t('dashboardSidebar.embedMessages')}
				feature={'embedMessages'}
				limits={[{ amount: guildModules?.embeds?.amount, limit: 15 }]}
				url={`/dashboard/${guildId}/embeds`}
			/>
			<ModuleCard
				title={t('dashboardSidebar.serverLogs')}
				feature={'serverLogs'}
				moduleState={guildModules?.serverLogs?.status ?? false}
				url={`/dashboard/${guildId}/logs`}
			/>
		</>
	);
}

interface ModuleCardProps {
	title: string;
	feature: string;
	moduleState?: boolean;
	comingSoon?: boolean;
	badges?: typeof featureBadges[number][];
	limits?: {
		title?: string;
		amount: number | undefined;
		limit: number;
	}[];
	url: string;
}

function ModuleCard({ title, feature, moduleState, comingSoon = false, badges, limits, url }: ModuleCardProps) {
	const { t } = useTranslation();
	return (
		<DashboardCard
			initialExpand
			disableIcon
			header={
				<>
					{title}
					{badges ? badges.map(badge => <FeatureBadge key={badge} feature={feature} variant={badge} />) : null}
				</>
			}
			action={typeof moduleState === 'boolean' ? <ModuleState state={moduleState} /> : null}
		>
			<StyledContainer>
				<Content>
					{limits
						? limits.map((limit, index) => (
								<div key={index}>
									{limit.title ? <Typography variant='h6'>{limit.title}</Typography> : null}
									<Typography
										paragraph
										variant='body2'
										color={(limit.amount ?? 0) >= limit.limit ? 'error' : undefined}
									>
										{t('dashboardPage:moduleCard.inUse', { amount: limit.amount ?? 0, limit: limit.limit })}
									</Typography>
								</div>
						  ))
						: null}
					{comingSoon ? (
						<Typography paragraph variant='body2'>
							{t('common:comingSoon')}
						</Typography>
					) : null}
				</Content>
				{
					<Button variant={comingSoon ? 'outlined' : 'contained'} size='small' LinkComponent={Link} href={url}>
						{comingSoon ? t('common:seeDetails') : t('common:manage')}
					</Button>
				}
			</StyledContainer>
		</DashboardCard>
	);
}

const ModuleCircle = styled('span', { shouldForwardProp: prop => prop !== 'state' })<{ state: boolean }>(
	({ theme, state }) => ({
		display: 'inline-block',
		width: '1rem',
		height: '1rem',
		borderRadius: '50%',
		marginLeft: '1rem',
		backgroundColor: theme.palette[state ? 'success' : 'error'].dark,
	})
);

const ModuleState = ({ state }: { state: boolean }) => {
	const { t } = useTranslation('common');
	return (
		<Tooltip title={state ? t('enabled') : t('disabled')}>
			<ModuleCircle state={state} />
		</Tooltip>
	);
};
