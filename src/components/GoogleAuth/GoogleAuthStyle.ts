import { PURPLE, VIOLET, WHITE_COLOR } from 'constants/colors';
import { MEDIUM_FONT_SIZE } from 'constants/fonts';
import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	margin: auto;
	width: 40%;
	height: 50px;
	background: ${VIOLET};
	padding: 2px;
	border-radius: 6px;
	&:hover {
		background: ${PURPLE};
		& > div {
			color: ${VIOLET};
		}
	}
`;
export const Image = styled.img`
	width: 45px;
	height: 45px;
	border-radius: 6px;
`;
export const Typography = styled.div`
	color: ${WHITE_COLOR};
	width: 70%;
	font-family: Roboto, sans-serif;
	margin: auto;
	font-size: ${MEDIUM_FONT_SIZE};
`;
