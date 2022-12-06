import { BLACK_COLOR, BLUE_PURPLE, ORANGE, WHITE_COLOR } from 'constants/colors';
import { FONT_H1, MEDIUM_FONT_SIZE } from 'constants/fonts';
import styled from 'styled-components';

export const Wrapper = styled.div`
	border: 1px solid ${BLACK_COLOR};
	border-radius: 20px;
	margin: 20px;
	padding: 20px;
	font-size: ${MEDIUM_FONT_SIZE};
`;

export const TitleStyled = styled.p`
	font-weight: bold;
	font-size: ${MEDIUM_FONT_SIZE};
`;

export const MainTitle = styled.p`
	font-weight: bold;
	font-size: ${FONT_H1};
	color: ${ORANGE};
`;

export const DescriptionDataStyled = styled.p`
	height: 30px;
	overflow: hidden;
	font-size: ${MEDIUM_FONT_SIZE};
`;

export const DateStyled = styled.div`
	width: 220px;
	height: 30px;
	display: flex;
	align-items: center;
	background-color: ${BLUE_PURPLE};
	border-radius: 5px;
	padding-left: 10px;
	margin-left: auto;
	font-size: ${MEDIUM_FONT_SIZE};
`;
export const NonPostWrapper = styled.div`
	text-align: center;
`;

export const DescriptionStyled = styled.p`
	font-weight: bols;
	margin-top: 35px;
`;

export const ImageStyled = styled.img`
	margin: 0 auto;
`;

export const ButtonStyled = styled.button`
	margin-top: 60px;
	min-width: 150px;
	border-radius: 25px;
	height: 40px;
	background-color: ${BLACK_COLOR};
	color: ${WHITE_COLOR};
`;
