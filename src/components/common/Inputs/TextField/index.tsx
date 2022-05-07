import { ChangeEvent, forwardRef, Ref, useEffect, useState } from 'react';

import { Box, FormHelperText, TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';

export type TextFieldProps = {
	characterLimit?: number;
} & MuiTextFieldProps;

const TextField = forwardRef<HTMLInputElement | HTMLDivElement, TextFieldProps>(function TextField(
	{
		characterLimit,
		helperText,
		FormHelperTextProps,
		value,
		onChange,
		margin,
		error,
		fullWidth,
		...props
	}: TextFieldProps,
	ref: Ref<HTMLInputElement | HTMLDivElement>
) {
	const initialCount = typeof value === 'string' ? value.length : 0;
	const [count, setCount] = useState(initialCount);

	const marginTop = margin === 'normal' ? '16px' : margin === 'dense' ? '8px' : '0px';
	const marginBottom = margin === 'normal' ? '8px' : margin === 'dense' ? '4px' : '0px';

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setCount(event.target.value.length);
		onChange?.(event);
	};

	useEffect(() => {
		setCount(initialCount);
	}, [initialCount]);

	if (!characterLimit)
		return (
			<MuiTextField
				{...props}
				error={error}
				ref={ref}
				value={value}
				onChange={onChange}
				helperText={helperText}
				FormHelperTextProps={FormHelperTextProps}
				margin={margin}
				fullWidth={fullWidth}
			/>
		);

	return (
		<Box sx={{ marginTop, marginBottom, display: 'inline-block', width: fullWidth ? '100%' : 'auto' }}>
			<MuiTextField {...props} error={error} value={value} onChange={handleChange} ref={ref} fullWidth={fullWidth} />
			<Box sx={{ display: 'flex', paddingInline: '.5rem' }}>
				{helperText && (
					<FormHelperText
						{...FormHelperTextProps}
						sx={{
							color: theme => (error ? theme.palette.error.main : 'inherit'),
							maxWidth: 'fit-content',
						}}
					>
						{helperText}
					</FormHelperText>
				)}
				<FormHelperText
					sx={{
						marginLeft: 'auto',
						color: theme => (count > characterLimit ? theme.palette.error.main : theme.colors.text.secondary),
					}}
				>{`${count}/${characterLimit}`}</FormHelperText>
			</Box>
		</Box>
	);
});

export default TextField;
