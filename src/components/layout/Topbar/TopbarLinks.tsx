import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Box, Button, Divider, Drawer, List, ListItem, styled } from '@mui/material';
import { faBell } from '@fortawesome/free-regular-svg-icons/faBell';

import LanguageSwitcher from '@components/LanguageSwitcher';
import Icon from '@components/Icon';
import Links, { LinkItem } from './Links';
import Hamburger from './Hamburger';
import Profile from './Profile';
import UserMenuItemsMobile from './UserMenuItemsMobile';
import useUser from '@hooks/useUser';
import useIsDesktop from '@hooks/useIsDesktop';
import { loginURL } from './Profile/LoginButton';

const ActionList = styled(List)({
	display: 'flex',
});
const ActionItem = styled(ListItem)({
	padding: '.5rem',
	flexBasis: 'fit-content',
});

const DrawerContainer = styled(Box)(({ theme }) => ({
	backgroundColor: theme.colors.background.lighter,
	color: theme.colors.text.primary,
}));

const ProfileSection = styled(Box)({
	display: 'flex',
	justifyContent: 'center',
	marginBottom: '2em',
});

export default function TopbarLinks(): JSX.Element {
	const isDesktop = useIsDesktop();

	return (
		<>
			{isDesktop && (
				<>
					<Links />
					<div></div>
				</>
			)}
			<ActionList aria-label='Action Buttons'>
				<ActionItem>
					<LanguageSwitcher />
				</ActionItem>
				<ActionItem>
					<Icon icon={faBell} />
				</ActionItem>
				{isDesktop ? (
					<LinkItem>
						<Profile />
					</LinkItem>
				) : (
					<Mobile />
				)}
			</ActionList>
		</>
	);
}

function Mobile(): JSX.Element {
	const [expanded, setExpanded] = useState(false);
	const user = useUser({});
	const { t } = useTranslation();

	return (
		<>
			<ActionItem sx={{ marginInline: '1em' }}>
				<Hamburger expanded={expanded} setExpanded={setExpanded} />
			</ActionItem>
			<Drawer anchor='top' open={expanded} onClose={() => setExpanded(false)}>
				<DrawerContainer>
					<Links setExpanded={setExpanded} />
					{user ? (
						<>
							<Divider variant='middle' sx={{ color: theme => theme.colors.text.muted }}>
								Profile
							</Divider>
							<UserMenuItemsMobile user={user} />
						</>
					) : (
						<ProfileSection>
							<Button
								variant='contained'
								sx={{ paddingInline: '2em' }}
								disableFocusRipple
								href={loginURL}
								aria-label='Login'
							>
								{t('common:login')}
							</Button>
						</ProfileSection>
					)}
				</DrawerContainer>
			</Drawer>
		</>
	);
}
