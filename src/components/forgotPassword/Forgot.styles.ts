import styled from 'styled-components';
import { RED_COLOR } from 'constants/colors';
import { MEDIUM_FONT_SIZE } from 'constants/fonts';

export const Div = styled.div`
	margin: auto;
	width: 50%;
	@media screen and (max-width: 600px) {
		width: 90%;
	}
`;

export const ErrorP = styled.p`
	color: ${RED_COLOR};
	font-size: ${MEDIUM_FONT_SIZE};
`;

export const P = styled.p`
	font-size: ${MEDIUM_FONT_SIZE};
	text-align: center;
	margin: 3% auto;
`;
