import styled from 'styled-components';
import { GREY } from 'constants/colors';
import { RED_COLOR } from 'constants/colors';
import { SMALL_FONT_SIZE } from 'constants/fonts';

export const Div = styled.div`
	margin: auto;
	width: 50%;
	@media screen and (max-width: 600px) {
		width: 90%;
	}
`;

export const ErrorP = styled.p`
	color: ${RED_COLOR};
	font-size: ${SMALL_FONT_SIZE};
`;

export const P = styled.p`
	color: ${GREY};
	font-size: ${SMALL_FONT_SIZE};
	text-align: center;
	margin-top: 5px;
	margin-bottom: 3px;
`;
