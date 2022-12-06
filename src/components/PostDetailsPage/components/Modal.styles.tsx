import { RED_COLOR, WHITE_COLOR } from 'constants/colors';
import { MEDIUM_FONT_SIZE } from 'constants/fonts';
import styled from 'styled-components';

export const Wrapper = styled.div`
	display: block;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 700;
	width: inherit;
	outline: 0;
	max-width: 40%;
	&.hidden {
		display: none;
	}
	@media screen and (min-width: 1600px) {
		max-width: 30%;
	}
	@media screen and (max-width: 800px) {
		max-width: 50%;
	}
`;

export const Backdrop = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.3);
	z-index: 100;
`;

export const StyledModal = styled.div`
	z-index: 100;
	background: ${WHITE_COLOR};
	position: relative;
	margin: auto;
	border-radius: 8px;
`;

export const CloseButton = styled.button`
	position: absolute;
	top: 2%;
	right: 2%;
	font-size: 1rem;
	border: none;
	border-radius: 3px;
	margin-right: 0.5rem;
	background: none;
	&:hover {
		cursor: pointer;
	}
	&:hover,
	&:active,
	&:focus {
		outline: none;
	}
`;

export const Content = styled.div`
	padding: 10px;
	max-height: 30rem;
	overflow-x: hidden;
	overflow-y: hidden;
`;

export const Form = styled.form`
	width: auto;
	margin: 5px;
`;

export const Label = styled.label`
	text-align: center;
	font-size: ${MEDIUM_FONT_SIZE};
`;

export const P = styled.p`
	color: ${RED_COLOR};
`;
