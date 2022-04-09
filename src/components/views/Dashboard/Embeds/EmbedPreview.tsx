import { useRouter } from 'next/router';
import { Control, useWatch } from 'react-hook-form';

import { formatRelative } from 'date-fns';
import { pl } from 'date-fns/locale';

import { useMediaQuery, useTheme, styled } from '@mui/material';

import Avatar from '@components/Avatar';
import logo from '@assets/logo192.png';

import type { EmbedMessage } from '@types';

const Container = styled('div')(({ theme }) => ({
	position: 'relative',
	maxWidth: '90vw',
	backgroundColor: '#36393F',
	borderRadius: theme.spacing(1),
	padding: '.3rem',
	display: 'flex',
}));

const AvatarContainer = styled('div')(({ theme }) => ({
	borderRadius: '50%',
	position: 'relative',
	marginTop: '.2rem',
	width: '40px',
	height: '40px',
	[theme.breakpoints.down('sm')]: {
		width: '30px',
		height: '30px',
		marginTop: '.5rem',
	},
}));

const ContentWrapper = styled('div')(({ theme }) => ({
	marginLeft: '1rem',
	overflow: 'hidden',
	maxWidth: '400px',
	[theme.breakpoints.down('sm')]: {
		marginLeft: '.5rem',
	},
}));

const UsernameWrapper = styled('div')({});

const Username = styled('span')(({ theme }) => ({
	color: '#1597E0',
	fontWeight: 400,
	[theme.breakpoints.down('sm')]: {
		fontSize: '.8rem',
	},
}));

const Badge = styled('span')(({ theme }) => ({
	background: '#5865F2',
	display: 'inline-block',
	fontSize: '.7rem',
	borderRadius: '.2rem',
	height: '1rem',
	marginLeft: '.2rem',
	verticalAlign: 'text-top',
	textTransform: 'uppercase',
	padding: '0 .3rem',
	fontWeight: 400,
	[theme.breakpoints.down('sm')]: {
		fontSize: '.55rem',
		height: '.9rem',
		verticalAlign: 'middle',
		padding: '.05rem .3rem',
	},
}));

const Timestamp = styled('span')(({ theme }) => ({
	color: '#72767d',
	fontSize: '.75rem',
	marginLeft: '.5rem',
	[theme.breakpoints.down('sm')]: {
		fontSize: '.65rem',
	},
}));

const MessageContent = styled('div')(({ theme }) => ({
	wordWrap: 'break-word',
	whiteSpace: 'pre-wrap',
	[theme.breakpoints.down('sm')]: {
		fontSize: '.9rem',
	},
}));

const EmbedWrapper = styled('div')({
	display: 'flex',
	fontFamily: 'Whitney, "Helvetica Neue", Helvetica, Arial, sans-serif',
	maxWidth: '520px',
});

const EmbedColorPill = styled('div')(({ theme }) => ({
	width: '.25rem',
	borderTopLeftRadius: '4px',
	borderBottomLeftRadius: '4px',
	[theme.breakpoints.down('sm')]: {
		width: '.2rem',
	},
}));

const Embed = styled('div')(({ theme }) => ({
	background: '#2F3136',
	minWidth: '2rem',
	minHeight: '2rem',
	width: 'fit-content',
	padding: '.8rem',
	borderTopRightRadius: '4px',
	borderBottomRightRadius: '4px',
	display: 'grid',
	gridAutoColumns: 'minmax(1fr, auto)',
	rowGap: '.5rem',
	columnGap: '.8rem',
	[theme.breakpoints.down('sm')]: {
		padding: '.6rem',
		rowGap: '.4rem',
		columnGap: '.6rem',
	},
}));

const Author = styled('div')({});

const AuthorName = styled('h5')(({ theme }) => ({
	display: 'inline',
	margin: 0,
	[theme.breakpoints.down('sm')]: {
		fontSize: '.8rem',
	},
}));

const AuthorAvatar = styled('img')(({ theme }) => ({
	display: 'inline',
	borderRadius: '50%',
	width: '1.5rem',
	height: '1.5rem',
	verticalAlign: 'middle',
	marginRight: '.5rem',
	[theme.breakpoints.down('sm')]: {
		width: '1.4rem',
		height: '1.4rem',
		marginRight: '.3rem',
	},
}));

const Title = styled('h4')({
	gridColumn: '1/1',
	margin: 0,
});

const Link = styled('a')({
	color: '#fff',
	textDecoration: 'none',
	'&:hover': {
		textDecoration: 'underline',
	},
});

const Description = styled('div')(({ theme }) => ({
	color: '#dcddde',
	fontSize: '.8rem',
	whiteSpace: 'pre-wrap',
	[theme.breakpoints.down('sm')]: {
		fontSize: '.75rem',
	},
}));

const Fields = styled('div')(({ theme }) => ({
	display: 'grid',
	gridColumn: '1/1',
	columnGap: '8px',
	[theme.breakpoints.down('sm')]: {
		columnGap: '6px',
	},
}));

const Field = styled('div')({});

const FieldName = styled('h5')(({ theme }) => ({
	margin: 0,
	[theme.breakpoints.down('sm')]: {
		fontSize: '.8rem',
	},
}));

const FieldValue = styled('span')(({ theme }) => ({
	color: '#dcddde',
	margin: 0,
	fontSize: '.8rem',
	verticalAlign: 'top',
	whiteSpace: 'pre-wrap',
	[theme.breakpoints.down('sm')]: {
		fontSize: '.75rem',
	},
}));

const Image = styled('img')(({ theme }) => ({
	borderRadius: '.25rem',
	marginTop: '.4rem',
	[theme.breakpoints.down('sm')]: {
		marginTop: '.2rem',
	},
}));

const Thumbnail = styled('img')({
	gridColumn: '2',
	gridRow: '1 / span 3',
	borderRadius: '.25rem',
});

const Footer = styled('div')(({ theme }) => ({
	color: '#dcddde',
	fontSize: '.7rem',
	[theme.breakpoints.down('sm')]: {
		fontSize: '.65rem',
	},
}));

const FooterIcon = styled('img')(({ theme }) => ({
	borderRadius: '50%',
	width: '1.3rem',
	height: '1.3rem',
	verticalAlign: 'middle',
	marginRight: '.5rem',
	[theme.breakpoints.down('sm')]: {
		width: '1.2rem',
		height: '1.2rem',
		marginRight: '.3rem',
	},
}));

const FooterChild = styled('span')({
	':nth-of-type(2)::before': {
		content: '"•"',
		marginLeft: '.2rem',
		marginRight: '.2rem',
	},
});

const fieldColumns = [['1 / 13'], ['1 / 7', '7 / 13'], ['1 / 5', '5 / 9', '9 / 13']];

interface IProps {
	control: Control<EmbedMessage>;
}

export default function EmbedPreview({ control }: IProps) {
	const { locale } = useRouter();
	const { messageContent, embed } = useWatch<EmbedMessage>({
		control,
	});

	return (
		<Container>
			<AvatarContainer>
				<Avatar src={logo} alt='logo' layout='fill' objectFit='contain' />
			</AvatarContainer>
			<ContentWrapper>
				<UsernameWrapper>
					<Username>Lunaris</Username>
					<Badge>bot</Badge>
					<Timestamp>
						<time>{formatRelative(new Date(), new Date(), { locale: locale === 'pl' ? pl : undefined })}</time>
					</Timestamp>
				</UsernameWrapper>
				<MessageContentWrapper value={messageContent} />
				<EmbedWrapper>
					<EmbedColorPill sx={{ background: embed?.hexColor }} />
					<Embed>
						<AuthorWrapper author={embed?.author} />
						<TitleWrapper title={embed?.title} url={embed?.url} />
						<DescriptionWrapper description={embed?.description} />
						<ThumbnailWrapper url={embed?.thumbnail?.url} />
						<FieldsWrapper fields={embed?.fields as EmbedMessage['embed']['fields']} />
						<ImageWrapper url={embed?.image?.url} />
						<FooterWrapper footer={embed?.footer} timestamp={embed?.timestamp} />
					</Embed>
				</EmbedWrapper>
			</ContentWrapper>
		</Container>
	);
}

function MessageContentWrapper({ value }: { value?: string }) {
	return value ? <MessageContent>{value}</MessageContent> : <></>;
}

function AuthorWrapper({ author }: { author?: EmbedMessage['embed']['author'] }) {
	const theme = useTheme();
	const breakpoint = useMediaQuery(theme.breakpoints.up('md'));

	const authorName = author?.name;
	const authorURL = author?.url;
	const authorIconURL = author?.iconURL;

	return authorName || authorURL || authorIconURL ? (
		<Author>
			{authorIconURL && (authorIconURL.startsWith('http://') || authorIconURL.startsWith('https://')) ? (
				<AuthorAvatar
					src={authorIconURL}
					alt='avatar'
					width={breakpoint ? '1.5rem' : '1.4rem'}
					height={breakpoint ? '1.5rem' : '1.4rem'}
				/>
			) : undefined}
			{authorName ? (
				<AuthorName>{authorURL ? <Link href={authorURL}>{authorName}</Link> : authorName}</AuthorName>
			) : undefined}
		</Author>
	) : (
		<></>
	);
}

function TitleWrapper({ title, url }: { title?: string; url?: string }) {
	return title ? (
		<Title>
			{url ? (
				<Link sx={{ color: '#00AFF4' }} href={url}>
					{title}
				</Link>
			) : (
				title
			)}
		</Title>
	) : (
		<></>
	);
}

function DescriptionWrapper({ description }: { description?: string }) {
	return description ? <Description>{description}</Description> : <></>;
}

function ThumbnailWrapper({ url }: { url?: string }) {
	const theme = useTheme();
	const breakpoint = useMediaQuery(theme.breakpoints.up('md'));
	const thumbnailSize = breakpoint ? '70px' : '80px';

	return url ? <Thumbnail src={url} width={thumbnailSize} height={thumbnailSize} alt='thumbnail' /> : <></>;
}

function ImageWrapper({ url, thumbnailURL }: { url?: string; thumbnailURL?: string }) {
	const theme = useTheme();
	const breakpoint = useMediaQuery(theme.breakpoints.up('md'));
	const imageSize = breakpoint ? '100px' : '128px';

	return url ? (
		<Image
			style={{ gridColumn: thumbnailURL ? '1 / 3' : '1' }}
			src={url}
			width={imageSize}
			height={imageSize}
			alt='image'
		/>
	) : (
		<></>
	);
}

function FooterWrapper({
	footer,
	timestamp,
	thumbnailURL,
}: {
	footer?: EmbedMessage['embed']['footer'];
	timestamp?: EmbedMessage['embed']['timestamp'];
	thumbnailURL?: string;
}) {
	const { locale } = useRouter();
	return footer?.text || timestamp ? (
		<Footer style={{ gridColumn: thumbnailURL ? '1 / 3' : '1' }}>
			{footer?.iconURL ? <FooterIcon src={footer.iconURL} alt='icon' /> : undefined}
			{footer?.text ? <FooterChild>{footer?.text}</FooterChild> : undefined}
			{timestamp ? (
				<FooterChild>
					<time>{formatRelative(timestamp, new Date(), { locale: locale === 'pl' ? pl : undefined })}</time>
				</FooterChild>
			) : undefined}
		</Footer>
	) : (
		<></>
	);
}

function FieldsWrapper({ fields = [] }: { fields?: EmbedMessage['embed']['fields'] }) {
	const fieldTemp: { count: number; order: number }[] = [];
	if (fields) {
		fields.forEach(() => {
			fieldTemp.push({ count: 1, order: 1 });
		});

		fields.forEach((field, index, array) => {
			if (field?.inline) {
				if (array[index - 1]?.inline && fieldTemp[index - 1]?.order < 3) {
					fieldTemp[index].count = 2;
					fieldTemp[index - 1].count = 2;

					fieldTemp[index - 1].order = 1;
					fieldTemp[index].order = 2;

					if (array[index - 2]?.inline && fieldTemp[index - 2]?.order < 3) {
						fieldTemp[index].count = 3;
						fieldTemp[index - 1].count = 3;
						fieldTemp[index - 2].count = 3;

						fieldTemp[index - 2].order = 1;
						fieldTemp[index - 1].order = 2;
						fieldTemp[index].order = 3;
					}
				}
			}
		});
	}

	const fieldElements = fields.map((field, index) => {
		const gridColumn = fieldColumns[fieldTemp[index].count - 1][fieldTemp[index].order - 1];

		return (
			<Field style={{ gridColumn }} key={index}>
				<FieldName>{field?.name || ''}</FieldName>
				<FieldValue>{field?.value || ''}</FieldValue>
			</Field>
		);
	});

	return fields.length ? <Fields>{fieldElements}</Fields> : <></>;
}
