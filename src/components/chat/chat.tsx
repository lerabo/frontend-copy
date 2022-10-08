import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useGetMessagesByRoomQuery } from 'service/httpService';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import { useSendMessageMutation } from 'service/httpService';
import io, { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

export type DataSchema = {
	text: string;
};

export type DataSchemaBe = {
	text: string;
	userId: number | undefined;
	chatRoomId: number;
};

export const ValidationSchema = Yup.object().shape({
	text: Yup.string().required(`${t('JobPostPage.fieldIsRequired')}`),
});

const Chat = () => {
	const { user } = useAppSelector<RootState>(state => state);
	const userId = user.id;
	const [sendMessage] = useSendMessageMutation();
	const { data: messages } = useGetMessagesByRoomQuery(1);
	console.log(messages);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<DataSchema>({
		resolver: yupResolver(ValidationSchema),
	});

	const [socket, setSocket] = useState<Socket>();

	useEffect(() => {
		const newSocket = io('http://localhost:3000');
		setSocket(newSocket);
	}, [setSocket]);

	const chatRoomId = 1;
	const onSubmit = (data: DataSchema) => {
		const NewData = {
			...data,
			userId,
			chatRoomId,
		};
		socket?.emit('sendMessage', NewData);
		sendMessage(NewData);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				type="text"
				{...register('text')}
				className={`form-control ${errors.text ? 'is-invalid' : ''}`}
			/>
			<button type="submit">Send message</button>
		</form>
	);
};

export default Chat;
