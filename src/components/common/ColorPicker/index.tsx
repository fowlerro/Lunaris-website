import { MouseEvent, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Box, ClickAwayListener, IconButton, Paper, Popper, PopperProps, styled, Tooltip } from '@mui/material';
import { HexColorPicker } from 'react-colorful';

import TextField from '@components/Inputs/TextField';

interface IProps {
	placement?: PopperProps['placement'];
	color: string;
	onChange: (color: string) => void;
}

const Circle = styled('div')({
	borderRadius: '50%',
	width: '2rem',
	height: '2rem',
	border: '2px solid #fff',
});

export default function ColorPicker({ placement = 'bottom', color, onChange }: IProps): JSX.Element {
	const { t } = useTranslation('common');
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const open = Boolean(anchorEl);

	const handleClick = (event: MouseEvent<HTMLElement>): void => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};
	return (
		<ClickAwayListener onClickAway={() => setAnchorEl(null)} mouseEvent='onMouseDown'>
			<Box display='inline' role='presentation'>
				<Tooltip title={t('colorPicker').toString()}>
					<IconButton size='medium' onClick={handleClick}>
						<Circle sx={{ backgroundColor: color }} />
					</IconButton>
				</Tooltip>
				<Popper placement={placement} anchorEl={anchorEl} open={open} sx={{ zIndex: 9999 }}>
					<Paper
						elevation={0}
						sx={{
							padding: '1rem',
							backgroundColor: theme => theme.colors.background.secondary,
							boxShadow: theme => theme.shadows[4],
						}}
					>
						<HexColorPicker color={color} onChange={color => onChange(color.toUpperCase())} style={{ width: '100%' }} />
						<TextField
							fullWidth
							label={t('hexColor')}
							margin='normal'
							size='small'
							value={color}
							onChange={e =>
								onChange(e.target.value[0] !== '#' ? `#${e.target.value.toUpperCase()}` : e.target.value.toUpperCase())
							}
						/>
					</Paper>
				</Popper>
			</Box>
		</ClickAwayListener>
	);
}
