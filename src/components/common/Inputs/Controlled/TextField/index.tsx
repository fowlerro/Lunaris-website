import TextField, { TextFieldProps } from '@components/Inputs/TextField';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';

type IProps<T> = {
	inputProps?: TextFieldProps;
} & Omit<ControllerProps<T>, 'render'>;

export default function ControlledTextField<T extends FieldValues>({ inputProps, ...props }: IProps<T>): JSX.Element {
	return (
		<Controller<T>
			{...props}
			render={({ field, fieldState }) => (
				<TextField {...field} error={fieldState.invalid} helperText={fieldState.error?.message} {...inputProps} />
			)}
		/>
	);
}
