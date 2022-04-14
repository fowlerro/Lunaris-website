import { Skeleton as MuiSkeleton, SkeletonProps, styled } from '@mui/material';

type Alignment = 'center' | 'left' | 'right';

type IProps = {
	align?: Alignment;
} & SkeletonProps;

const StyledSkeleton = styled(MuiSkeleton)<{ align?: Alignment }>(({ align }) => ({
	marginLeft: align === 'right' || align === 'center' ? 'auto' : 'unset',
	marginRight: align === 'left' || align === 'center' ? 'auto' : 'unset',

	width: '100%',
	height: '100%',
}));

export default function Skeleton({ align, ...skeletonProps }: IProps): JSX.Element {
	return <StyledSkeleton align={align} animation='wave' {...skeletonProps} />;
}
