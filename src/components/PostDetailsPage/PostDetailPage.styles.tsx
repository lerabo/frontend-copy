import { BLACK_COLOR, GREEN, GREY, LIGHT_GREEN } from 'constants/colors';
import { FONT_LARGE, LARGE_FONT_SIZE, MEDIUM_FONT_SIZE } from 'constants/fonts';
import styled from 'styled-components';

export const TitleStyled = styled.p`
	font-weight: bold;
	font-size: ${LARGE_FONT_SIZE};
	color: ${BLACK_COLOR};
	display: flex;
	justify-content: center;
`;

export const Wrapper = styled.div`
	margin: 20px;
	padding: 20px;
	border-radius: 20px;
`;

export const WrapperWithBorder = styled.div`
	border: 2px solid ${GREY};
	border-radius: 10px;
	width: 90%;
	text-align: center;
`;

export const CategoryStyled = styled.div`
	border: 2px solid ${GREY};
	border-radius: 10px;
	padding: 10px;
	width: 300px;
	height: 55px;
	margin-left: 2%;
	font-style: italic;
	font-size: ${FONT_LARGE};
	@media (max-width: 800px) {
		width: unset;
	}
`;

export const DescriptionStyled = styled.div`
	font-size: ${MEDIUM_FONT_SIZE};
	padding-top: 80px;
	margin: 2%;
	line-height: 35px;
`;

export const Description = styled.div`
	font-size: ${MEDIUM_FONT_SIZE};
	margin: 2%;
	line-height: 35px;
`;

export const BorderStyled = styled.div`
	border: 1px solid ${GREY};
	color: ${GREY};
`;

export const WrapperSkillsStyled = styled.div`
	display: flex;
	padding-top: 20px;
	align-items: flex-start;
	flex-wrap: wrap;

	@media (max-width: 800px) {
		flex-direction: column;
	}
`;

export const CategorySkillsBlock = styled.div`
	margin: 1% 2.5% 1% 2.5%;
	font-style: italic;
	font-size: ${MEDIUM_FONT_SIZE};

	& > label {
		margin: 35px;
		font-size: ${MEDIUM_FONT_SIZE};
	}
	& > p {
		margin: 15px;
	}
	@media (max-width: 800px) {
		width: 100%;
		margin-left: 0;
	}
`;

export const SkillsItem = styled.div`
	color: ${GREEN};
	padding: 5px;
	background-color: ${LIGHT_GREEN};
	border-radius: 20px;
	margin: 10px;
	text-transform: capitalize;
	font-size: ${MEDIUM_FONT_SIZE};
	text-align: center;
	width: 70%;
	margin: 3% auto;
`;

export const WorkDurationStyled = styled.div`
	padding-left: 10px;
`;

export const HourRateStyled = styled.div`
	text-align: center;
	padding: 10px;
	margin: 8%;
`;

export const Column = styled.div`
	display: flex;
	float: left;
	width: 50%;
	@media (max-width: 800px) {
		width: 100%;
	}
`;
export const MinColumn = styled.div`
	float: left;
	width: 20%;
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media screen and (max-width: 600px) {
		width: 100%;
	}
	& > div {
		font-style: italic;
		font-size: ${MEDIUM_FONT_SIZE};
	}
`;
export const MaxColumn = styled.div`
	float: left;
	width: 80%;
	padding: 10px;
	@media screen and (max-width: 600px) {
		width: 100%;
	}
`;
export const FullColumn = styled.div`
	float: left;
	width: 95%;
	padding: 10px;
	@media screen and (max-width: 600px) {
		width: 100%;
	}
`;

export const P = styled.p`
	font-size: ${MEDIUM_FONT_SIZE};
	margin-bottom: 2%;
	text-align: center;
`;

export const P1 = styled.p`
	font-size: ${FONT_LARGE};
	margin: auto;
	text-align: center;
`;

export const ClientInfoDescription = styled.p`
	margin: 4% auto;
	font-style: italic;
`;

export const Label = styled.label`
	margin-left: 100px;
`;
