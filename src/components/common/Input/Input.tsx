import styled from '@emotion/styled';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputHTMLAttributes } from 'react';
import tw from 'twin.macro';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	fullWidth?: boolean;
}

const InputContainer = styled.div<Pick<IProps, 'fullWidth'>>`
	${tw`relative flex items-center text-text-muted focus-within:text-white`}
	${({ fullWidth }) => fullWidth && tw`w-full`}
`;

const Icon = styled(FontAwesomeIcon)`
	${tw`absolute ml-6 pointer-events-none`}
`;

const StyledInput = styled.input<Pick<IProps, 'fullWidth'>>`
	${tw`placeholder-text-muted bg-background-input border-0 rounded-xl shadow-xl py-4 pr-6 pl-16`}
	${({ fullWidth }) => fullWidth && tw`w-full`}
`;

export default function Input({ fullWidth = false, ...inputProps }: IProps): JSX.Element {
	return (
		<InputContainer fullWidth={fullWidth}>
			<Icon icon={faSearch} size='2x' />
			<StyledInput fullWidth={fullWidth} {...inputProps} />
		</InputContainer>
	);
}
