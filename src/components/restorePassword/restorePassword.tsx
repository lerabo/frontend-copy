import { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, H1, DivForm } from 'components/restorePassword/restorePassword.style';
import { useTranslation } from 'react-i18next';
import { useResetPasswordMutation } from 'service/httpService';
import { saveUserId } from 'redux/reducers/userSlice';
import { useAppDispatch } from 'redux/hooks';
import { Label } from 'components/Layout/Layout.styles';
import { Button } from 'components/signIn/Signin.styles';
import { Input } from 'components/clientSettings/clentSettings.styles';
import { Div, ErrorP } from 'components/forgotPassword/Forgot.styles';
import { openNotificationWithIcon } from 'constants/links';
import { t } from 'i18next';

export type FormPass = {
	createPassword: string;
	password: string;
};

const schema = Yup.object({
	createPassword: Yup.string()
		.required(`${t('SignIn.passwordCheck')}`)
		.min(8),
	password: Yup.string()
		.required(`${t('SignIn.passwordCheck')}`)
		.min(8),
});

const resetPassword = () => {
	const [setPassword] = useResetPasswordMutation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<FormPass>({
		resolver: yupResolver(schema),
	});

	const { t } = useTranslation();
	const { token } = useParams<{ token: string }>();

	useEffect(() => {
		const userToken = localStorage.getItem('hash');
		const userId = localStorage.getItem('userId');
		dispatch(saveUserId(Number(userId)));
		if (token === userToken) {
			navigate('/search-post');
		}
	}, []);

	const onSubmit: SubmitHandler<FormPass> = async values => {
		const { password } = values;
		if (values.createPassword !== values.password) {
			openNotificationWithIcon('success');
		} else {
			try {
				await setPassword({ password, token: token || '' }).unwrap();
				localStorage.setItem('hash', token || '');
				reset({ createPassword: '', password: '' });
				navigate('/sign-in');
			} catch (e) {
				reset({ createPassword: '', password: '' });
				openNotificationWithIcon('error');
			}
		}
	};

	return (
		<Div>
			<H1>{`${t('ForgotPassword.title')}`}</H1>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<DivForm>
					<Label>{`${t('ResetPassword.newPassword')}`}</Label>
					<Controller
						render={({ field }) => <Input type="password" {...field} />}
						name="createPassword"
						control={control}
						defaultValue=""
					/>
					<ErrorP>{errors.createPassword?.message}</ErrorP>
					<Label>{`${t('ResetPassword.password')}`}</Label>
					<Controller
						render={({ field }) => <Input type="password" {...field} />}
						name="password"
						control={control}
						defaultValue=""
					/>
					<ErrorP>{errors.password?.message}</ErrorP>
					<Button type="submit">{`${t('SignUp.register')}`}</Button>
				</DivForm>
			</Form>
		</Div>
	);
};

export default resetPassword;
