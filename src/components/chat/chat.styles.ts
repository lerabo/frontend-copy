import {
	COLOR_GREY,
	DARK_SKY_BLUE,
	GREY,
	LIGHTGREY_COLOR,
	LIGHT_GREY,
	ORANGE,
	PURPLE,
	SKY_BLUE,
	WHITE_COLOR,
} from 'constants/colors';
import { FONT_MEDIUM, MEDIUM_FONT_SIZE, SMALL_FONT_SIZE } from 'constants/fonts';
import styled from 'styled-components';

export const UsersList = styled.ul`
	list-style-type: none;
	padding-left: 0;
	overflow-y: auto;
	width: 30%;
	background-color: ${WHITE_COLOR};
	height: calc(100% - 15.2px);
	border-right: 2px solid ${PURPLE};
	margin: 0;
`;

export const SingleUser = styled.li`
	border-bottom: 1px solid ${LIGHTGREY_COLOR};
	& > div {
		display: grid;
		grid-template-columns: 60px 1fr -webkit-max-content;
		grid-template-columns: 60px 1fr max-content;
		padding: 10px;
		position: relative;
	}
	& > div:hover {
		background: ${SKY_BLUE};
		cursor: pointer;
	}
	&.defaultActive {
		background-color: ${SKY_BLUE};
	}
`;

export const ChatImage = styled.img`
	grid-row: span 2;
	width: 60px;
	border-radius: 100%;
`;

export const Title = styled.div`
	font-weight: bold;
	font-size: ${SMALL_FONT_SIZE};
	padding-left: 15px;
	white-space: nowrap;
	overflow-x: hidden;
	text-overflow: ellipsis;
`;

export const LastMessage = styled.div`
	grid-column: span 2;
	font-size: ${SMALL_FONT_SIZE};
	color: gray;
	padding-left: 15px;
	white-space: nowrap;
	overflow-x: hidden;
	text-overflow: ellipsis;
`;

export const Wrapper = styled.form`
	width: 100%;
	height: 100vh;
	display: flex;
	margin: 0 auto;
`;

export const DateTime = styled.div`
	white-space: nowrap;
	margin-top: 6px;
`;

//chat style
export const ChatWrapper = styled.div`
	width: 70%;
	height: calc(100% - 15.2px);
	position: relative;
`;

export const Button = styled.button`
	border: 1px solid ${LIGHT_GREY};
	border-radius: 10px;
	padding: 10px 20px;
	width: 50%;
	margin-bottom: 5%;
	background-color: ${LIGHT_GREY};
	color: ${LIGHT_GREY};
	margin-right: 10%;
	text-align: center;
	font-size: ${MEDIUM_FONT_SIZE};
	box-shadow: 3px 2px 2px ${GREY};
	cursor: pointer;
	&.defaultActive {
		background-color: ${LIGHT_GREY};
		color: ${WHITE_COLOR};
	}
`;

export const ChatMessages = styled.div`
	width: 100%;
	height: calc(100% - 142px);
	position: relative;
	padding: 1rem 2rem;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	background-color: ${WHITE_COLOR};
	&::-webkit-scrollbar {
		width: 0.2rem;
		&-thumb {
			background-color: ${COLOR_GREY};
			width: 0.1rem;
			border-radius: 1rem;
		}
	}
`;
export const MessageBlock = styled.div`
	margin-left: 0;
`;

export const Message = styled.div`
	display: flex;
	align-items: center;
	&.date {
		padding-top: 8px;
	}

	& > .content {
		overflow-wrap: break-word;
		padding: 10px;
		max-width: 70%;
		font-size: ${FONT_MEDIUM};
		border-radius: 1rem;
		@media screen and (min-width: 720px) and (max-width: 1080px) {
			max-width: 70%;
		}
	}
	& > img {
		grid-row: span 2;
		height: 50px;
		width: 50px;
		border-radius: 100%;
		margin-right: 10px;
	}
	&.sended {
		justify-content: flex-start;
		& > .content {
			background-color: ${ORANGE};
		}
	}
	&.recieved {
		justify-content: flex-end;
		& > .content {
			background-color: ${DARK_SKY_BLUE};
			color: ${WHITE_COLOR};
		}
	}
`;

export const ButtonChat = styled.button`
	width: 100px;
	padding: 7px;
	border-radius: 10px;
	background-color: ${GREY};
	color: ${WHITE_COLOR};
	border-color: ${WHITE_COLOR};
	margin: 2% 4px;
	text-align: center;
	font-size: ${SMALL_FONT_SIZE};
	box-shadow: 3px 2px 2px ${GREY};
	&:hover {
		background-color: ${PURPLE};
	}
	&:active {
		box-shadow: 0 5px;
		transform: translateY(10px);
	}
`;

export const ButtonBlock = styled.div`
	display: flex;
	justify-content: flex-start;
`;

export const RightLi = styled.li`
	list-style-type: none;
	text-align: right;
`;

export const LeftLi = styled.li`
	list-style-type: none;
	text-align: left;
`;
//input style
export const InputBlock = styled.div`
	display: flex;
	justify-content: center;
	padding: 20px;
	bottom: 0;
	left: 0;
	width: 100%;
	position: sticky;

	& > .ant-btn {
		height: 40px;
	}
	& > button {
		border-radius: 30px;
		display: flex;
		justify-content: center;
		cursor: pointer;
		align-items: center;
		border: none;
		&:focus {
			outline: none;
		}
		@media screen and (min-width: 720px) and (max-width: 1080px) {
			padding: 0.3rem 1rem;
			svg {
				font-size: 1rem;
			}
		}
		svg {
			font-size: 2rem;
			color: $mesage-color;
		}
	}
`;

//chatTitle
export const TitleMessage = styled.div`
	position: relative;
	display: flex;
	align-content: center;
	justify-content: space-between;
	align-items: center;
	padding: 2px 20px;
	border-bottom: 2px solid ${PURPLE};
`;

export const TitleChat = styled.p`
	font-size: ${MEDIUM_FONT_SIZE};
	margin: 10px;
	font-weight: bold;
`;

export const CenterDiv = styled.div`
	display: inline-flex;
	align-items: center;
	& > img {
		border-radius: 100%;
		width: 50px;
	}
`;

//search
export const SearchWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

export const Btn = styled.button`
	margin: 0% 5% 0% 5%;
	width: 90%;
	&:hover {
		background-color: ${COLOR_GREY};
	}
`;
