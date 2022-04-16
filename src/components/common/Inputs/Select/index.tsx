import { Divider, ListItemIcon, ListItemText, MenuItem, TextField, TextFieldProps } from '@mui/material';

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import Icon from '@components/Icon';

export interface SelectItem {
	value: string;
	label: string;
	description?: string;
}

export interface SelectAction {
	label: string;
	description?: string;
	icon?: IconDefinition;
	onClick: () => void;
}

type IProps = {
	items: SelectItem[];
	actions?: SelectAction[];
	displayDescription?: boolean;
} & TextFieldProps;

export default function Select({
	items,
	actions,
	displayDescription = false,
	fullWidth = true,
	select = true,
	...props
}: IProps): JSX.Element {
	return (
		<TextField
			SelectProps={{
				renderValue: displayDescription ? undefined : value => items.find(item => item.value === value)?.label || '',
			}}
			fullWidth={fullWidth}
			select={select}
			{...props}
		>
			{actions ? (
				<div>
					{actions.map(action => (
						<MenuItem key={action.label} onClick={action.onClick}>
							{action.icon ? (
								<ListItemIcon>
									<Icon icon={action.icon} size='1x' />
								</ListItemIcon>
							) : null}
							<ListItemText
								primary={action.label}
								secondary={action.description}
								secondaryTypographyProps={{
									whiteSpace: 'pre-wrap',
									sx: {
										fontSize: '0.75rem',
									},
								}}
							/>
						</MenuItem>
					))}
					<Divider variant='middle' />
				</div>
			) : null}
			{items.map(item => (
				<MenuItem key={item.value} value={item.value}>
					<ListItemText
						primary={item.label}
						secondary={item.description}
						secondaryTypographyProps={{
							whiteSpace: 'pre-wrap',
							sx: {
								fontSize: '0.75rem',
							},
						}}
					/>
				</MenuItem>
			))}
		</TextField>
	);
}
