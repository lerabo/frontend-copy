import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { yupResolver } from '@hookform/resolvers/yup';
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
import { ButtonBlock, ContainerDate, DateBlock, Title } from './SendOffer.style';
import { Input } from 'components/clientSettings/clentSettings.styles';
import { CancelButton, SaveButton } from 'components/clientSettings/clentSettings.styles';
import { t } from 'i18next';
import { useGetClientInfoByUserQuery } from 'service/httpService';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import { useForm } from 'react-hook-form';
import { ModalProps, OfferForm, Schema } from './data';
import { useSendData } from './dataSend';

export const SendOfferPopup: FunctionComponent<ModalProps> = ({
	isShown,
	setIsShown,
	hide,
	freelancerId,
	clientId,
	jobPostId,
	isError,
}) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<OfferForm>({
		resolver: yupResolver(Schema),
	});
	const { user } = useAppSelector<RootState>(state => state);
	const { data: clientInfo } = useGetClientInfoByUserQuery(user.id);
	const { sendData, sendUpdatedData } = useSendData();

	const handleForm = (data: OfferForm) => {
		const NewData = {
			...data,
			freelancerId,
			clientId,
			jobPostId,
		};
		if (isError) {
			sendUpdatedData(NewData);
		} else {
			sendData(NewData);
		}
		setIsShown(false);
		reset();
	};

	const modal = (
		<React.Fragment>
			<Backdrop />
			<Wrapper style={{ maxWidth: '50%' }}>
				<StyledModal>
					<CloseButton type="button" onClick={hide}>
						X
					</CloseButton>
					<Content>
						<Form onSubmit={handleSubmit(handleForm)}>
							<Title>{`${t('SendOfferPopup.offer')}`}</Title>
							<div>
								<Label>{`${t('SendOfferPopup.companyName')}`}</Label>
								<Input
									type="text"
									{...register('name')}
									defaultValue={clientInfo?.name}
									className={`${errors.name ? 'is-invalid' : ''}`}
								/>
							</div>
							<div>
								<Label>{`${t('SendOfferPopup.price')}`}</Label>
								<div className="input-group-prepend">
									<span className="input-group-text">$</span>
									<Input
										type="text"
										{...register('price')}
										className={`${errors.price ? 'is-invalid' : ''}`}
									/>
								</div>
								{errors.price && <P>{`${t('SendOfferPopup.priceError')}`}</P>}
							</div>
							<ContainerDate>
								<DateBlock>
									<Label>{`${t('SendOfferPopup.startDate')}`}</Label>
									<Input
										type="date"
										{...register('startDate')}
										className={`${errors.startDate ? 'is-invalid' : ''}`}
									/>
									{errors.startDate && <P>{errors.startDate?.message}</P>}
								</DateBlock>
								<DateBlock>
									<Label>{`${t('SendOfferPopup.endDate')}`}</Label>
									<Input
										type="date"
										{...register('endDate')}
										className={`${errors.endDate ? 'is-invalid' : ''}`}
									/>
									{errors.endDate && <P>{errors.endDate?.message}</P>}
								</DateBlock>
							</ContainerDate>
							<ButtonBlock>
								<SaveButton type="submit">{`${t('SendOfferPopup.saveButton')}`}</SaveButton>
								<CancelButton onClick={() => reset()}>
									{`${t('SendOfferPopup.cancel')}`}
								</CancelButton>
							</ButtonBlock>
						</Form>
					</Content>
				</StyledModal>
			</Wrapper>
		</React.Fragment>
	);
	return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};

export default SendOfferPopup;
