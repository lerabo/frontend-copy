import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { phoneNumberRegExp } from 'constants/reg-exps';
import * as Yup from 'yup';
import { t } from 'i18next';
import { SaveButton } from 'components/clientSettings/clentSettings.styles';
import { usePostProfileInfoMutation, useGetContactInfoQuery } from 'service/httpService';
import { RootState } from 'redux/store';
import { useAppSelector } from 'redux/hooks';
import { Input, P, Title } from 'components/clientSettings/clentSettings.styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { openNotificationWithIcon } from 'constants/links';
import { useEffect } from 'react';
import { CenterDiv } from 'components/inviteTalent/inviteTalent.styles';

export interface IContactInfoForm {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	userId?: number;
}

const phoneRegExp = new RegExp(phoneNumberRegExp);

export const Schema = Yup.object().shape({
	firstName: Yup.string()
		.max(100, `${t('JobPostPage.maxLength100')}`)
		.required(`${t('JobPostPage.fieldIsRequired')}`),
	lastName: Yup.string()
		.max(100, `${t('JobPostPage.maxLength100')}`)
		.required(`${t('JobPostPage.fieldIsRequired')}`),
	email: Yup.string()
		.email()
		.required(`${t('JobPostPage.fieldIsRequired')}`),
	phone: Yup.string()
		.matches(phoneRegExp, 'Phone number is not valid')
		.required(`${t('JobPostPage.fieldIsRequired')}`),
});

export const ContactInfo = () => {
	const { t } = useTranslation();
	const { user } = useAppSelector<RootState>((state) => state);
	const { data: contactInfo } = useGetContactInfoQuery(user.id);
	const [sendForm] = usePostProfileInfoMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<IContactInfoForm>({ resolver: yupResolver(Schema) });

	useEffect(() => {
		if (contactInfo) {
			setValue('firstName', contactInfo.firstName);
			setValue('lastName', contactInfo.lastName);
			setValue('phone', contactInfo.phone);
		}
	}, [contactInfo]);

	const onSubmit: SubmitHandler<IContactInfoForm> = async (data) => {
		try {
			const newObj: IContactInfoForm = {
				firstName: data.firstName,
				lastName: data.lastName,
				email: user.email,
				phone: data.phone,
				userId: user.id,
			};
			await sendForm(newObj).unwrap();
			openNotificationWithIcon('success');
		} catch (error) {
			openNotificationWithIcon('error');
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<Title>{`${t('ContactInfo.firstName')}`}</Title>
				<Input
					type="text"
					{...register('firstName')}
					className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
				/>
				{errors.firstName && <P>{errors.firstName?.message}</P>}
			</div>
			<div>
				<Title>{`${t('ContactInfo.lastName')}`}</Title>
				<Input
					type="text"
					{...register('lastName')}
					className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
				/>
				{errors.lastName && <P>{errors.lastName?.message}</P>}
			</div>
			<div>
				<Title>{`${t('ContactInfo.email')}`}</Title>
				<Input
					type="text"
					{...register('email')}
					value={user.email}
					className={`form-control ${errors.email ? 'is-invalid' : ''}`}
				/>
				{errors.email && <P>{errors.email?.message}</P>}
			</div>
			<div>
				<Title>{`${t('ContactInfo.phone')}`}</Title>
				<Input
					type="text"
					{...register('phone')}
					className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
				/>
				{errors.phone && <P>{errors.phone?.message}</P>}
			</div>
			<CenterDiv>
				<SaveButton type="submit">{`${t('ProfileEdit.saveButton')}`}</SaveButton>
			</CenterDiv>
		</form>
	);
};
