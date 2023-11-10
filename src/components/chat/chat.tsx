import {
	useGetMessagesByRoomQuery,
	useGetRoomsByUserQuery,
	useGetRoomsByTwoUsersQuery,
	useUpdateChatRoomMutation,
	useGetJobOfferQuery,
} from 'service/httpService';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import io, { Socket } from 'socket.io-client';
import { useEffect, useState, useRef } from 'react';
import { IoMdSend } from 'react-icons/io';
import {
	UsersList,
	ChatMessages,
	MessageBlock,
	ButtonChat,
	InputBlock,
	ButtonBlock,
	RightLi,
	LeftLi,
	Wrapper,
	ChatWrapper,
	Message,
	TitleMessage,
} from 'components/chat/chat.styles';
import { initialId, MessageBackend, MessageFrontend, RoomBackend, UserList } from './interfaces';
import { Input } from 'components/clientSettings/clentSettings.styles';
import { t } from 'i18next';
import Image from 'assets/no_result.png';
import { Img, H3, H5, ImgSpinner } from 'components/freelancerJobs/freelancerPage.styles';
import Spinner from 'assets/spinner.gif';
import MessageComponent from 'components/chat/components/message';
import User from 'components/chat/components/singleUser';
import { useOnDataChange } from 'components/chat/data';
import ChatTitle from 'components/chat/components/chatTitle';
import { Role } from 'constants/links';
import SendOfferPopup from 'components/chat/components/sendoffer/SendOffer';
import { SaveButton } from 'components/clientSettings/clentSettings.styles';
import FreeOfferPopup from 'components/FreelancerOffer/FreeOfferPopup';

export const NONE = 'none';
export const ACCEPTED = 'accepted';
export const DECLINED = 'declined';
export const PENDING = 'Pending';

const Chat = () => {
	const { user } = useAppSelector<RootState>((state) => state);
	const userId = user?.id;

	const [socket, setSocket] = useState<Socket>();
	const [chatRoomId, setChatRoomId] = useState<number>(0);
	const [socketMessage, setSocketMessage] = useState<MessageFrontend[]>([]);
	const [currentChatId, setCurrentChatId] = useState<initialId>();
	const [roomMessages, setRoomMessages] = useState<MessageBackend[]>();
	const [active, setActive] = useState<number>(chatRoomId);
	const [defaultChat, setDefaultChat] = useState<RoomBackend>();

	const { data: rooms, isSuccess } = useGetRoomsByUserQuery(userId);
	const { data: messages, isLoading } = useGetMessagesByRoomQuery(chatRoomId);
	const { data: room, isFetching } = useGetRoomsByTwoUsersQuery(currentChatId);
	const [updateChatRoom] = useUpdateChatRoomMutation();
	const { data: offer } = useGetJobOfferQuery(currentChatId);
	const scrollRef = useRef<null | HTMLDivElement>(null);

	console.log(offer);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	useEffect(() => {
		if (!isFetching) {
			setRoomMessages(room?.message);
			setDefaultChat(room);
		}
	}, [isFetching]);

	useEffect(() => {
		if (isSuccess) {
			if (isSuccess) {
				const newArray = rooms.filter((item: RoomBackend) => {
					return (
						(item.activeRoom === NONE &&
							user.role === Role.Freelancer &&
							item?.sendedFor === 'forFreelancer' &&
							item.deletedFor !== user.role) ||
						(item.activeRoom === NONE &&
							user.role === Role.Client &&
							item?.sendedFor === 'forClient' &&
							item.deletedFor !== user.role) ||
						(item.activeRoom !== NONE && item.deletedFor !== user.role)
					);
				});
				setDefaultChat(newArray[0]);
				setChatRoomId(newArray[0]?.id);
				setCurrentChatId({
					clientId: newArray[0]?.clientId.id,
					freelancerId: newArray[0]?.freelancerId.id,
					jobPostId: newArray[0]?.jobPostId.id,
					activeRoom: newArray[0]?.activeRoom,
				});
				setActive(newArray[0]?.id);
			}
		}
	}, [isSuccess, rooms]);

	useEffect(() => {
		if (!isLoading) {
			setRoomMessages(messages);
		}
	}, [isLoading]);

	useEffect(() => {
		const newSocket = io(`${process.env.REACT_APP_API_URL}`);
		setSocket(newSocket);
	}, []);

	const messageListener = (message: any) => {
		setSocketMessage((arr) => [...arr, message]);
	};

	useEffect(() => {
		socket?.on('recMessage', messageListener);
		return () => {
			socket?.off('recMessage', messageListener);
		};
	}, [socket]);
	const { register, handleSubmit, errors, reset, getDate, userList } = useOnDataChange();

	const updateRoom = (chatRoomId: number, text: string, activeRoom: string) => {
		const newObj = {
			chatRoomId,
			activeRoom,
		};
		updateChatRoom(newObj);
		const message = {
			text,
			chatRoomId,
			userId,
		};
		socket?.emit('sendMessage', message);
	};
	const useModal = () => {
		const [isShown, setIsShown] = useState<boolean>(false);
		const toggle = () => setIsShown(!isShown);
		return {
			isShown,
			setIsShown,
			toggle,
		};
	};
	const { isShown, setIsShown, toggle } = useModal();

	const onSubmit = (data: { text: string }, chatRoomId: number) => {
		const NewData = {
			...data,
			userId,
			chatRoomId,
		};
		socket?.emit('sendMessage', NewData);
		reset();
	};
	const changeRoom = (
		clientId: number,
		freelancerId: number,
		jobPostId: number,
		roomId: number,
		activeRoom: string,
	) => {
		setCurrentChatId({ clientId, freelancerId, jobPostId, activeRoom });
		setChatRoomId(roomId);
		setActive(chatRoomId);
	};
	if (isFetching || isLoading || !isSuccess) {
		return <ImgSpinner src={Spinner} />;
	} else if (isSuccess && !chatRoomId) {
		return (
			<>
				<Img src={Image}></Img>
				<H3>{`${t('FreelancerPage.noResult1')}`}</H3>
				<H5>{`${t('FreelancerPage.noResult2')}`}</H5>
			</>
		);
	}

	return (
		<Wrapper onSubmit={handleSubmit((data) => onSubmit(data, chatRoomId))}>
			<UsersList>
				{userList?.map((item: UserList) => {
					if (
						((user.role === Role.Freelancer &&
							item?.activeRoom === NONE &&
							item?.sendedFor === 'forFreelancer') ||
							(user.role === Role.Client &&
								item?.activeRoom === NONE &&
								item?.sendedFor === 'forClient') ||
							item?.activeRoom !== NONE) &&
						item?.deletedFor !== user.role
					) {
						return <User item={item} changeRoom={changeRoom} active={active} />;
					}
				})}
			</UsersList>
			<ChatWrapper>
				<TitleMessage>
					<ChatTitle userRole={user.role} room={room} />
					{user.role === Role.Client && currentChatId?.activeRoom && (
						<div>
							<SaveButton type="button" onClick={toggle}>
								{`${t('InvitePopup.buttonOffer')}`}
							</SaveButton>
							<SendOfferPopup
								hide={toggle}
								isShown={isShown}
								setIsShown={setIsShown}
								freelancerId={currentChatId.freelancerId}
								clientId={currentChatId.clientId}
								jobPostId={currentChatId.jobPostId}
								isError={false}
							/>
						</div>
					)}
				</TitleMessage>
				<ChatMessages ref={scrollRef}>
					{roomMessages?.map((message: MessageBackend) => {
						if (message?.user?.role === user?.role) {
							const date = getDate(new Date(message.created_at));
							return (
								<RightLi>
									<MessageComponent message={message} className={`message recieved`} />
									<Message className={`message date recieved`}>{date}</Message>
								</RightLi>
							);
						} else {
							const date = getDate(new Date(message.created_at));
							return (
								<LeftLi>
									<MessageComponent message={message} className={`message sended`} />
									<MessageBlock>
										<Message className={`message date sended`}>{date}</Message>
										{defaultChat?.activeRoom === NONE && user.id !== message.userId && (
											<ButtonBlock>
												<ButtonChat
													type="button"
													onClick={() =>
														updateRoom(chatRoomId, 'This proposal is accepted', ACCEPTED)
													}
												>
													{`${t('chat.accepted')}`}
												</ButtonChat>
												<ButtonChat
													type="button"
													onClick={() =>
														updateRoom(chatRoomId, 'This proposal is declined', DECLINED)
													}
												>
													{`${t('chat.declined')}`}
												</ButtonChat>
											</ButtonBlock>
										)}
									</MessageBlock>
								</LeftLi>
							);
						}
					})}
					{socketMessage?.map((message: MessageFrontend) => {
						if (message?.chatRoomId === chatRoomId) {
							if (message?.userId === user?.id) {
								return (
									<RightLi>
										<MessageComponent message={message} className={`message recieved`} />
									</RightLi>
								);
							} else {
								return (
									<LeftLi>
										<MessageComponent message={message} className={`message sended`} />
									</LeftLi>
								);
							}
						}
					})}
					{user?.role === Role.Freelancer && offer?.status === PENDING && (
						<FreeOfferPopup
							offer={offer}
							userId={user.id}
							chatRoomId={chatRoomId}
							socket={socket}
						/>
					)}
				</ChatMessages>
				<InputBlock>
					<Input
						type="text"
						{...register('text')}
						className={`${errors.text ? 'is-invalid' : ''}`}
					/>
					<button type="submit">
						<IoMdSend />
					</button>
				</InputBlock>
			</ChatWrapper>
		</Wrapper>
	);
};
export default Chat;
