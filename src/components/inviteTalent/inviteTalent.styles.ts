import styled from 'styled-components';
import { BLACK_COLOR, BLUE_PURPLE, GREEN } from 'constants/colors';
import { FONT_H1, LARGE_FONT_SIZE, MEDIUM_FONT_SIZE } from 'constants/fonts';

export const Container = styled.div`
	border: 1px solid ${BLACK_COLOR};
	border-radius: 20px;
	margin: auto 2% auto 2%;
	padding: 2%;
	font-size: ${MEDIUM_FONT_SIZE};
`;

export const Div = styled.div`
	display: inline-block;
`;

export const DivCenter = styled.div`
	display: flex;
	justify-content: center;
	margin: auto;
	width: 100%;
`;

export const P = styled.p`
	font-size: ${LARGE_FONT_SIZE};
	font-weight: 500;
	display: inline-block;
`;

export const Price = styled.p`
	font-size: ${FONT_H1};
	color: ${GREEN};
	font-weight: bold;
	display: inline-block;
	margin: auto 5% auto 5%;
`;

export const Image = styled.img`
	height: 150px;
	width: 150px;
	margin: 30px;
`;

export const Save = styled.div`
	&:focus {
		box-shadow: 0000;
		outline: 0;
	}
	border: none;
	cursor: pointer;
	order: 1;
	margin-top: 50px;
	margin-left: 100px;
	height: 40px;
	width: 40px;
	display: inline-block;
`;

export const Img = styled.img`
	align-content: center;
	height: 30px;
	width: 30px;
`;

export const Modal = styled.div`
	background: ${BLUE_PURPLE};
	align-content: center;
	display: flex;
	flex-direction: column;
	border: 1px solid ${BLACK_COLOR};
	border-radius: 10px;
	height: 430px;
	width: 550px;
	div:last-child {
		align-items: flex-end;
	}
`;

export const Header = styled.header`
	border-bottom: 1px solid ${BLACK_COLOR};
	font-size: ${LARGE_FONT_SIZE};
	font-style: italic;
	text-align: center;
	width: 100%;
`;

export const Content = styled.div`
	display: flex;
	flex-flow: column wrap;
	margin: auto;
	width: 100%;
`;

export const CenterDiv = styled.div`
	display: flex;
`;

export const Select = styled.select`
	&:focus {
		box-shadow: 0000;
		outline: 0;
	}
	align-self: center;
	height: 30px;
	width: 80%;
`;

export const JobPopup = styled.div`
	background: ${BLUE_PURPLE};
	align-content: center;
	display: block;
	position: fixed;
	border: 1px solid ${BLACK_COLOR};
	border-radius: 10px;
	transform: translate(-50%, -50%);
	height: 25%;
	width: 50%;
`;

export const Span = styled.span`
	font-size: ${LARGE_FONT_SIZE};
	display: flex;
	justify-content: center;
	margin-top: 20px;
	width: 100%;
`;
