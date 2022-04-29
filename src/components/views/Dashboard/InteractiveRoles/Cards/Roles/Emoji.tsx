import Image from 'next/image';

import { styled } from '@mui/material';

import { faFaceSmileBeam } from '@fortawesome/free-solid-svg-icons';

import Icon from '@components/Icon';

import { getGuildEmojiURL } from '@utils/utils';

interface EmojiProps {
	emoji?: string;
}

const StyledEmoji = styled('div')({
	position: 'relative',
	width: '2rem',
	height: '2rem',
	fontSize: '1.75rem',
	textAlign: 'center',
	verticalAlign: 'center',
});

export default function Emoji({ emoji }: EmojiProps): JSX.Element {
	return (
		<StyledEmoji>
			{emoji ? (
				emoji.length > 2 ? (
					<Image src={getGuildEmojiURL(emoji)} alt={emoji} layout='fill' objectFit='contain' />
				) : (
					<span>{emoji}</span>
				)
			) : (
				<Icon icon={faFaceSmileBeam} />
			)}
		</StyledEmoji>
	);
}
