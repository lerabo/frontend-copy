import {
	ACE_BLUE,
	BLUE_PURPLE,
	GREEN,
	LIGHT_GREEN,
	LIGHTGREY_COLOR,
	LIGHT_RED,
	LIGHT_YELLOW,
	RED,
	YELLOW,
} from 'constants/colors';
import { LARGE_FONT_SIZE, MEDIUM_FONT_SIZE } from 'constants/fonts';
import styled from 'styled-components';

export const SelectBlock = styled.div`
	display: flex;
	justify-content: flex-start;
`;
export const Title = styled.div`
	display: block;
	font-weight: bold;
	padding: 20px 0 0 20px;
	font-size: ${MEDIUM_FONT_SIZE};
`;
export const MainWrapper = styled.div`
	margin: 20px auto;
	width: 60%;

	@media screen and (max-width: 1000px) {
		width: 100%;
	}
`;
export const Wrapper = styled.div`
	&.block {
		display: block;
	}

	&.hide {
		display: none;
	}
`;

export const Div = styled.div`
	margin: 20px;
	width: 200px;
`;
export const ContractContainer = styled.div`
	border: 2px solid ${BLUE_PURPLE};
	border-radius: 20px;
	margin-bottom: 40px;
	&:hover {
		background-color: ${ACE_BLUE};
	}
`;
export const ContractItem = styled.div`
	display: flex;
	align-items: center;
	padding: 20px;
	& > .link {
		width: 147px;
	}
`;

export const P = styled.p`
	font-size: ${MEDIUM_FONT_SIZE};
	padding: 20px;
	align-items: center;

	&.Accepted {
		border-radius: 40px;
		background-color: ${LIGHT_GREEN};
		color: ${GREEN};
		margin-bottom: -8px;
		padding: 10px;
	}
	&.Rejected {
		border-radius: 40px;
		background-color: ${LIGHT_RED};
		color: ${RED};
		margin-bottom: -8px;
		padding: 10px;
	}
	&.Pending {
		border-radius: 40px;
		background-color: ${LIGHT_YELLOW};
		color: ${YELLOW};
		margin-bottom: -8px;
		padding: 10px;
	}
`;

export const NotFoundContract = styled.div`
	display: flex;
	margin: 50px;
	font-size: ${LARGE_FONT_SIZE};
`;

export const ContractP = styled.p`
	font-size: ${MEDIUM_FONT_SIZE};
	margin: 2%;
`;
export const ContractDiv = styled.div`
	& > p {
		font-size: ${MEDIUM_FONT_SIZE};
		margin-top: 2%;
		display: inline-block;
	}
	& > img {
		grid-row: span 2;
		height: 50px;
		width: 50px;
		border-radius: 100%;
		margin: 2%;
		display: inline-block;
	}
`;
export const ContractTitle = styled.p`
	margin: 3%;
	border-radius: 5px;
	padding: 8px 40px;
	border: 2px solid ${LIGHTGREY_COLOR};
	font-size: ${LARGE_FONT_SIZE};
`;
