import { RoomBackend } from 'components/chat/interfaces';
import profileImage from 'assets/profile.png';
import { CenterDiv, TitleChat } from 'components/chat/chat.styles';
import { Role } from 'constants/links';

interface Props {
	userRole: string;
	room: RoomBackend;
}

const ChatTitle = (props: Props) => {
	const { userRole, room } = props;
	return (
		<>
			{userRole === Role.Client && room?.freelancerId.profileSetting && (
				<CenterDiv>
					<img src={room?.freelancerId?.profileSetting?.photo ?? profileImage} />
					<TitleChat>
						{room?.freelancerId.firstName} {room?.freelancerId.lastName}
					</TitleChat>
				</CenterDiv>
			)}
			{userRole === Role.Freelancer && room?.clientId.clientSetting && (
				<CenterDiv>
					<img src={room?.clientId?.clientSetting?.photo ?? profileImage} />
					<TitleChat>{room?.clientId?.clientSetting?.name}</TitleChat>
				</CenterDiv>
			)}
		</>
	);
};

export default ChatTitle;
