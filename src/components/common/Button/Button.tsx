import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary';
	size?: 'sm' | 'md';
	children: ReactNode;
}

const StyledButton = styled.button<Pick<ButtonProps, 'variant' | 'size'>>(({ variant, size }) => [
	variant === 'primary' ? tw`bg-primary` : tw`bg-transparent`,
	variant === 'secondary' ? tw`border-2 border-primary` : tw`border-none`,
	size === 'sm' ? tw`rounded-lg px-6 py-2.5 text-xs` : tw`rounded-xl px-9 py-3 text-base`,
	tw`text-white font-semibold shadow-lg hover:bg-primary-600`,
]);

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
