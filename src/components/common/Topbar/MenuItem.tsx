import Link from 'next/link';
import styled from '@emotion/styled';
import tw from 'twin.macro';

interface IProps {
	href: string;
	label: string;
	active: boolean;
}

const Item = styled.li<Pick<IProps, 'active'>>(({ active }) => [
	tw`text-center my-8 text-base font-semibold lg:text-xl`,
	active ? tw`md:font-semibold` : tw`md:font-normal`,
]);

export default function MenuItem({ href, label, active }: IProps): JSX.Element {
	return (
		<Item active={active}>
			<Link href={href}>{label}</Link>
		</Item>
	);
}
