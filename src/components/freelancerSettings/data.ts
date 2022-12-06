import * as Yup from 'yup';
import { t } from 'i18next';

export const selection = [
	{ value: 'Legal', label: 'Legal' },
	{ value: 'IT', label: 'IT' },
	{ value: 'Sales', label: 'Sales' },
	{ value: 'Finance', label: 'Finance' },
	{ value: 'Construction', label: 'Construction' },
	{ value: 'Accounting', label: 'Accounting' },
	{ value: 'Design', label: 'Design' },
	{ value: 'Security', label: 'Security' },
	{ value: 'Healthcare', label: 'Healthcare' },
	{ value: 'Marketing', label: 'Marketing' },
];

export const checkList = [
	`${t('ClientSettings.people.me')}`,
	`${t('ClientSettings.people.2-9')}`,
	`${t('ClientSettings.people.10-99')}`,
	`${t('ClientSettings.people.100-1000')}`,
	`${t('ClientSettings.people.more')}`,
];

export const levelMock = [
	{ name: 'Pre Intermadiate', value: false },
	{ name: 'Intermediate', value: false },
	{ name: 'Fluent', value: false },
];

export interface ICategory {
	value: string;
	label: string;
}

export const Schema = Yup.object().shape({
	position: Yup.string()
		.required(`${t('JobPostPage.fieldIsRequired')}`)
		.min(6, `${t('JobPostPage.minLength')}`)
		.max(100, `${t('JobPostPage.maxLength100')}`),
	category: Yup.object().shape({
		label: Yup.string().required(`${t('JobPostPage.fieldIsRequired')}`),
		value: Yup.string().required(`${t('JobPostPage.fieldIsRequired')}`),
	}),
	price: Yup.number()
		.required(`${t('JobPostPage.fieldIsRequired')}`)
		.positive(),
	education: Yup.array().of(
		Yup.object().shape({
			description: Yup.string()
				.max(160, `${t('JobPostPage.maxLength100')}`)
				.required(`${t('JobPostPage.fieldIsRequired')}`),
			startDate: Yup.date().required(`${t('JobPostPage.fieldIsRequired')}`),
			endDate: Yup.date().required(`${t('JobPostPage.fieldIsRequired')}`),
		}),
	),
	experience: Yup.array().of(
		Yup.object().shape({
			description: Yup.string()
				.max(160, `${t('JobPostPage.maxLength100')}`)
				.required(`${t('JobPostPage.fieldIsRequired')}`),
			startDate: Yup.date().required(`${t('JobPostPage.fieldIsRequired')}`),
			endDate: Yup.date().required(`${t('JobPostPage.fieldIsRequired')}`),
		}),
	),
});

export type Data = {
	position: string;
	category: ICategory;
	price: number;
	englishLevel?: string;
	education: {
		description: string;
		startDate: Date;
		endDate: Date;
	}[];
	experience: {
		description: string;
		startDate: Date;
		endDate: Date;
	}[];
	description: string;
	skills?: { name: string }[];
	userId?: number;
	photo: string;
};

export type DataBE = {
	position: string;
	category: { name: string };
	price: number;
	englishLevel?: string;
	education: {
		description: string;
		startDate: Date;
		endDate: Date;
	}[];
	experience: {
		description: string;
		startDate: Date;
		endDate: Date;
	}[];
	description: string;
	skills?: { name: string }[];
	userId?: number;
	photo: string;
};

export const settings = 'settings';
export const info = 'info';
