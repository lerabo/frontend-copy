import { openNotificationWithIcon } from 'constants/links';
import { usePostProfileMutation } from 'service/httpService';
import { Data, DataBE } from './data';

export const useSendData = () => {
	const [sendInfo] = usePostProfileMutation();

	const sendData = async (data: Data) => {
		try {
			const newObj: DataBE = {
				position: data.position,
				category: { name: data.category.label },
				price: data.price,
				englishLevel: data.englishLevel,
				education: data.education.map((e) => {
					return {
						description: e.description,
						startDate: e.startDate,
						endDate: e.endDate,
					};
				}),
				experience: data.experience.map((e) => {
					return {
						description: e.description,
						startDate: e.startDate,
						endDate: e.endDate,
					};
				}),
				userId: data.userId,
				photo: data.photo,
				description: data.description,
				skills: data.skills,
			};
			await sendInfo(newObj).unwrap();
			openNotificationWithIcon('success');
		} catch (error) {
			openNotificationWithIcon('error');
		}
	};
	return { sendData };
};
