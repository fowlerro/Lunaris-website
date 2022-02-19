import styled from '@emotion/styled';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'next-i18next';
import tw from 'twin.macro';

const StyledFooter = styled.footer`
	${tw`bg-background-darker px-4 py-20 md:py-32 mx-auto grid gap-y-8 grid-cols-2 md:grid-cols-3 md:justify-items-center relative`}
`;

const Section = styled.div`
	${tw`flex flex-col text-lg `}
`;

const Header = styled.h5`
	${tw`text-text-muted `}
`;

const Link = styled.a`
	${tw`text-sm my-1 hover:underline max-w-max`}
`;

const Copyright = styled.p`
	${tw`absolute bottom-2 text-text-muted text-xs w-full text-center`}
`;

const Icon = styled(FontAwesomeIcon)`
	${tw`mr-2`}
`;

export default function Footer(): JSX.Element {
	const { t } = useTranslation('layout', { keyPrefix: 'footer' });
	return (
		<StyledFooter>
			<Section>
				<Header>{t('usefulLinks')}</Header>
				<Link href='/commands'>{t('commands')}</Link>
				<Link href='/modules'>{t('modules')}</Link>
				<Link href='/dashboard'>{t('dashboard')}</Link>
			</Section>
			<Section>
				<Header>{t('privacy')}</Header>
				<Link href='/terms-of-use'>{t('terms')}</Link>
				<Link href='/privacy'>{t('privacyPolicy')}</Link>
			</Section>
			<Section>
				<Header>{t('contact')}</Header>
				<Link href='/contact'>{t('contactForm')}</Link>
				<Link href='https://discordapp.com/users/313346190995619841' target='_blank'>
					<Icon icon={faDiscord} />
					Kamil#2107
				</Link>
				<Link>email@example.com</Link>
			</Section>
			<Copyright>Copyright © 2022 Kamil Wenta. All rights reserved.</Copyright>
		</StyledFooter>
	);
}
