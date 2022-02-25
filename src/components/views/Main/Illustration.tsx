// const Svg = styled.svg`
// 	${tw`max-w-xs w-10/12 mt-5 md:mt-28 md:max-w-md`}
// `;

import { styled } from '@mui/material';

const Svg = styled('svg')(({ theme }) => ({
	width: '10/12',
	maxWidth: '20rem',
	marginTop: '1.25rem',

	[theme.breakpoints.up('md')]: {
		maxWidth: '28rem',
		marginTop: '7rem',
	},
}));

export default function Illustration(): JSX.Element {
	return (
		<Svg viewBox='0 0 295 259' fill='none' xmlns='http://www.w3.org/2000/svg' role='img'>
			<path
				d='M197.685 64.4124C218.21 75.5401 242.371 91.8037 251.351 117.269C260.331 142.52 253.916 176.973 233.605 205.862C213.293 234.752 178.869 258.077 144.019 258.933C108.954 259.575 73.2476 237.534 50.5839 208.644C27.9201 179.755 18.5125 144.018 13.381 103.145C8.46343 62.4865 7.822 16.6918 30.4858 5.56408C53.1496 -5.5636 98.9048 18.1897 129.907 32.7413C161.123 47.5069 177.373 53.2847 197.685 64.4124Z'
				fill='#1956BD'
				fillOpacity='0.2'
			/>
			<path
				opacity='0.3'
				d='M7.04061 160.757L139.282 54.6545L3.5379 156.243C3.08516 156.401 2.6763 156.664 2.3452 157.012C2.0141 157.36 1.7703 157.782 1.63405 158.243C1.49781 158.704 1.47303 159.191 1.56176 159.664C1.65049 160.136 1.85019 160.58 2.14428 160.959C2.43837 161.338 2.81837 161.641 3.25278 161.843C3.6872 162.045 4.16351 162.14 4.6422 162.121C5.12089 162.101 5.58819 161.967 6.0053 161.73C6.42241 161.493 6.77731 161.159 7.04061 160.757V160.757Z'
				fill='#F0F0F0'
			/>
			<path
				d='M160.272 217.574C160.091 218.458 160.661 219.322 161.545 219.503C162.43 219.684 163.293 219.114 163.474 218.23C163.655 217.345 163.085 216.482 162.201 216.301C161.317 216.12 160.453 216.69 160.272 217.574Z'
				fill='#B2842B'
			/>
			<path
				d='M202.248 210.778C202.143 211.295 202.476 211.799 202.992 211.905C203.509 212.011 204.013 211.678 204.119 211.161C204.225 210.644 203.892 210.14 203.375 210.034C202.859 209.928 202.354 210.261 202.248 210.778Z'
				fill='#F0F0F0'
			/>
			<path
				d='M49.6065 23.1816C49.5007 23.6982 49.8338 24.2028 50.3504 24.3085C50.8671 24.4143 51.3716 24.0812 51.4773 23.5646C51.5831 23.048 51.25 22.5434 50.7334 22.4377C50.2168 22.3319 49.7122 22.665 49.6065 23.1816Z'
				fill='#F0F0F0'
			/>
			<path
				d='M109.635 197.352C109.529 197.869 109.862 198.373 110.378 198.479C110.895 198.585 111.4 198.252 111.505 197.735C111.611 197.218 111.278 196.714 110.761 196.608C110.245 196.502 109.74 196.835 109.635 197.352Z'
				fill='#F0F0F0'
			/>
			<path
				d='M125.51 74.8351C125.329 75.7194 125.899 76.5829 126.783 76.764C127.668 76.945 128.531 76.3749 128.712 75.4906C128.893 74.6064 128.323 73.7428 127.439 73.5618C126.554 73.3808 125.691 73.9509 125.51 74.8351Z'
				fill='#B2842B'
			/>
			<path
				d='M92.5934 50.9055C92.4876 51.4221 92.8207 51.9266 93.3373 52.0324C93.8539 52.1381 94.3585 51.8051 94.4642 51.2884C94.57 50.7718 94.2369 50.2673 93.7203 50.1615C93.2036 50.0558 92.6991 50.3889 92.5934 50.9055Z'
				fill='#F0F0F0'
			/>
			<path
				d='M219.287 175.967C219.181 176.483 219.514 176.988 220.031 177.094C220.548 177.199 221.052 176.866 221.158 176.35C221.264 175.833 220.931 175.329 220.414 175.223C219.897 175.117 219.393 175.45 219.287 175.967Z'
				fill='#F0F0F0'
			/>
			<path
				d='M31.3458 79.37C31.24 79.8866 31.5731 80.3911 32.0897 80.4969C32.6063 80.6026 33.1108 80.2695 33.2166 79.7529C33.3224 79.2363 32.9893 78.7318 32.4727 78.626C31.9561 78.5203 31.4515 78.8533 31.3458 79.37Z'
				fill='#F0F0F0'
			/>
			<path
				d='M224.891 104.571C224.785 105.088 225.118 105.593 225.635 105.698C226.151 105.804 226.656 105.471 226.761 104.954C226.867 104.438 226.534 103.933 226.018 103.827C225.501 103.722 224.996 104.055 224.891 104.571Z'
				fill='#F0F0F0'
			/>
			<path
				d='M174.526 119.493C174.42 120.01 174.753 120.515 175.269 120.62C175.786 120.726 176.291 120.393 176.396 119.876C176.502 119.36 176.169 118.855 175.652 118.75C175.136 118.644 174.631 118.977 174.526 119.493Z'
				fill='#F0F0F0'
			/>
			<path
				d='M70.6943 59.615C70.5886 60.1316 70.9216 60.6361 71.4382 60.7419C71.9549 60.8476 72.4594 60.5146 72.5652 59.9979C72.6709 59.4813 72.3378 58.9768 71.8212 58.871C71.3046 58.7653 70.8001 59.0983 70.6943 59.615Z'
				fill='#F0F0F0'
			/>
			<path
				d='M42.2429 167.786C42.1371 168.303 42.4702 168.807 42.9868 168.913C43.5035 169.019 44.008 168.686 44.1138 168.169C44.2195 167.653 43.8864 167.148 43.3698 167.042C42.8532 166.937 42.3487 167.27 42.2429 167.786Z'
				fill='#F0F0F0'
			/>
			<path
				d='M106.647 130.506C106.541 131.022 106.874 131.527 107.391 131.633C107.908 131.738 108.412 131.405 108.518 130.889C108.624 130.372 108.291 129.868 107.774 129.762C107.257 129.656 106.753 129.989 106.647 130.506Z'
				fill='#F0F0F0'
			/>
			<path
				d='M164.739 168.08C164.634 168.597 164.967 169.102 165.483 169.207C166 169.313 166.504 168.98 166.61 168.463C166.716 167.947 166.383 167.442 165.866 167.336C165.35 167.231 164.845 167.564 164.739 168.08Z'
				fill='#F0F0F0'
			/>
			<path
				d='M124.348 206.506C124.138 207.53 124.799 208.53 125.823 208.74C126.847 208.95 127.848 208.289 128.058 207.265C128.267 206.241 127.607 205.24 126.582 205.03C125.558 204.821 124.558 205.481 124.348 206.506Z'
				fill='#B3842B'
			/>
			<path
				d='M201.16 143.829C200.95 144.854 201.611 145.854 202.635 146.064C203.659 146.273 204.66 145.613 204.869 144.589C205.079 143.564 204.419 142.564 203.394 142.354C202.37 142.145 201.37 142.805 201.16 143.829Z'
				fill='#B3842B'
			/>
			<path
				d='M73.5861 117.714C73.3764 118.739 74.0368 119.739 75.0611 119.949C76.0855 120.158 77.0859 119.498 77.2956 118.474C77.5052 117.449 76.8448 116.449 75.8205 116.239C74.7961 116.029 73.7958 116.69 73.5861 117.714Z'
				fill='#B3842B'
			/>
			<path
				d='M234.757 121.039C267.992 121.039 294.935 94.096 294.935 60.8605C294.935 27.6251 267.992 0.682495 234.757 0.682495C201.521 0.682495 174.579 27.6251 174.579 60.8605C174.579 94.096 201.521 121.039 234.757 121.039Z'
				fill='#E6E6E6'
			/>
			<path
				d='M228.838 26.3321C232.651 26.3321 235.743 23.2403 235.743 19.4264C235.743 15.6125 232.651 12.5208 228.838 12.5208C225.024 12.5208 221.932 15.6125 221.932 19.4264C221.932 23.2403 225.024 26.3321 228.838 26.3321Z'
				fill='#CBCBCB'
			/>
			<path
				d='M240.676 95.389C244.49 95.389 247.581 92.2972 247.581 88.4833C247.581 84.6694 244.49 81.5776 240.676 81.5776C236.862 81.5776 233.77 84.6694 233.77 88.4833C233.77 92.2972 236.862 95.389 240.676 95.389Z'
				fill='#CBCBCB'
			/>
			<path
				d='M267.312 54.9414C270.036 54.9414 272.245 52.733 272.245 50.0088C272.245 47.2846 270.036 45.0762 267.312 45.0762C264.588 45.0762 262.379 47.2846 262.379 50.0088C262.379 52.733 264.588 54.9414 267.312 54.9414Z'
				fill='#CBCBCB'
			/>
			<path
				d='M211.08 81.5776C219.798 81.5776 226.865 74.5107 226.865 65.7932C226.865 57.0757 219.798 50.0088 211.08 50.0088C202.363 50.0088 195.296 57.0757 195.296 65.7932C195.296 74.5107 202.363 81.5776 211.08 81.5776Z'
				fill='#CBCBCB'
			/>
		</Svg>
	);
}
