import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { RoomBackend, ValidationSchema } from './interfaces';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import { useGetRoomsByUserQuery } from 'service/httpService';
import { useMemo } from 'react';
import profileImage from 'assets/profile.png';

export const useOnDataChange = () => {
	const { user } = useAppSelector<RootState>((state) => state);
	const userId = user?.id;
	const { data: rooms } = useGetRoomsByUserQuery(userId);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<{ text: string }>({
		resolver: yupResolver(ValidationSchema),
	});

	const getDate = (date: Date) => {
		const currentDate =
			date.toLocaleDateString('en-us', { hour: 'numeric', minute: 'numeric' }) +
			' ' +
			date.getFullYear();
		return currentDate;
	};
	const userList = useMemo(
		() =>
			rooms?.map((item: RoomBackend) => {
				const newObj = {
					jobTitle: item.jobPostId?.jobTitle,
					jobPostId: item.jobPostId?.id,
					lastMessage: item.message[0]?.text,
					clientId: item?.clientId?.id,
					freelancerId: item.freelancerId?.id,
					roomId: item?.id,
					activeRoom: item.activeRoom,
					date: item.createdAt,
					deletedFor: item.deletedFor,
					sendedFor: item.sendedFor,
				};
				if (item.clientId?.clientSetting) {
					const obj = {
						...newObj,
						clientName: item.clientId.clientSetting?.name,
						clientPhoto: item.clientId.clientSetting?.photo ?? profileImage,
						firstName: item.freelancerId?.firstName,
						lastName: item.freelancerId?.lastName,
						freelancerPhoto: item.freelancerId?.profileSetting?.photo ?? profileImage,
					};
					return obj;
				}
			}),
		[rooms],
	);

	return { register, handleSubmit, reset, errors, getDate, userList, rooms };
};
