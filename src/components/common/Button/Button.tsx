import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary';
	size?: 'sm' | 'md';
	children: ReactNode;
}

const StyledButton = styled.button<Pick<ButtonProps, 'variant' | 'size'>>`
	background: ${({ variant, theme }) => (variant === 'primary' ? theme.colors.primary : 'none')};
	border: ${({ variant, theme }) => (variant === 'secondary' ? `2px solid ${theme.colors.primary}` : 'none')};
	border-radius: ${({ size }) => (size === 'sm' ? '8px' : '10px')};
	color: ${({ theme }) => theme.colors.white};
	padding: ${({ size }) => (size === 'sm' ? '10px 24px' : '12px 36px')};
	font-weight: 600;
	font-size: ${({ size }) => (size === 'sm' ? '.5rem' : '1rem')};
	box-shadow: -2px 4px 6px 2px rgba(0, 0, 0, 0.25);
`;

export default function Button({
	variant = 'primary',
	size = 'md',
	children,
	...buttonProps
}: ButtonProps): JSX.Element {
	return (
		<StyledButton variant={variant} size={size} {...buttonProps}>
			{children}
		</StyledButton>
	);
}
