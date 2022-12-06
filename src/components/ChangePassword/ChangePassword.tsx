import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox } from 'antd';
import { LabelBlock, ButtonBlock } from './ChangePassword.styles';
import {
	Input,
	Title,
	MainTitle,
	P,
	SaveButton,
	CancelButton,
} from 'components/clientSettings/clentSettings.styles';
import { useTranslation } from 'react-i18next';
import { usePasswordChangeMutation } from 'service/httpService';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import ValidationSchema from './ValidationSchema';
import { openNotificationWithIcon } from 'constants/links';

export type FormPass = {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
	email: string;
};

const ChangePassword = () => {
	const [passwordShown, setPasswordShown] = useState<boolean>(false);
	const [setPassword] = usePasswordChangeMutation();
	const { user } = useAppSelector<RootState>(state => state);
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<FormPass>({
		resolver: yupResolver(ValidationSchema),
	});

	const { t } = useTranslation();

	const resetInput = () => {
		return reset({ oldPassword: '', newPassword: '', confirmPassword: '' });
	};

	const onChange = (e: { target: { checked: boolean } }) => {
		setPasswordShown(e.target.checked);
	};

	const onCancelButton = () => {
		resetInput();
	};

	const onSubmit: SubmitHandler<FormPass> = async values => {
		const { oldPassword, newPassword } = values;
		if (values.newPassword !== values.confirmPassword) {
			openNotificationWithIcon('error');
		} else {
			try {
				await setPassword({
					oldPassword: oldPassword,
					newPassword: newPassword,
					email: user.email || '',
				}).unwrap();
				resetInput();
				openNotificationWithIcon('success');
			} catch (e) {
				resetInput();
				openNotificationWithIcon('error');
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<MainTitle>{`${t('ChangePassword.changePassword')}`}</MainTitle>
			<div>
				<Title>{`${t('ChangePassword.oldPassword')}`}</Title>
				<Controller
					render={({ field }) => (
						<Input
							className={`form-control ${errors.oldPassword ? 'is-invalid' : ''}`}
							type={passwordShown ? 'text' : 'password'}
							{...field}
						/>
					)}
					name="oldPassword"
					control={control}
					defaultValue=""
				/>
			</div>
			<P>{errors.oldPassword?.message}</P>
			<div>
				<LabelBlock>
					<Title>{`${t('ChangePassword.newPassword')}`}</Title>
					<Checkbox onChange={onChange}>{`${t('ChangePassword.showPassword')}`}</Checkbox>
				</LabelBlock>
				<Controller
					render={({ field }) => (
						<Input
							className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
							type={passwordShown ? 'text' : 'password'}
							{...field}
						/>
					)}
					name="newPassword"
					control={control}
					defaultValue=""
				/>
			</div>
			<P>{errors.newPassword?.message}</P>
			<div>
				<Title>{`${t('ChangePassword.confirmPassword')}`}</Title>
				<Controller
					render={({ field }) => (
						<Input
							className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
							type={passwordShown ? 'text' : 'password'}
							{...field}
						/>
					)}
					name="confirmPassword"
					control={control}
					defaultValue=""
				/>
			</div>
			<P>{errors.confirmPassword?.message}</P>
			<ButtonBlock>
				<SaveButton type="submit">{`${t('ChangePassword.saveButton')}`}</SaveButton>
				<CancelButton onClick={onCancelButton}>{`${t('ChangePassword.cancel')}`}</CancelButton>
			</ButtonBlock>
		</form>
	);
};

export default ChangePassword;
