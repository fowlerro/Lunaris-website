import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import darkTheme from '@styles/theme';
import React from 'react';

export default function renderWithTheme(
	ui: React.ReactElement,
	options?: Omit<RenderOptions, 'queries'>
): RenderResult {
	const rendered = render(<ThemeProvider theme={darkTheme}>{ui}</ThemeProvider>, options);
	return {
		...rendered,
		rerender: (ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>): RenderResult =>
			renderWithTheme(ui, { container: rendered.container, ...options }),
	};
}
