import { Divider, ListItemIcon, ListItemText, MenuItem, TextField, TextFieldProps } from '@mui/material';

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import Icon from '@components/Icon';

export interface SelectItem {
	value: string;
	label: string;
	description?: string;
	icon?: IconDefinition;
}

export interface SelectAction {
	label: string;
	description?: string;
	icon?: IconDefinition;
	onClick: () => void;
}

export type SelectProps = {
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
}: SelectProps): JSX.Element {
	return (
		<TextField
			SelectProps={{
				renderValue: value => {
					const item = items.find(item => item.value === value);
					if (!item) return '';
					return (
						<MenuItem
							sx={{ margin: 0, padding: 0, '&:hover': { background: 'none' } }}
							disableRipple
							disableTouchRipple
						>
							{item.icon ? (
								<ListItemIcon>
									<Icon icon={item.icon} size='1x' />
								</ListItemIcon>
							) : null}
							<ListItemText
								primary={item.label}
								secondary={displayDescription && item.description}
								secondaryTypographyProps={{
									whiteSpace: 'pre-wrap',
									sx: {
										fontSize: '0.75rem',
									},
								}}
							/>
						</MenuItem>
					);
				},
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
					{item.icon ? (
						<ListItemIcon>
							<Icon icon={item.icon} size='1x' />
						</ListItemIcon>
					) : null}
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
