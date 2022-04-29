import Select, { SelectProps } from '@components/Inputs/Select';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';

type IProps<T> = {
	inputProps: SelectProps;
} & Omit<ControllerProps<T>, 'render'>;

export default function ControlledSelect<T extends FieldValues>({ inputProps, ...props }: IProps<T>): JSX.Element {
	return (
		<Controller<T>
			{...props}
			render={({ field, fieldState }) => (
				<Select {...field} error={fieldState.invalid} helperText={fieldState.error?.message} {...inputProps} />
			)}
		/>
	);
}
