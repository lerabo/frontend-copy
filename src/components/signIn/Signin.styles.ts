import styled from 'styled-components';
import { PURPLE, VIOLET, WHITE_COLOR } from 'constants/colors';
import { RED_COLOR } from 'constants/colors';
import { LARGE_FONT_SIZE, SMALL_FONT_SIZE } from 'constants/fonts';

export const Div = styled.div`
	margin: auto;
	margin-top: 25px;
	width: 50%;
	@media screen and (max-width: 600px) {
		width: 90%;
	}
`;

export const Div2 = styled.div`
	display: flex;
	text-align: center;
	justify-content: space-around;
	margin: auto;
`;

export const H1 = styled.h2`
	text-align: center;
`;

export const H2 = styled.h3`
	text-align: center;
`;

export const P = styled.p`
	font-size: ${SMALL_FONT_SIZE};
	font-weight: bold;
	margin-top: 2px;
	margin-left: 70px;
`;

export const ErrorP = styled.p`
	color: ${RED_COLOR};
	font-size: ${SMALL_FONT_SIZE};
`;

export const LinkStyle = styled.div`
	margin-top: 10px;
	margin-left: 55%;
`;

export const Button = styled.button`
	background: ${VIOLET};
	border: none;
	border-radius: 6px;
	color: ${WHITE_COLOR};
	font-size: ${LARGE_FONT_SIZE};
	margin: auto;
	margin-top: 2%;
	margin-bottom: 2%;
	height: 50px;
	width: 50%;
	&:hover {
		background-color: ${PURPLE};
		color: ${VIOLET};
	}
`;
