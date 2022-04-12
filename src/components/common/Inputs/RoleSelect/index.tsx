import useTranslation from 'next-translate/useTranslation';

import { Autocomplete, MenuItem, TextField, TextFieldProps, UseAutocompleteProps } from '@mui/material';

import { getRoleColor } from '@utils/utils';

import type { Role } from 'types';

type Option = {
	id: string;
	label: string;
	position: number;
	color: string;
};

interface IProps {
	roles: Role[];
	label?: string;
	value?: string | null;
	error?: boolean;
	helperText?: string;
	disableClearable?: boolean;
	size?: TextFieldProps['size'];
	onChange: (roleId: string) => void;
	filterOptions?: (options: Option[]) => Option[];
}

export default function RoleSelect({
	roles,
	label,
	value,
	error = false,
	helperText,
	disableClearable = false,
	size = 'medium',
	onChange,
	filterOptions,
}: IProps): JSX.Element {
	const { t } = useTranslation();

	const options = roles.map(role => ({
		id: role.id,
		label: role.name,
		position: role.position,
		color: getRoleColor(role.color),
	}));

	const filter: UseAutocompleteProps<Option, boolean, boolean, boolean>['filterOptions'] = (
		options,
		{ inputValue }
	) => {
		if (!inputValue) return filterOptions ? filterOptions(options) : options;
		const filteredOptions = options.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()));

		return filterOptions ? filterOptions(filteredOptions) : filteredOptions;
	};

	return (
		<Autocomplete
			options={options.sort((a, b) => b.position - a.position)}
			isOptionEqualToValue={(option, value) => option.id == value?.id}
			filterOptions={filter}
			sx={{
				textTransform: 'none',
				['& .MuiAutocomplete-inputRoot']: {
					color: options.find(role => role.id === value)?.color,
				},
			}}
			ListboxProps={{
				style: { textTransform: 'none' },
			}}
			value={value ? options.find(role => role.id === value) : null}
			disableClearable={disableClearable}
			renderOption={(props, { id, label, color }) => (
				<MenuItem sx={{ color }} {...props} key={id}>
					{label}
				</MenuItem>
			)}
			renderInput={params => (
				<TextField
					{...params}
					size={size}
					margin='dense'
					label={label ?? t('common:role')}
					error={error}
					helperText={helperText}
				/>
			)}
			onChange={(_, role) => onChange(role?.id ?? '')}
		/>
	);
}
