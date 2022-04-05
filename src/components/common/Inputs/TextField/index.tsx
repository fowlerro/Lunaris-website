import { FormHelperText, TextField as MuiTextField, TextFieldProps } from '@mui/material';
import { ChangeEvent, forwardRef, Ref, useState } from 'react';

type IProps = {
	characterLimit?: number;
} & TextFieldProps;

const TextField = forwardRef<HTMLInputElement | HTMLDivElement, IProps>(function TextField(
	// eslint-disable-next-line react/prop-types
	{ characterLimit, helperText, FormHelperTextProps, onChange, margin, ...props }: IProps,
	ref: Ref<HTMLInputElement | HTMLDivElement>
) {
	const [count, setCount] = useState(0);

	const marginTop = margin === 'normal' ? '16px' : margin === 'dense' ? '8px' : '0px';
	const marginBottom = margin === 'normal' ? '8px' : margin === 'dense' ? '4px' : '0px';

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setCount(event.target.value.length);
		onChange?.(event);
	};

	if (!characterLimit)
		return (
			<MuiTextField
				{...props}
				ref={ref}
				onChange={onChange}
				helperText={helperText}
				FormHelperTextProps={FormHelperTextProps}
				margin={margin}
			/>
		);

	return (
		<div style={{ marginTop, marginBottom }}>
			<MuiTextField {...props} onChange={handleChange} ref={ref} />
			<div style={{ display: 'flex', paddingInline: '.5rem' }}>
				{helperText && <FormHelperText {...FormHelperTextProps}>{helperText}</FormHelperText>}
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
