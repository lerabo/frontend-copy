import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useDeleteJobPostMutation } from 'service/httpService';
import { Wrapper, Backdrop, StyledModal, Content, CloseButton, Label } from './Modal.styles';
import { useTranslation } from 'react-i18next';
import { CancelButton, SaveButton } from 'components/clientSettings/clentSettings.styles';

interface DeleteModalProps {
	toggleModal: () => void;
	openModal: boolean;
	id: string | undefined;
}

const DeleteModal: FC<DeleteModalProps> = ({ toggleModal, openModal, id }) => {
	const { t } = useTranslation();
	const [deleteJobPost, {}] = useDeleteJobPostMutation();
	const navigate = useNavigate();

	const handleRemove = () => {
		deleteJobPost(Number(id));
		navigate('/post-job');
	};
	const modal = (
		<>
			<Backdrop />
			<Wrapper>
				<StyledModal>
					<CloseButton type="button" onClick={toggleModal}>
						X
					</CloseButton>
					<Content>
						<div style={{ textAlign: 'center' }}>
							<Label>{`${t('DeleteModal.warningText')}`}</Label>
							<div>
								<SaveButton type="submit" onClick={handleRemove}>
									{`${t('DeleteModal.agree')}`}
								</SaveButton>
								<CancelButton type="button" onClick={toggleModal}>
									{`${t('DeleteModal.disagree')}`}
								</CancelButton>
							</div>
						</div>
					</Content>
				</StyledModal>
			</Wrapper>
		</>
	);
	return openModal ? ReactDOM.createPortal(modal, document.body) : null;
};

export default DeleteModal;
