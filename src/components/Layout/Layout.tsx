import { FC, useEffect, useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from 'redux/store';
import {
	Navigation,
	Li,
	UlNav,
	DropdownMenu,
	StyledLink,
	MainHeader,
	NavButton,
	Button,
	Label,
	MenuButton,
	MobileNav,
	MobileUlNav,
} from './Layout.styles';
import { t } from 'i18next';
import {
	CreateJobPost,
	PostJobPage,
	SignIn,
	Contracts,
	Chat,
	TalentPage,
	Home,
	SignUp,
} from 'constants/routes';
import JOPopupSettings from 'components/PopupSettings/PopUpJOSettings';
import Logo from 'assets/Logo.png';
import Menu from 'assets/menu.png';
import { Backdrop } from 'components/PostDetailsPage/components/Modal.styles';
import { Role } from 'constants/links';

const Layout: FC = () => {
	const { user } = useAppSelector<RootState>(state => state);
	const navigate = useNavigate();
	const [toggleMenu, setToggleMenu] = useState(false);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	const toggleNav = () => {
		setToggleMenu(!toggleMenu);
	};

	const redirectHandler = () => {
		navigate(`${Home}`);
	};

	useEffect(() => {
		const changeWidth = () => {
			setScreenWidth(window.innerWidth);
		};

		window.addEventListener('resize', changeWidth);

		return () => {
			window.removeEventListener('resize', changeWidth);
		};
	}, []);

	return (
		<div>
			{user.id && (
				<>
					{user.role === Role.Client && (
						<>
							<MainHeader>
								<div style={{ display: 'flex' }}>
									<MenuButton onClick={toggleNav}>
										<img src={Menu}></img>
									</MenuButton>
									<Button onClick={redirectHandler}>
										<Label>
											<img src={Logo} style={{ margin: '10px' }}></img>
											{`${t('Layout.logo')}`}
										</Label>
									</Button>
								</div>
								<Navigation>
									<UlNav>
										<Li className="dropdown">
											<NavButton
												className="dropdownButton dropdown-toggle"
												type="button"
												id="dropdownMenuButton"
												data-toggle="dropdown"
												aria-haspopup="true"
												aria-expanded="false"
											>
												{`${t('ClientPage.clientTitleDrop')}`}
											</NavButton>
											<DropdownMenu className="dropdown-menu" aria-labelledby="dropdownMenuButton">
												<StyledLink to={`${PostJobPage}`}>{`${t(
													'ClientPage.clientTitle',
												)}`}</StyledLink>
												<StyledLink to={`${CreateJobPost}`}>{`${t(
													'ClientPage.create',
												)}`}</StyledLink>
											</DropdownMenu>
										</Li>
										<Li>
											<StyledLink to={`${TalentPage}`}>{`${t('ClientPage.talent')}`}</StyledLink>
										</Li>
										<Li>
											<StyledLink to={`${Chat}`}>{`${t('ClientPage.chat')}`}</StyledLink>
										</Li>
										<Li>
											<StyledLink to={`${Contracts}`}>{`${t('ClientPage.contracts')}`}</StyledLink>
										</Li>
										<JOPopupSettings role={user.role} />
									</UlNav>
								</Navigation>
							</MainHeader>
							{toggleMenu && screenWidth < 550 && (
								<>
									<Backdrop onClick={toggleNav} />
									<MobileNav>
										<MobileUlNav>
											<Li className="dropdown">
												<NavButton
													className="dropdownButton dropdown-toggle"
													type="button"
													id="dropdownMenuButton"
													data-toggle="dropdown"
													aria-haspopup="true"
													aria-expanded="false"
												>
													{`${t('ClientPage.clientTitleDrop')}`}
												</NavButton>
												<DropdownMenu
													className="dropdown-menu"
													aria-labelledby="dropdownMenuButton"
												>
													<StyledLink to={`${PostJobPage}`}>{`${t(
														'ClientPage.clientTitle',
													)}`}</StyledLink>
													<StyledLink to={`${CreateJobPost}`}>{`${t(
														'ClientPage.create',
													)}`}</StyledLink>
												</DropdownMenu>
											</Li>
											<Li>
												<StyledLink to={`${TalentPage}`}>{`${t('ClientPage.talent')}`}</StyledLink>
											</Li>
											<Li>
												<StyledLink to={`${Chat}`}>{`${t('ClientPage.chat')}`}</StyledLink>
											</Li>
											<Li>
												<StyledLink to={`${Contracts}`}>{`${t(
													'ClientPage.contracts',
												)}`}</StyledLink>
											</Li>
											<JOPopupSettings role={user.role} />
										</MobileUlNav>
									</MobileNav>
								</>
							)}
						</>
					)}
					{user.role === Role.Freelancer && (
						<>
							{!toggleMenu && (
								<>
									<MainHeader>
										<div style={{ display: 'flex' }}>
											<MenuButton onClick={toggleNav}>
												<img src={Menu}></img>
											</MenuButton>
											<Button onClick={redirectHandler}>
												<Label>
													<img src={Logo} style={{ margin: '10px' }}></img>
													{`${t('Layout.logo')}`}
												</Label>
											</Button>
										</div>
										<Navigation>
											<UlNav>
												<Li>
													<StyledLink to={`${Contracts}`}>{`${t(
														'FreelancerLayout.contracts',
													)}`}</StyledLink>
												</Li>
												<Li>
													<StyledLink to={`${Chat}`}>{`${t('FreelancerLayout.chat')}`}</StyledLink>
												</Li>
												<Li>
													<StyledLink to={`${PostJobPage}`}>{`${t(
														'FreelancerLayout.search',
													)}`}</StyledLink>
												</Li>
												<JOPopupSettings role={user.role} />
											</UlNav>
										</Navigation>
									</MainHeader>
								</>
							)}
							{toggleMenu && screenWidth < 550 && (
								<>
									<Backdrop onClick={toggleNav} />
									<MobileNav>
										<MobileUlNav>
											<Li>
												<StyledLink to={`${Contracts}`}>{`${t(
													'FreelancerLayout.contracts',
												)}`}</StyledLink>
											</Li>
											<Li>
												<StyledLink to={`${Chat}`}>{`${t('FreelancerLayout.chat')}`}</StyledLink>
											</Li>
											<Li>
												<StyledLink to={`${PostJobPage}`}>{`${t(
													'FreelancerLayout.search',
												)}`}</StyledLink>
											</Li>
											<JOPopupSettings role={user.role} />
										</MobileUlNav>
									</MobileNav>
								</>
							)}
						</>
					)}
					<Outlet />
				</>
			)}
			{!user.id && (
				<>
					{!toggleMenu && (
						<>
							<MainHeader>
								<div style={{ display: 'flex' }}>
									<MenuButton onClick={toggleNav}>
										<img src={Menu}></img>
									</MenuButton>
									<Button onClick={redirectHandler}>
										<Label>
											<img src={Logo} style={{ margin: '10px' }}></img>
											{`${t('Layout.logo')}`}
										</Label>
									</Button>
								</div>
								<Navigation>
									<UlNav>
										<Li>
											<StyledLink to={`${Home}`}>{`${t('Layout.home')}`}</StyledLink>
										</Li>
										<Li>
											<StyledLink to={`${SignUp}`}>{`${t('Layout.signup')}`}</StyledLink>
										</Li>
										<Li>
											<StyledLink to={`${SignIn}`}>{`${t('Layout.login')}`}</StyledLink>
										</Li>
									</UlNav>
								</Navigation>
							</MainHeader>
							<Outlet />
						</>
					)}
					{toggleMenu && screenWidth < 550 && (
						<>
							<Backdrop onClick={toggleNav} />
							<MobileNav>
								<MobileUlNav>
									<Li>
										<StyledLink to={`${Home}`}>{`${t('Layout.home')}`}</StyledLink>
									</Li>
									<Li>
										<StyledLink to={`${SignUp}`}>{`${t('Layout.signup')}`}</StyledLink>
									</Li>
									<Li>
										<StyledLink to={`${SignIn}`}>{`${t('Layout.login')}`}</StyledLink>
									</Li>
								</MobileUlNav>
							</MobileNav>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Layout;
