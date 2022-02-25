import React, { ForwardedRef, forwardRef } from 'react';

interface IProps {
	title: string;
	description: string;
	id: string;
}

// const Card = styled.li`
// 	${tw`bg-background-lighter rounded-xl p-4 pb-12 flex-shrink-0 w-[80%] mx-[10%]`}
// 	scroll-snap-align: center;
// 	-ms-scroll-snap-align: center;
// 	scroll-snap-stop: always;
// 	-ms-scroll-snap-stop: always;
// `;

// const H3 = styled.h3`
// 	${tw`mt-5 mb-4`}
// `;

function ModuleCard({ title, description, id }: IProps, ref: ForwardedRef<HTMLLIElement>): JSX.Element {
	return (
		<li ref={ref} id={id} aria-label={title}>
			<h3>{title}</h3>
			<p>{description}</p>
		</li>
		// <Card ref={ref} id={id} role='slider' aria-label={title}>
		// 	<H3>{title}</H3>
		// 	<p>{description}</p>
		// </Card>
	);
}

export default forwardRef<HTMLLIElement, IProps>(ModuleCard);
