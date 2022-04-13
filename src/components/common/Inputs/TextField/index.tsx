import { FormHelperText, TextField as MuiTextField, TextFieldProps } from '@mui/material';
import { ChangeEvent, forwardRef, Ref, useEffect, useState } from 'react';

type IProps = {
	characterLimit?: number;
} & TextFieldProps;

const TextField = forwardRef<HTMLInputElement | HTMLDivElement, IProps>(function TextField(
	{ characterLimit, helperText, FormHelperTextProps, value, onChange, margin, error, ...props }: IProps,
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
			/>
		);

	return (
		<div style={{ marginTop, marginBottom }}>
			<MuiTextField {...props} error={error} value={value} onChange={handleChange} ref={ref} />
			<div style={{ display: 'flex', paddingInline: '.5rem' }}>
				{helperText && (
					<FormHelperText
						{...FormHelperTextProps}
						sx={{ color: theme => (error ? theme.palette.error.main : 'inherit') }}
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
			</div>
		</div>
	);
});

export default TextField;
