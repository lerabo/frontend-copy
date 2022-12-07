import styled from 'styled-components';
import { MEDIUM_FONT_SIZE } from 'constants/fonts';
import { NavLink } from 'react-router-dom';
import { BLUE_PURPLE, LIGHTGREY_COLOR, PURPLE, VIOLET, WHITE_COLOR } from 'constants/colors';

export const MainHeader = styled.header`
	width: 100%;
	position: sticky;
	top: 0;
	left: 0;
	padding-top: 0px !important;
	padding-bottom: 0px !important;
	background: ${WHITE_COLOR};
	padding: 0.5rem 1rem;
	z-index: 60;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 2px solid ${PURPLE};
	font-family: 'Typold';
`;

export const Image = styled.img`
	cursor: pointer;
	height: 55px;
	width: 55px;
	margin: 0px;
	padding-bottom: 3px;
	@media (max-width: 860px) {
		width: 45px;
		height: 45px;
	}
`;
export const DropdownMenu = styled.div`
	padding: unset;
`;
export const BoderNav = styled.div`
	&:nth-child(1) {
		border-bottom: 2px solid ${LIGHTGREY_COLOR};
	}
`;

export const Label = styled.label`
	font-size: ${MEDIUM_FONT_SIZE};
	display: flex;
	align-items: center;
	margin: 0 !important;
`;

export const StyledLink = styled(NavLink)`
	text-decoration: none;
	font-weight: bold;
	display: block;
	padding-bottom: 3px;
	text-align: center;
	&:hover {
		border-bottom: 3px solid ${VIOLET};
		text-decoration: none;
		color: ${VIOLET};
		padding-bottom: 0px;
	}
	&:active,
	&:focus {
		border-bottom: 3px solid ${VIOLET};
		padding-bottom: 0px;
	}
`;

export const NavButton = styled.button`
	cursor: pointer;
	text-transform: uppercase;
	font-size: ${MEDIUM_FONT_SIZE};
	font-weight: bold;
	padding-bottom: 3px;
	&:hover,
	&:active,
	&:focus {
		border-bottom: 3px solid ${VIOLET};
		text-decoration: none;
		color: ${VIOLET};
		padding-bottom: 0px;
		outline: none;
	}
`;

export const MenuButton = styled.button`
	cursor: pointer;
	&:hover,
	&:active,
	&:focus {
		outline: none;
	}
	@media (min-width: 550px) {
		display: none;
	}
`;

export const Button = styled.button`
	cursor: pointer;
	&:hover,
	&:active,
	&:focus {
		outline: none;
	}
`;

export const Li = styled.li`
	margin: 0 1rem;
	cursor: pointer;
	text-transform: uppercase;
	font-size: ${MEDIUM_FONT_SIZE};
	margin: 0px 20px;
	padding: 3px 10px;
	@media (max-width: 1070px) {
		padding: 8px 6px;
		text-transform: capitalize;
	}
	@media (max-width: 750px) {
		margin: 0px;
	}
`;

export const Navigation = styled.nav`
	display: flex;
	@media (max-width: 550px) {
		display: none;
	}
`;
export const UlNav = styled.ul`
	margin: 0;
	padding: 0;
	list-style: none;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Div = styled.div`
	margin: 10px;
	cursor: pointer;
	padding: 0 20px;
`;

export const MenuSetting = styled.div`
	margin-right: 90px;
	&.dropdown-menu:hover {
		text-decoration: none;
		background-color: ${BLUE_PURPLE};
	}
	& > .dropdown-item:hover {
		background-color: unset;
	}
`;

//mobile-nav
export const MobileNav = styled.nav`
	position: fixed;
	background-color: ${PURPLE};
	z-index: 101;
	top: 0;
	left: 0;
	width: 60%;
	height: 100vh;
`;

export const MobileUlNav = styled.ul`
	width: 90%;
	height: 100%;
	list-style: none;
	margin: 0 auto;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
