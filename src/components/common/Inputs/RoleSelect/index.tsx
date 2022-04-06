import { useTranslation } from 'next-i18next';

import { Autocomplete, MenuItem, TextField } from '@mui/material';

import { getRoleColor } from '@utils/utils';

import type { Role } from 'types';

interface IProps {
	roles: Role[];
	label?: string;
	value?: string | null;
	error?: boolean;
	helperText?: string;
	disableClearable?: boolean;
	onChange: (roleId: string) => void;
}

export default function RoleSelect({
	roles,
	label,
	value,
	error = false,
	helperText,
	disableClearable = false,
	onChange,
}: IProps): JSX.Element {
	const { t } = useTranslation();

	const options = roles.map(role => ({
		id: role.id,
		label: role.name,
		position: role.position,
		color: getRoleColor(role.color),
	}));

	console.log({ options, selected: options.find(role => role.id === value) });

	return (
		<Autocomplete
			options={options.sort((a, b) => b.position - a.position)}
			isOptionEqualToValue={(option, value) => option.id === value.id}
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
				<TextField {...params} margin='dense' label={label ?? t('common:role')} error={error} helperText={helperText} />
			)}
			onChange={(_, role) => onChange(role?.id ?? '')}
		/>
	);
}
