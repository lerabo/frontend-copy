import { BLACK_COLOR, GREY, LIGHT_VIOLET, VIOLET } from 'constants/colors';
import { MEDIUM_FONT_SIZE } from 'constants/fonts';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MainBlockWrapper = styled.div`
	display: flex;
`;

export const Wrapper = styled.div`
	width: 70%;

	@media (max-width: 1000px) {
		margin: 15px 10px 0 10px;
		width: 100%;
	}
`;
export const SkillsBlock = styled.div`
	margin-top: 10px;
	z-index: 0;
`;

export const Card = styled.div`
	background-color: ${LIGHT_VIOLET};
	box-shadow: 5px 5px 5px gray;
	border-radius: 10px;
	padding: 10px;
`;

export const StyledLink = styled(Link)`
	text-decoration: none;
	text-align: center;
	&:hover {
		text-decoration: none;
		color: ${VIOLET};
	}
	&:active,
	&:focus {
		text-decoration: none;
	}
`;

export const WrapperSidePanel = styled.div`
	margin: 10px auto;
	margin: 30px 15px 0 15px;
	width: 30%;
	justify-content: flex-start;
	display: flex;
	flex-direction: column;
	@media (max-width: 920px) {
		width: unset;
	}
`;

export const Title = styled.div`
	display: flex;
	justify-content: center;
	margin: 20px;
	font-weight: bold;
	font-size: ${MEDIUM_FONT_SIZE};
	align-items: center;
	&.filterTitle {
		margin: 20px;
	}
	.arrowRight {
		display: none;
		padding: 0 10px 0 10px;
		@media (max-width: 1020px) {
			display: inline;
			width: 50px;
			height: 30px;
			color: black;
		}
	}
`;

export const SkillsButtonsBlock = styled.div`
	max-width: 100%;
`;
export const Label = styled.label`
	width: 170px;
	margin: 5px;
	height: 40px;
`;

export const Button = styled.div`
	margin-bottom: 10px;
	cursor: pointer;
	&.defaultActive > span {
		border-bottom: 1px solid ${BLACK_COLOR};
	}
`;
export const ButtonBlock = styled.div`
	display: block;
	justify-content: flex-start;
	margin: 0 auto;
`;
export const InputContainer = styled.div`
	display: flex;
	justify-content: center;
`;
export const IconSearch = styled.div`
	height: 1.5rem;
	width: 1.5rem;
	padding: 5px;
	margin-left: 5px;
	cursor: pointer;
	position: absolute;
	box-sizing: border-box;
	top: 34%;
	left: 2px;
`;
export const ProfileBlock = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 40px;
	padding-bottom: 20px;

	&.notFound {
		display: flex;
		justify-content: center;
	}
`;
export const PaginationBlock = styled.div`
	width: 90%;
	margin: 30px auto;
	@media (max-width: 800px) {
		width: 95%;
	}
`;

export const ProfileData = styled.div`
	padding: 5px;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: ${MEDIUM_FONT_SIZE};
`;

export const ProfileImage = styled.img`
	width: 100px;
	height: 100px;
	border-radius: 50%;
	@media (max-width: 800px) {
		width: 40px;
		height: 10px;
	}
`;

export const ProfilePhoto = styled.div`
	width: 150px;
	height: 143px;
`;

export const ImageWrapperBlock = styled.div`
	display: flex;
	justify-content: center;
`;

export const ImageWrapper = styled.i`
	background: ${GREY};
	border-radius: 20px;
	font-size: ${MEDIUM_FONT_SIZE};
	text-align: center;
	margin-right: 10px;
	border-radius: 50%;
	display: inline-block;
	padding: 25px;
`;

export const PhotoWrapper = styled.i`
	border-radius: 20px;
	font-size: 25px;
	text-align: center;
	border-radius: 50%;
	display: inline-block;
	margin-bottom: 10px;
`;
