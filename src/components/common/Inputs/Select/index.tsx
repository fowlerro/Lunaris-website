import { ListItemText, MenuItem, TextField, TextFieldProps } from '@mui/material';

export interface SelectItem {
	value: string;
	label: string;
	description?: string;
}

type IProps = {
	items: SelectItem[];
	displayDescription?: boolean;
} & TextFieldProps;

export default function Select({ items, displayDescription = false, ...props }: IProps): JSX.Element {
	return (
		<TextField
			SelectProps={{
				renderValue: displayDescription ? undefined : value => items.find(item => item.value === value)?.label || '',
			}}
			{...props}
		>
			{items.map(item => (
				<MenuItem key={item.value} value={item.value}>
					<ListItemText primary={item.label} secondary={item.description} />
				</MenuItem>
			))}
		</TextField>
	);
}
