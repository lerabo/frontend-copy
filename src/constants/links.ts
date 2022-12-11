import { notification } from 'antd';
import { t } from 'i18next';

export const defaultProfilePhoto =
	'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png';

type NotificationType = 'success' | 'error';

export const openNotificationWithIcon = (type: NotificationType, text?: string) => {
	notification[type]({
		message: type === 'success' ? `${t('JobPostPage.success')}` : `${t('JobPostPage.error')}`,
		description:
			type === 'success'
				? text
					? text
					: `${t('JobPostPage.dataHasBeenSaved')}`
				: `${t('JobPostPage.someErrorOccurred')}`,
	});
};

export const Role = {
	Freelancer: 'freelancer',
	Client: 'client',
};
