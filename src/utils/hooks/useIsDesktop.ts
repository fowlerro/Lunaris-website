import { useMediaQuery, useTheme } from '@mui/material';

export default function useIsDesktop(): boolean {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
	return isDesktop;
}
