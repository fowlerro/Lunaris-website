import { ReactElement } from 'react';

const mock = ({ src, alt }: { src: string; alt: string }): ReactElement => {
	// eslint-disable-next-line @next/next/no-img-element
	return <img src={src} alt={alt} />;
};

export default mock;
