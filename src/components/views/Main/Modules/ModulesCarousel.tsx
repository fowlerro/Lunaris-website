import { styled } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { createRef, useEffect, useState } from 'react';
import CarouselItem from './CarouselItem';

interface IProps {
	modules: string[];
}

// const H2 = styled.h2`
// 	${tw`text-center mb-12`}
// `;

// const Carousel = styled.div`
// 	${tw``}
// `;

// const CarouselContainer = styled.div`
// 	${tw`overflow-y-hidden`}
// `;

// const CarouselList = styled.ul`
// 	${tw`p-0 m-0 list-none flex overflow-x-scroll`}
// 	scroll-snap-type: x mandatory;
// 	-ms-scroll-snap-type: x mandatory;
// 	scroll-margin: 10%;
// 	-ms-scroll-margin: 10%;

// 	/* Hide scrollbar */
// 	-ms-overflow-style: none;
// 	scrollbar-width: none;
// 	&::-webkit-scrollbar {
// 		display: none;
// 	}
// `;

// const CarouselNav = styled.div`
// 	${tw`flex justify-center py-3`}
// `;
// const CarouselIndicator = styled.button<{ current: boolean }>`
// 	${tw`border-0 rounded-full w-3 h-3 mx-2`}
// 	${({ current }) => (current ? tw`bg-background-input` : tw`bg-white`)}
// `;

const CarouselIndicator = styled('button')<{ current: boolean }>({});

export default function ModulesCarousel({ modules }: IProps): JSX.Element {
	const [current, setCurrent] = useState(modules[0]);
	const itemRefs = modules.map(() => createRef<HTMLLIElement>());
	const { t } = useTranslation();

	const handleSlide = (item: string, index: number) => {
		setCurrent(item);
		itemRefs[index].current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
	};

	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) setCurrent(entries[0].target.id);
		});
		modules.forEach((item, index) => {
			const curr = itemRefs[index].current;
			if (curr) observer.observe(curr);
		});
		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<>
			<h2>{t('common:modules')}</h2>
			<div>
				<div>
					<ul>
						{modules.map((module, index) => (
							<CarouselItem
								ref={itemRefs[index]}
								id={module}
								key={module}
								title={t(`modules:${module}.title`)}
								description={t(`modules:${module}.shortDesc`)}
							/>
						))}
					</ul>
				</div>
				<nav>
					{modules.map((item, index) => (
						<CarouselIndicator
							key={item}
							current={item === current}
							onClick={() => handleSlide(item, index)}
						></CarouselIndicator>
					))}
				</nav>
			</div>
			{/* <H2>{t('common:modules')}</H2>
			<Carousel>
				<CarouselContainer>
					<CarouselList>
						{modules.map((module, index) => (
							<CarouselItem
								ref={itemRefs[index]}
								id={module}
								key={module}
								title={t(`modules:${module}.title`)}
								description={t(`modules:${module}.shortDesc`)}
							/>
						))}
					</CarouselList>
				</CarouselContainer>
				<CarouselNav>
					{modules.map((item, index) => (
						<CarouselIndicator
							key={item}
							current={item === current}
							onClick={() => handleSlide(item, index)}
						></CarouselIndicator>
					))}
				</CarouselNav>
			</Carousel> */}
		</>
	);
}
