import Popup from 'reactjs-popup';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
	Content,
	Header,
	Modal,
	Select,
	JobPopup,
	Span,
	CenterDiv,
} from 'components/inviteTalent/inviteTalent.styles';
import TextArea from 'antd/lib/input/TextArea';
import { CreateJobPost } from 'constants/routes';
import { useNavigate } from 'react-router-dom';
import {
	usePostInvitationMutation,
	useCreateRoomMutation,
	usePostMessageMutation,
} from 'service/httpService';
import { IMessage, IProps } from 'components/inviteTalent/interfaces';
import { CloseButton } from 'components/PostDetailsPage/components/Modal.styles';
import { Button } from 'components/signIn/Signin.styles';
import { openNotificationWithIcon } from 'constants/links';

const InvitePopup = (props: IProps) => {
	const {
		isDisabled,
		setIsDisabled,
		open,
		setOpen,
		post,
		handleSelect,
		data,
		defaultTitle,
		clientInfos,
	} = props.Context;
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [postInvitation] = usePostInvitationMutation();
	const [createRoom] = useCreateRoomMutation();
	const [sendMessage] = usePostMessageMutation();
	const { control, handleSubmit } = useForm<IMessage>();

	const onSubmit = async (payload: IMessage) => {
		const { message, jobTitle } = payload;
		const { userId, id } = data.profile;
		const { clientId, jobPostId } = clientInfos;
		if (isDisabled) {
			setIsDisabled(false);
		} else {
			if (message && jobTitle) {
				await postInvitation({
					message,
					clientId,
					freelancerId: userId,
					profileId: id,
					jobPostId,
					jobTitle,
				}).unwrap();
				setOpen(false);
				openNotificationWithIcon('success');
				setIsDisabled(true);
				const room = await createRoom({
					jobPostId: jobPostId,
					clientId,
					freelancerId: userId,
					sendedFor: 'forFreelancer',
				}).unwrap();
				const chatRoomId = room?.id;
				await sendMessage({
					chatRoomId,
					text: message,
					jobLink: `/post-job/${jobPostId}`,
					userId: clientId,
				});
				setOpen(false);
			} else {
				openNotificationWithIcon('error');
			}
		}
	};

	return (
		<div>
			{post && post.length !== 0 ? (
				<Popup open={open} closeOnDocumentClick onClose={() => setOpen(false)}>
					{open ? (
						<Modal>
							<CloseButton type="button" onClick={() => setOpen(false)}>
								X
							</CloseButton>
							<Header>{`${t('InvitePopup.title')}`}</Header>
							<div>
								<Span>{`${t('InvitePopup.label')}`}</Span>
								<Controller
									render={({ field }) => (
										<TextArea
											{...field}
											rows={7}
											style={{ width: '80%', marginLeft: '10%' }}
											defaultValue={`${t('InvitePopup.message')}`}
										/>
									)}
									name="message"
									control={control}
									defaultValue={`${t('InvitePopup.message')}`}
								/>
							</div>
							<Span>{`${t('InvitePopup.job')}`}</Span>
							<Content>
								<Controller
									render={({ field }) => <Select {...field}>{handleSelect()}</Select>}
									name="jobTitle"
									control={control}
									defaultValue={`${defaultTitle.jobTitle}`}
								/>
							</Content>
							<CenterDiv>
								<Button onClick={handleSubmit(onSubmit)} disabled={isDisabled}>
									{`${t('InvitePopup.button')}`}
								</Button>
							</CenterDiv>
						</Modal>
					) : null}
				</Popup>
			) : (
				<Popup open={open} closeOnDocumentClick onClose={() => setOpen(false)}>
					{open ? (
						<JobPopup>
							<CloseButton type="button" onClick={() => setOpen(false)}>
								X
							</CloseButton>
							<Span>{`${t('InvitePopup.noJobs')}`}</Span>
							<div>
								<Button
									type="button"
									style={{ display: 'block' }}
									onClick={() => navigate(`${CreateJobPost}`)}
								>
									{`${t('InvitePopup.buttonPost')}`}
								</Button>
							</div>
						</JobPopup>
					) : null}
				</Popup>
			)}
		</div>
	);
};

export default InvitePopup;
