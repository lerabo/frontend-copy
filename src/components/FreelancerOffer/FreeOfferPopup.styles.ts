import styled from 'styled-components';
import { BLACK_COLOR, BLUE_PURPLE } from 'constants/colors';
import { FONT_MEDIUM, MEDIUM_FONT_SIZE } from 'constants/fonts';

export const P2 = styled.h4`
	align-self: flex-start;
	font-size: ${FONT_MEDIUM};
	font-weight: bold;
	margin: 5px;
	margin-top: -20px;
	margin-left: 180px;
`;

export const P = styled.p`
	font-size: ${FONT_MEDIUM};
	margin: 5px;
	margin-right: 250px;
`;

export const Modal = styled.div`
	background-color: ${BLUE_PURPLE};
	align-content: center;
	display: block;
	position: relative;
	border: 1px solid ${BLACK_COLOR};
	border-radius: 10px;
	margin-top: 20px;
	height: 250px;
	width: 400px;
`;

export const Header = styled.header`
	font-size: ${MEDIUM_FONT_SIZE};
	text-align: center;
	margin-top: 10px;
	width: 100%;
`;

export const Content = styled.div`
	display: flex;
	flex-flow: column wrap;
	width: 100%;
	align-content: center;
`;

export const Actions = styled.div`
	justify-content: center;
	display: flex;
	margin: 5% auto;
	width: 100%;
`;

export const Span = styled.span`
	font-size: ${MEDIUM_FONT_SIZE};
	margin-left: 50px;
`;
