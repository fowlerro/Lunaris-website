import React, { ReactNode } from 'react';
import Topbar from '@components/layout/Topbar/Topbar';
import Footer from '@components/layout/Footer';
interface IProps {
	children: ReactNode;
}

export default function MainLayout({ children }: IProps): JSX.Element {
	return (
		<>
			<div style={{ minHeight: '100vh' }}>
				<Topbar />
				<main id='main' style={{ minHeight: '100%' }}>
					{children}
				</main>
			</div>
			<Footer />
		</>
	);
}
