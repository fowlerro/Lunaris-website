import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { faFolder, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

import Icon from '@components/Icon';
import useUser from '@hooks/useUser';

import LoginButton from './LoginButton';
import ProfileButton from './ProfileButton';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileUsername } from './ProfileUsername';
import ProfileMenu from './Menu';
import ProfileMenuItem from './Menu/Item';

import type { User } from 'types';

export default function Profile(): JSX.Element {
	const user = useUser({});

	return user ? <ProfileWrapper user={user} /> : <LoginButton />;
}

function ProfileWrapper({ user }: { user: User }): JSX.Element {
	const { t } = useTranslation('layout');
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const open = Boolean(anchorEl);

	const handleOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<ProfileButton open={open} userTag={user.discordTag} onClick={handleOpen}>
				<ProfileAvatar userId={user.discordId} avatarHash={user.avatar} />
				<ProfileUsername username={user.discordTag} />
			</ProfileButton>
			<ProfileMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
				<ProfileMenuItem href='/dashboard' icon={<Icon icon={faUser} />} label={t('profileMenu.profile')} />
				<ProfileMenuItem href='/servers' icon={<Icon icon={faFolder} />} label={t('profileMenu.servers')} />
				<ProfileMenuItem
					error
					href={`${process.env.API_URL}/auth/logout`}
					icon={<Icon icon={faRightFromBracket} sx={{ color: theme => theme.palette.error.main }} />}
					label={t('profileMenu.logout')}
				/>
			</ProfileMenu>
		</>
	);
}
