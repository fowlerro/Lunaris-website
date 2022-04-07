import { Controller, ControllerProps, FieldValues } from 'react-hook-form';

import { Switch } from '@mui/material';

type IProps<T> = Omit<ControllerProps<T>, 'render'>;

export default function ControlledSwitch<T extends FieldValues>(props: IProps<T>): JSX.Element {
	return <Controller<T> {...props} render={({ field }) => <Switch {...field} checked={field.value} />} />;
}
