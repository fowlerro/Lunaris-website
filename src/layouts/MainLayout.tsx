import React, { ReactNode } from 'react';
import Topbar from '@components/layout/Topbar/Topbar';
import Footer from '@components/layout/Footer';
interface IProps {
	children: ReactNode;
}

export default function MainLayout({ children }: IProps): JSX.Element {
	return (
		<>
			<Topbar />
			<main id='main'>{children}</main>
			<Footer />
		</>
	);
}
