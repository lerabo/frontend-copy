import { SettingsJobOwner, SignIn, Settings } from 'constants/routes';
import { t } from 'i18next';
import { Icon, DropdownMenu } from 'components/PopupSettings/PopupJO.styles';
import SettingPerson from 'assets/setting-person.svg';
import settingsIcon from 'assets/settings.png';
import logout from 'assets/logout.png';
import { Role } from 'constants/links';
import { Li, NavButton, StyledLink, Image } from 'components/Layout/Layout.styles';
import { useAppDispatch } from 'redux/hooks';
import { saveEmail, saveToken, saveUserId } from 'redux/reducers/userSlice';

interface IProps {
	role: string;
}

const JOPopupSettings = (props: IProps) => {
	const { role } = props;
	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(saveEmail(''));
		dispatch(saveToken(''));
		dispatch(saveUserId(undefined));
		localStorage.clear();
	};

	return (
		<Li className="dropdown">
			<NavButton
				className="dropdownButton dropdown-toggle"
				type="button"
				id="dropdownMenuButton"
				data-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false"
			>
				<Image src={SettingPerson} alt="SettingPerson" />
			</NavButton>
			<DropdownMenu className="dropdown-menu" aria-labelledby="dropdownMenuButton">
				<StyledLink to={role === Role.Client ? `${SettingsJobOwner}` : `${Settings}`}>
					<Icon>
						<img src={settingsIcon} />
						{`${t('ClientPage.settings')}`}
					</Icon>
				</StyledLink>
				<StyledLink onClick={handleClick} to={`${SignIn}`}>
					<Icon>
						<img src={logout} />
						{`${t('ClientPage.logout')}`}
					</Icon>
				</StyledLink>
			</DropdownMenu>
		</Li>
	);
};

export default JOPopupSettings;
