import { useTranslation } from 'react-i18next';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import { Data, selection, Schema, settings, info } from 'components/freelancerSettings/data';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import editIcon from 'assets/icon-pencil.png';
import { RootState } from 'redux/store';
import { useAppSelector } from 'redux/hooks';
import { useSendData } from 'components/freelancerSettings/dataSend';
import { useGetFreelancerInfoQuery } from 'service/httpService';
import { ImgSpinner } from 'components/freelancerJobs/freelancerPage.styles';
import {
	Container,
	Label,
	SkillsButtonsBlock,
	Span,
	Title,
} from 'components/jobPost/JobPost.styles';
import Spinner from 'assets/spinner.gif';
import { defaultProfilePhoto } from 'constants/links';
import { Image } from 'antd';
import { useOnDataChange, skillsMock } from 'components/jobPost/dataChanges';
import { ContainerDate, DateBlock } from 'components/chat/components/sendoffer/SendOffer.style';
import { ContactInfo } from 'components/ContactInfo/ContactInfo';
import { ISkill } from 'components/jobPost/interfaces';
import {
	MainTitle,
	Input,
	TextArea,
	ButtonBlock,
	Button,
	Img,
	ProfilePhoto,
	MinColumn,
	MaxColumn,
	Column,
	P,
	Div,
	SaveButton,
} from 'components/clientSettings/clentSettings.styles';
import { AddButton } from './freelancer.styles';
import EnglishRadio from './components/radioEnglish';

const FreelancerSettings = () => {
	const { user } = useAppSelector<RootState>(state => state);
	const userId = user.id;
	const { data: freelancerSettings, isLoading, isSuccess } = useGetFreelancerInfoQuery(userId);
	const { sendData } = useSendData();
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = useForm<Data>({
		resolver: yupResolver(Schema),
	});
	const { fields: educations, append: educationAppend } = useFieldArray({
		name: 'education',
		control,
	});
	const { fields: experiences, append: experienceAppend } = useFieldArray({
		name: 'experience',
		control,
	});

	const [active, setActive] = useState<{ [name: string]: string }>({ [settings]: settings });
	const [education, setEducation] = useState<number>(0);
	const [experience, setExperience] = useState<number>(0);
	const [file, setFile] = useState<string>(defaultProfilePhoto);
	const [skillsOptions, setSkillsOptions] = useState<ISkill[]>(skillsMock);
	const [skill, setSkill] = useState<{ name: string }[]>();
	const { onSkillsChange, skills } = useOnDataChange();
	const [selected, setSelected] = useState<string>();
	const [redColor, setRedColor] = useState(false);
	const [btn, setBtn] = useState(false);

	const optionButtons = useMemo(() => {
		return skillsOptions.map((e, i) => (
			<Label key={e.name} className={`btn btn-${e.value ? 'primary' : 'light'}`}>
				<input
					type="checkbox"
					checked={e.value}
					autoComplete="off"
					onChange={() => onSkillsChange(i)}
				/>
				{e.name}
			</Label>
		));
	}, [skillsOptions]);

	useEffect(() => {
		for (let i = 0; i < 1; i++) {
			educationAppend({ description: '', startDate: new Date(), endDate: new Date() });
		}
	}, [education]);

	useEffect(() => {
		for (let i = 0; i < 1; i++) {
			experienceAppend({ description: '', startDate: new Date(), endDate: new Date() });
		}
	}, [experience]);

	useEffect(() => {
		if (freelancerSettings && isSuccess) {
			setValue('position', freelancerSettings.position);
			setValue('category', {
				label: freelancerSettings.category.name,
				value: freelancerSettings.category.name,
			});
			setValue('description', freelancerSettings.description);
			setValue('price', freelancerSettings.price);
			setValue('education', freelancerSettings.education);
			setValue('experience', freelancerSettings.experience);
			setFile(freelancerSettings.photo);
			setSelected(freelancerSettings.englishLevel);
			const skills = skillsMock.map(skill => ({
				...skill,
				value: freelancerSettings.skills.some(
					(jobSkill: { name: string }) => jobSkill.name === skill.name,
				),
			}));
			setSkillsOptions(skills);
			setSkill(freelancerSettings.skills);
		}
	}, [freelancerSettings]);

	useEffect(() => {
		if (skills.length < 3 && btn && skill && skill?.length < 3) {
			setRedColor(true);
		} else {
			setRedColor(false);
		}
	}, [skills, btn]);

	const onChangePhotoHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			if (typeof reader.result === 'string') {
				setFile(reader.result);
			}
		};
		const newFile = e.target.files && e.target.files[0];
		if (newFile) {
			reader.readAsDataURL(newFile);
		}
	};

	const onSkillsTrue = () => {
		setBtn(true);
	};

	const onPhotoDelete = () => {
		event?.preventDefault();
		setFile(defaultProfilePhoto);
	};

	const handleChangeActive = (e: FormEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement;
		setActive({ [target.id]: target.id });
	};

	const addEducationField = () => {
		event?.preventDefault();
		setEducation(education + 1);
	};

	const addExperienceField = () => {
		event?.preventDefault();
		setExperience(experience + 1);
	};

	const handleChange = (level: string) => {
		setSelected(level);
	};

	const onSubmit = (data: Data) => {
		if (skills.length >= 3 || (skill && skill.length >= 3)) {
			const newData = {
				...data,
				englishLevel: selected,
				userId,
				skills: skill,
				photo: file,
			};
			sendData(newData);
		}
	};

	return (
		<Container>
			<MinColumn>
				<ButtonBlock>
					<Button className={active?.settings ? 'defaultActive' : ''} onClick={handleChangeActive}>
						<span id={settings}>{`${t('FreelancerSettings.profile')}`}</span>
					</Button>
					<Button className={active?.info ? 'defaultActive' : ''} onClick={handleChangeActive}>
						<span id={info}>{`${t('FreelancerSettings.info')}`}</span>
					</Button>
				</ButtonBlock>
			</MinColumn>
			<MaxColumn>
				{isLoading && <ImgSpinner src={Spinner} />}
				{active?.settings === settings && !isLoading && (
					<form onSubmit={handleSubmit(onSubmit)}>
						<MainTitle>
							{`${t('ClientSettings.title')}`}
							{freelancerSettings && (
								<button type="button">
									<Img src={editIcon}></Img>
								</button>
							)}
						</MainTitle>
						<div>
							<Column>
								<Title>{`${t('FreelancerSettings.position')}`}</Title>
								<Input
									type="text"
									{...register('position')}
									className={`form-control ${errors.position ? 'is-invalid' : ''}`}
								/>
								{errors.position && <P>{errors.position?.message}</P>}
								<Title>{`${t('FreelancerSettings.category')}`}</Title>
								<Controller
									name="category"
									control={control}
									render={({ field }) => {
										return (
											<Select
												{...field}
												options={selection}
												className={`${errors.category ? 'is-invalid' : ''}`}
											/>
										);
									}}
								/>
								{errors.category && <P>{errors.category.value?.message}</P>}
								<Title>{`${t('FreelancerSettings.price')}`}</Title>
								<div className="input-group-prepend">
									<span className="input-group-prepend input-group-text">$</span>
									<input
										type="number"
										{...register('price')}
										className={`form-control ${errors.price ? 'is-invalid' : ''}`}
									/>
								</div>
								{errors.price && <P>{`${t('JobPostPage.priceError')}`}</P>}
							</Column>
							<Column>
								<ProfilePhoto>
									<Title>{`${t('ProfileEdit.profilePhotoTitle')}`}</Title>
									<Image width={200} src={file || defaultProfilePhoto} />
									<input type={'file'} accept=".png, .jpg, .jpeg" onChange={onChangePhotoHandler} />
									<button type="button" onClick={onPhotoDelete}>
										{`${t('ProfileEdit.deletePhotoButton')}`}
									</button>
								</ProfilePhoto>
							</Column>
						</div>
						<Title>{`${t('ProfileEdit.englishLevelTitle')}`}</Title>
						<div
							className="btn-group btn-group-toggle flex-wrap"
							role="group"
							data-toggle="buttons"
						>
							<EnglishRadio
								selected={selected}
								handleChange={() => handleChange('Pre_Intermediate')}
								level={'Pre_Intermediate'}
								index={1}
							/>
							<EnglishRadio
								selected={selected}
								handleChange={() => handleChange('Intermediate')}
								level={'Intermediate'}
								index={2}
							/>
							<EnglishRadio
								selected={selected}
								handleChange={() => handleChange('Upper_Intermediate')}
								level={'Upper_Intermediate'}
								index={3}
							/>
						</div>
						<div>
							<Title>{`${t('JobPostPage.skillsTitle')}`}</Title>
							<Span value={redColor}>{`${t('JobPostPage.skillsError')}`}</Span>
							<SkillsButtonsBlock
								data-toggle="buttons"
								className="btn-group btn-group-toggle flex-wrap"
							>
								{optionButtons}
							</SkillsButtonsBlock>
						</div>
						<Title>{`${t('FreelancerSettings.education')}`}</Title>
						{educations.map((item, i) => (
							<div key={i}>
								<Column>
									<TextArea
										{...register(`education.${i}.description`)}
										className={`form-control ${
											errors.education?.[i]?.description ? 'is-invalid' : ''
										}`}
									/>
									{errors.education?.[i]?.description && (
										<P>{errors.education?.[i]?.description?.message}</P>
									)}
								</Column>
								<Column>
									<ContainerDate>
										<DateBlock>
											<Input
												{...register(`education.${i}.startDate`)}
												type="date"
												className={`form-control ${
													errors.education?.[i]?.startDate ? 'is-invalid' : ''
												}`}
											/>
											{errors.education?.[i]?.startDate && (
												<P>{errors.education?.[i]?.startDate?.message}</P>
											)}
										</DateBlock>
										<DateBlock>
											<Input
												{...register(`education.${i}.endDate`)}
												type="date"
												className={`form-control ${
													errors.education?.[i]?.endDate ? 'is-invalid' : ''
												}`}
											/>
											{errors.education?.[i]?.endDate && (
												<P>{errors.education?.[i]?.endDate?.message}</P>
											)}
										</DateBlock>
									</ContainerDate>
								</Column>
							</div>
						))}
						<AddButton type="button" onClick={addEducationField}>
							{`${t('ProfileEdit.addEducationButton')}`}
						</AddButton>
						<Title>{`${t('FreelancerSettings.experience')}`}</Title>
						{experiences.map((item, i) => (
							<div key={i}>
								<Column>
									<TextArea
										{...register(`experience.${i}.description`)}
										className={`${errors.experience?.[i]?.description ? 'is-invalid' : ''}`}
									/>
									{errors.experience?.[i]?.description && (
										<P>{errors.experience?.[i]?.description?.message}</P>
									)}
								</Column>
								<Column>
									<ContainerDate>
										<DateBlock>
											<Input
												type="date"
												{...register(`experience.${i}.startDate`)}
												className={`form-control ${
													errors.experience?.[i]?.startDate ? 'is-invalid' : ''
												}`}
											/>
											{errors.experience?.[i]?.startDate && (
												<P>{errors.experience?.[i]?.startDate?.message}</P>
											)}
										</DateBlock>
										<DateBlock>
											<Input
												type="date"
												{...register(`experience.${i}.endDate`)}
												className={`form-control ${
													errors.experience?.[i]?.endDate ? 'is-invalid' : ''
												}`}
											/>
											{errors.experience?.[i]?.endDate && (
												<P>{errors.experience?.[i]?.endDate?.message}</P>
											)}
										</DateBlock>
									</ContainerDate>
								</Column>
							</div>
						))}
						<AddButton type="button" onClick={addExperienceField}>
							{`${t('ProfileEdit.addExperienceButton')}`}
						</AddButton>
						<Div>
							<Title>{`${t('ClientSettings.description')}`}</Title>
							<TextArea
								{...register('description')}
								className={`${errors.description ? 'is-invalid' : ''}`}
							/>
							{errors.description && <P>{errors.description?.message}</P>}
						</Div>
						<div style={{ display: 'flex' }}>
							<SaveButton type="submit" onClick={onSkillsTrue}>
								{`${t('ClientSettings.save')}`}
							</SaveButton>
						</div>
					</form>
				)}
				{active?.info && <ContactInfo />}
			</MaxColumn>
		</Container>
	);
};

export default FreelancerSettings;
