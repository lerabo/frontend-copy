import { FC } from 'react';
import {
	ImageWrapper,
	ImageWrapperBlock,
	ProfileData,
	ProfileImage,
	PhotoWrapper,
	Card,
} from './TalentPageLayout.style';
import { Filter } from './interfaces';
import { t } from 'i18next';
import Profile from 'assets/profile-talent.png';

const FilterProfileUser: FC<{ item: Filter; path: boolean }> = ({ item }) => {
	return (
		<Card>
			<ImageWrapperBlock>
				{item.photo ? (
					<PhotoWrapper>
						<ProfileImage src={item.photo} alt="profile" />
					</PhotoWrapper>
				) : (
					<ImageWrapper>
						<ProfileImage src={Profile} alt="profile" />
					</ImageWrapper>
				)}
			</ImageWrapperBlock>
			<ProfileData>
				<p>
					{item.userId.firstName} {item.userId.lastName}
				</p>
				<p>{item.position}</p>
				{`${t('TalentCompanyPage.rate')} ${item.price}$`}
			</ProfileData>
		</Card>
	);
};

export default FilterProfileUser;
