import React, { ReactNode } from 'react';

import TopbarMobile from '@components/Topbar/Mobile/TopbarMobile';
import TopbarDesktop from '@components/Topbar/Desktop/TopbarDesktop';
import { Media } from '@styles/Media';
import Footer from '@components/Footer';
interface IProps {
	children: ReactNode;
}

export default function MainLayout({ children }: IProps): JSX.Element {
	return (
		<>
			<Media at='sm'>
				<TopbarMobile />
			</Media>
			<Media greaterThan='sm'>
				<TopbarDesktop />
			</Media>
			{children}
			<Footer />
		</>
	);
}
