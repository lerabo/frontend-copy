import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
	Wrapper,
	StyledModal,
	CloseButton,
	Content,
	Backdrop,
	Form,
	Label,
	P,
} from 'components/PostDetailsPage/components/Modal.styles';
import { t } from 'i18next';
import {
	usePostProposalMutation,
	useCreateRoomMutation,
	usePostMessageMutation,
} from 'service/httpService';
import { openNotificationWithIcon } from 'constants/links';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import { SaveButton } from 'components/clientSettings/clentSettings.styles';

interface ModalProps {
	isShown: boolean;
	hide: () => void;
	setDisable: (disable: boolean) => void;
	jobPostId: number;
	clientId: number;
}

type ProposalForm = {
	price: number;
	message: string;
};

const Schema = Yup.object().shape({
	price: Yup.number().required().positive(),
	message: Yup.string()
		.required(`${t('PostDetailPage.fieldIsRequired')}`)
		.min(6, `${t('PostDetailPage.minLength')}`)
		.max(50, `${t('PostDetailPage.maxLength')}`),
});

export const HandleModal: FunctionComponent<ModalProps> = ({
	isShown,
	hide,
	clientId,
	setDisable,
	jobPostId,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ProposalForm>({
		resolver: yupResolver(Schema),
	});
	const [sendForm] = usePostProposalMutation();
	const [createRoom] = useCreateRoomMutation();
	const [sendMessage] = usePostMessageMutation();
	const { user } = useAppSelector<RootState>((state) => state);

	const handleForm = async (data: ProposalForm) => {
		await sendForm({ ...data, jobPost: jobPostId, userId: user.id, userIdClient: clientId })
			.unwrap()
			.then(() => {
				openNotificationWithIcon('success');
			})
			.catch(() => openNotificationWithIcon('error'));
		setDisable(true);
		const room = await createRoom({
			jobPostId: jobPostId,
			clientId,
			freelancerId: user.id,
			sendedFor: 'forClient',
		}).unwrap();
		const chatRoomId = room?.id;
		await sendMessage({
			chatRoomId,
			text: data.message,
			jobLink: `/post-job/${jobPostId}`,
			userId: user.id,
		});
		hide();
	};

	const modal = (
		<React.Fragment>
			<Backdrop />
			<Wrapper>
				<StyledModal>
					<CloseButton type="button" onClick={hide}>
						X
					</CloseButton>
					<Content>
						<Form onSubmit={handleSubmit(handleForm)}>
							<div>
								<Label>{`${t('PostDetailPage.hourTitle')}`}</Label>
								<div className="input-group-prepend">
									<span className="input-group-text">$</span>
									<input
										type="text"
										{...register('price')}
										className={`form-control ${errors.price ? 'is-invalid' : ''}`}
									/>
								</div>
								{errors.price && <P>{`${t('PostDetailPage.priceError')}`}</P>}
							</div>
							<div>
								<Label>{`${t('PostDetailPage.CVTitle')}`}</Label>
								<input
									type="text"
									{...register('message')}
									className={`form-control ${errors.message ? 'is-invalid' : ''}`}
								/>
								{errors.message && <P>{errors.message?.message}</P>}
							</div>
							<SaveButton type="submit" style={{ display: 'block' }}>
								{`${t('PostDetailPage.sendBtn')}`}
							</SaveButton>
						</Form>
					</Content>
				</StyledModal>
			</Wrapper>
		</React.Fragment>
	);
	return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};

export default HandleModal;
