import styled from 'styled-components';
import Pink from 'assets/Group 3.png';
import Yellow from 'assets/Group 5.png';
import Blue from 'assets/Group 6.png';
import Green from 'assets/Group 2.png';
import Purple from 'assets/Group 4.png';
import { GREY } from 'constants/colors';
import { t } from 'i18next';

const Div = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	font-family: 'Typold';
	& > img {
		width: 20%;
	}
	@media (max-width: 550px) {
		& > img {
			width: 30%;
		}
		& > img:last-child {
			left: 100px;
		}
		& > #blue {
			left: 0px;
		}
		& > #purple {
			left: 100px;
		}
	}
	@media (max-width: 800px) {
		& > img {
			width: 25%;
		}
		& > img:last-child {
			left: 100px;
		}
	}
`;

const CenterDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	& > p {
		z-index: 10;
		font-size: 150px;
		font-weight: bolder;
	}
	@media (max-width: 1200px) {
		& > p {
			font-size: 100px;
		}
	}
	@media (max-width: 550px) {
		& > p {
			font-size: 50px;
		}
	}
`;

const CenterDiv2 = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	& > p {
		z-index: 10;
		font-size: 40px;
		color: ${GREY};
		align-items: flex-end;
	}
	@media (max-width: 1200px) {
		& > p {
			font-size: 25px;
		}
	}
	@media (max-width: 550px) {
		& > p {
			font-size: 15px;
		}
	}
`;

const PinkImg = styled.img`
	position: absolute;
	right: 10px;
`;

const YellowImg = styled.img`
	position: absolute;
	top: 100px;
`;

const BlueImg = styled.img`
	position: absolute;
	bottom: 0px;
	left: 100px;
`;

const GreenImg = styled.img`
	position: absolute;
	right: 0px;
	bottom: 0px;
`;

const PurpleImg = styled.img`
	position: absolute;
	left: 200px;
`;

const Home = () => {
	return (
		<Div>
			<PinkImg src={Pink} />
			<YellowImg src={Yellow} />
			<BlueImg id="blue" src={Blue} />
			<GreenImg src={Green} />
			<PurpleImg id="purple" src={Purple} />
			<CenterDiv>
				<p>{`${t('Layout.logo')}.`}</p>
				<CenterDiv2>
					<p>{`${t('Layout.slogo')}`}</p>
				</CenterDiv2>
			</CenterDiv>
		</Div>
	);
};

export default Home;
