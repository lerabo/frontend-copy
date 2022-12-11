import { useNavigate } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Div, P, ErrorP } from './signup.styled';
import { useTranslation } from 'react-i18next';
import { useSignUpMutation } from 'service/httpService';
import GoogleAuth from 'components/GoogleAuth/GoogleAuth';
import { useAppDispatch } from 'redux/hooks';
import { saveEmail, savePassword, saveUserId } from 'redux/reducers/userSlice';
import { RoleSelection } from 'constants/routes';
import { Button } from 'components/signIn/Signin.styles';
import { openNotificationWithIcon } from 'constants/links';
import { DivForm, Form } from 'components/restorePassword/restorePassword.style';
import { Input } from 'components/clientSettings/clentSettings.styles';
import { Label } from 'components/Layout/Layout.styles';

export type FormData = {
	email: string;
	createPassword: string;
	password: string;
	role: string;
};

const schema = Yup.object({
	email: Yup.string().email().required(),
	createPassword: Yup.string().min(8).required(),
	password: Yup.string().min(8).required(),
}).required();
const signUp = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [signUp] = useSignUpMutation();
	const navigate = useNavigate();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<FormData> = async values => {
		const { email, password } = values;
		if (values.createPassword !== values.password) {
			openNotificationWithIcon('error');
		} else {
			try {
				const res = await signUp({ email, password }).unwrap();
				dispatch(saveUserId(res.id));
				dispatch(saveEmail(email));
				dispatch(savePassword(password));
				navigate(`${RoleSelection}`);
				openNotificationWithIcon('success', `${t('SignUp.success')}`);
			} catch (e) {
				openNotificationWithIcon('error', `${t('SignUp.errorEmail')}`);
			}
		}
	};
	return (
		<Div>
			<P>{`${t('SignUp.quickSign')}`}</P>
			<GoogleAuth />
			<P>{`${t('SignUp.or')}`}</P>
			<P>{`${t('SignUp.textEmail')}`}</P>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<DivForm>
					<Label>{`${t('SignUp.email')}`}</Label>
					<Controller
						render={({ field }: any) => <Input type="email" {...field} />}
						name="email"
						control={control}
					/>
					<ErrorP>{errors.email?.message}</ErrorP>
					<Label>{`${t('SignUp.createPassword')}`}</Label>
					<Controller
						render={({ field }: any) => <Input type="password" {...field} />}
						name="createPassword"
						control={control}
					/>
					<ErrorP>{errors.createPassword?.message}</ErrorP>
					<Label>{`${t('SignUp.password')}`}</Label>
					<Controller
						render={({ field }: any) => <Input type="password" {...field} />}
						name="password"
						control={control}
					/>
					<ErrorP>{errors.password?.message}</ErrorP>
					<Button type="submit">{`${t('SignUp.register')}`}</Button>
				</DivForm>
			</Form>
		</Div>
	);
};
export default signUp;
