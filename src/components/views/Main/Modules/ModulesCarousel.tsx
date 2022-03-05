import { createRef, useEffect, useState } from 'react';
import { styled, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import CarouselItem from './CarouselItem';

interface IProps {
	modules: string[];
}

const CarouselContainer = styled('div')({
	overflowY: 'hidden',
});

const CarouselList = styled('ul')({
	display: 'flex',
	listStyle: 'none',
	margin: 0,
	padding: 0,
	overflowX: 'scroll',

	scrollSnapType: 'x',
	msScrollSnapType: 'mandatory',
	scrollSnapMargin: '10%',

	// Hide scrollbar
	msOverflowStyle: 'none',
	scrollbarWidth: 'none',
});

const CarouselNav = styled('div')({
	display: 'flex',
	justifyContent: 'center',
	paddingBlock: '0.75rem',
});

const CarouselIndicator = styled('button')<{ current: boolean }>(({ theme, current }) => ({
	border: 'none',
	borderRadius: '50%',
	width: '0.75rem',
	height: '0.75rem',
	marginInline: '0.5rem',
	backgroundColor: current ? theme.colors.background.input : theme.colors.text.primary,
}));

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Typography variant='h2' sx={{ marginBottom: '1rem' }}>
				{t('common:modules')}
			</Typography>
			<div>
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
			</div>
		</>
	);
}
