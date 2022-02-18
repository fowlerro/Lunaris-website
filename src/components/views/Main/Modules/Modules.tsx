import styled from '@emotion/styled';
import tw from 'twin.macro';
import ModulesCarousel from './ModulesCarousel';
import { Media } from '@styles/Media';
import ModulesDesktop from './ModulesDesktop';

const Section = styled.section`
	${tw`bg-background-secondary text-center py-16`}
`;

const modules = ['embeds', 'reactionRoles', 'levels', 'autoRoles', 'welcomeMessages', 'serverLogs'];

export default function Modules(): JSX.Element {
	return (
		<Section>
			<Media at='sm'>
				<ModulesCarousel modules={modules} />
			</Media>
			<Media greaterThan='sm'>
				<ModulesDesktop modules={modules} />
			</Media>
		</Section>
	);
}
