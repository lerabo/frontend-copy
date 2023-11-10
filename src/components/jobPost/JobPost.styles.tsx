import { BLACK_COLOR, DEFAULT_COLOR, RED_COLOR, VIOLET, WHITE_COLOR } from 'constants/colors';
import { LARGE_FONT_SIZE, MEDIUM_FONT_SIZE } from 'constants/fonts';
import styled from 'styled-components';

export const Container = styled.div`
	padding: 1% 8% 1% 8%;
	font-size: ${MEDIUM_FONT_SIZE};
`;

export const Title = styled.div`
	font-size: ${LARGE_FONT_SIZE};
	margin-top: 15px;
	font-weight: 500;
`;

export const SkillsButtonsBlock = styled.div`
	max-width: 100%;
`;

export const SkillButton = styled.button<{ selected: boolean }>`
	width: 170px;
	border-radius: 10px;
	margin: 5px;
	height: 40px;
	background-color: ${(props) => (props.selected ? VIOLET : DEFAULT_COLOR)};
	color: ${(props) => (props.selected ? WHITE_COLOR : DEFAULT_COLOR)};
`;

export const Li = styled.li`
	list-style-type: none;
	padding: 0;
	margin: 0;
`;

export const Column = styled.div`
	float: left;
	width: 50%;
	padding: 10px;
	@media screen and (max-width: 600px) {
		width: 100%;
	}
`;

export const CurrencyColumn = styled.div`
	float: left;
	width: 50%;
	@media screen and (max-width: 1500px) {
		width: 100%;
	}
`;

export const Label = styled.label`
	width: 170px;
	margin: 5px;
	height: 40px;
`;

export const Span = styled.span<{ value: boolean }>`
	color: ${(props) => (props.value ? RED_COLOR : BLACK_COLOR)};
`;

export const P = styled.p`
	color: ${RED_COLOR};
`;

export const BtnDiv = styled.div`
	display: flex;
	justify-content: center;
`;
