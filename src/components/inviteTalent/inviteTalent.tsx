import { FC, Suspense, useEffect, useState } from 'react';
import { ReactI18NextChild, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Container, Image, Save, Img, Div, Price, P, DivCenter } from './inviteTalent.styles';
import blackHeartIcon from 'assets/blackHeartIcon.svg';
import whiteHeartIcon from 'assets/whiteHeartIcon.svg';
import { IPost } from 'components/inviteTalent/interfaces';
import {
	useGetPostJobQuery,
	useGetUserProfileQuery,
	useUpdateSingleProfileMutation,
} from 'service/httpService';
import InvitePopup from 'components/inviteTalent/component/Invitepopup';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import { Column, SaveButton } from 'components/clientSettings/clentSettings.styles';
import { JobSkills } from 'components/PostDetailsPage/interfaces';
import { SkillsItem } from 'components/PostDetailsPage/PostDetailPage.styles';

const InviteTalent: FC = () => {
	const { t } = useTranslation();
	const params = Number(useParams().id);
	const [saveBool, setSaveBool] = useState<boolean>(false);
	const [showPopup, setShowPopup] = useState<boolean>(false);
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const {
		user: { id },
	} = useAppSelector<RootState>(state => state);
	const { data: post } = useGetPostJobQuery(id);
	const profile = {
		id: params,
		clientId: id,
	};
	const { data, isLoading } = useGetUserProfileQuery(profile);
	const [userUpdate] = useUpdateSingleProfileMutation();

	const defaultTitle = post?.find((el: IPost) => el.jobTitle);

	const clientInfos = {
		clientId: post?.find((el: IPost) => el.userId)?.userId,
		jobPostId: post?.find((el: IPost) => el.id)?.id,
	};

	const Context = {
		isDisabled,
		setIsDisabled,
		open,
		setOpen,
		post,
		handleSelect,
		data,
		defaultTitle,
		clientInfos,
	};

	useEffect(() => {
		setOpen(true);
	}, []);

	useEffect(() => {
		const getSingleProfile = () => {
			if (isLoading) {
				return <Suspense fallback={<div>{`${t('PostDetailPage.loading')}`}</div>}></Suspense>;
			} else if (data) {
				setSaveBool(data?.status?.saved);
			}
		};
		getSingleProfile();
	}, [data?.status?.saved]);

	const handleSaveClick = async () => {
		if (!saveBool) {
			setSaveBool(true);
		} else {
			setSaveBool(false);
		}
		const userHeartUpdate = await userUpdate({
			id: params,
			saved: !saveBool,
			clientId: id,
		}).unwrap();
		const { saved } = userHeartUpdate;
		if (saved) {
			setSaveBool(!saveBool);
		}
	};

	const handleClick = () => {
		if (!showPopup) {
			setShowPopup(true);
		} else {
			setShowPopup(false);
		}
	};

	function handleSelect(): ReactI18NextChild | Iterable<ReactI18NextChild> {
		return post?.map((el: IPost) => <option>{el.jobTitle}</option>);
	}

	return (
		<Container>
			<div>
				<Image src={data?.profile.photo} />
				<Div>
					<h3>
						{data?.setting?.firstName} {data?.setting?.lastName}
					</h3>
					<h5>{data?.profile.position}</h5>
				</Div>
				<Save onClick={handleSaveClick}>
					<Img src={saveBool ? blackHeartIcon : whiteHeartIcon} />
				</Save>
			</div>
			<div>
				<Column>
					<div>
						<P>{`${t('InvitePage.description')}`}</P> <p>{data?.profile.description}</p>
					</div>
				</Column>
				<Column>
					<div>
						<P>{`${t('InvitePage.price')}`}</P> <Price>{data?.profile.price}$</Price>
					</div>
					<div>
						<P>{`${t('InvitePage.skills')}`}</P>
						{data?.profile.skills.map((item: JobSkills) => {
							return <SkillsItem key={item.id}>{item.name}</SkillsItem>;
						})}
					</div>
				</Column>
			</div>
			<DivCenter>
				<SaveButton type="button" onClick={handleClick}>
					{`${t('InvitePage.button')}`}
				</SaveButton>
			</DivCenter>
			{showPopup ? <InvitePopup Context={Context} /> : null}
		</Container>
	);
};

export default InviteTalent;
