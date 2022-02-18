import Button from '@components/Button/Button';
import styled from '@emotion/styled';
import tw from 'twin.macro';

interface IProps {
	title: string;
	description: string;
	id: string;
}

const Card = styled.div`
	${tw`text-left max-w-sm mb-32 ml-[15%] even-of-type:ml-[60%]`}
`;

const H3 = styled.h3`
	${tw`mt-5 mb-4`}
`;

const Paragraph = styled.p`
	${tw`text-lg`}
`;

const StyledButton = styled(Button)`
	${tw`mt-4`}
`;

export default function ModuleItem({ title, description, id }: IProps): JSX.Element {
	return (
		<Card id={id} aria-label={title}>
			<H3>{title}</H3>
			<Paragraph>{description}</Paragraph>
			<StyledButton variant='secondary' size='sm'>
				Read more
			</StyledButton>
		</Card>
	);
}
