import Link from 'next/link';
import styled from 'styled-components';

interface IProps {
	href: string;
	label: string;
	active: boolean;
}

const Item = styled.li<Pick<IProps, 'active'>>`
	text-align: center;
	margin-top: 2em;
	margin-bottom: 2em;
	font-size: 1rem;
	font-weight: 600;

	@media (min-width: ${({ theme }) => theme.breakpoints.md}) {
		font-weight: ${({ active }) => (active ? 600 : 400)};
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
		font-size: 1.2rem;
	}
`;

export default function MenuItem({ href, label, active }: IProps): JSX.Element {
	return (
		<Item active={active}>
			<Link href={href}>{label}</Link>
		</Item>
	);
}
