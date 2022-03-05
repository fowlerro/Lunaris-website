import { styled } from '@mui/material';
import ModulesCarousel from './ModulesCarousel';
import ModulesDesktop from './ModulesDesktop';
import useIsDesktop from '@hooks/useIsDesktop';

const Section = styled('section')(({ theme }) => ({
	backgroundColor: theme.colors.background.secondary,
	textAlign: 'center',
	paddingBlock: '4rem',
}));

const modules = ['embeds', 'reactionRoles', 'levels', 'autoRoles', 'welcomeMessages', 'serverLogs'];

export default function Modules(): JSX.Element {
	const isDesktop = useIsDesktop();
	return <Section>{isDesktop ? <ModulesDesktop modules={modules} /> : <ModulesCarousel modules={modules} />}</Section>;
}
