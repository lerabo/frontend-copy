import { t } from 'i18next';
import {
	Actions,
	Content,
	P,
	Header,
	Modal,
	P2,
} from 'components/FreelancerOffer/FreeOfferPopup.styles';
import { usePostMessageMutation, useUpdateJobOfferMutation } from 'service/httpService';
import { ButtonChat } from 'components/chat/chat.styles';
import { Socket } from 'socket.io-client';

interface IProps {
	offer: {
		name: string;
		price: number;
		startDate: string;
		endDate: string;
		jobPostId: number;
		freelancerId: number;
		clientId: number;
	};
	userId?: number;
	chatRoomId: number;
	socket?: Socket;
}

const FreelancerOfferPopup = (props: IProps) => {
	const { offer, userId, chatRoomId, socket } = props;
	const [updateOffer] = useUpdateJobOfferMutation();
	const [sendMessage] = usePostMessageMutation();
	const Accepted = 'Accepted';

	const getDate = (date: Date) => {
		const currentDate =
			date.toLocaleDateString('en-us', { hour: 'numeric', minute: 'numeric' }) +
			' ' +
			date.getFullYear();
		return currentDate;
	};

	const handleClick = async (status: string) => {
		try {
			const obj = {
				jobPostId: offer?.jobPostId,
				freelancerId: offer?.freelancerId,
				clientId: offer?.clientId,
			};
			const { jobPostId, freelancerId, clientId } = obj;
			await updateOffer({ jobPostId, freelancerId, clientId, status }).unwrap();
			if (status === Accepted) {
				await sendMessage({
					chatRoomId,
					text: `${t('FreeOfferPopup.accepted')}`,
					userId,
				});
				socket?.emit('sendMessage', {
					text: `${t('FreeOfferPopup.accepted')}`,
					userId,
					chatRoomId,
				});
			} else {
				await sendMessage({
					chatRoomId,
					text: `${t('FreeOfferPopup.declined')}`,
					userId,
				});
				socket?.emit('sendMessage', {
					text: `${t('FreeOfferPopup.declined')}`,
					userId,
					chatRoomId,
				});
			}
		} catch (error) {
			// console.error(error);
		}
	};

	return (
		<div>
			<Modal>
				<Header>{`${t('FreeOfferPopup.title')}`}</Header>
				<Content>
					<P>{`${t('FreeOfferPopup.company')}:`}</P>
					<P2>{offer?.name}</P2>
					<P>{`${t('FreeOfferPopup.price')}:`}</P>
					<P2>{offer?.price}</P2>
					<P>{`${t('FreeOfferPopup.start')}:`}</P>
					<P2>{getDate(new Date(offer?.startDate))}</P2>
					<P>{`${t('FreeOfferPopup.end')}:`}</P>
					<P2>{getDate(new Date(offer?.endDate))}</P2>
				</Content>
				<Actions>
					<ButtonChat type="button" onClick={() => handleClick('Accepted')}>{`${t(
						'FreeOfferPopup.btnAccept',
					)}`}</ButtonChat>
					<ButtonChat type="button" onClick={() => handleClick('Rejected')}>{`${t(
						'FreeOfferPopup.btnDecline',
					)}`}</ButtonChat>
				</Actions>
			</Modal>
		</div>
	);
};

export default FreelancerOfferPopup;
