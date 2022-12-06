import styled from 'styled-components';
import { LIGHTGREY_COLOR } from 'constants/colors';

export const DivForm = styled.div`
	margin: 2%;
	width: 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const H1 = styled.h2`
	text-align: center;
	margin: 2%;
`;

export const Form = styled.form`
	align-content: center;
	border: solid 1px ${LIGHTGREY_COLOR};
	border-radius: 10px;
	display: flex;
	flex-flow: column wrap;
	margin: auto;
`;
