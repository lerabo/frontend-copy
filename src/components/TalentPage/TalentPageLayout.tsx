import React, { FC, FormEvent, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import {
	Wrapper,
	Title,
	MainBlockWrapper,
	Label,
	WrapperSidePanel,
	InputContainer,
	ProfileBlock,
	PaginationBlock,
	StyledLink,
} from './TalentPageLayout.style';
import Search from 'components/freelancerJobs/components/search';
import { ISkill } from 'components/jobPost/interfaces';
import { skillsMock } from 'components/jobPost/dataChanges';
import { Filter, ICategoryBE } from './interfaces';
import Select from 'react-select';
import { selection } from 'components/jobPost/dataChanges';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { BsArrowRightCircle } from 'react-icons/bs';
import MySavedTalent from './mysaved/MySavedTalent';
import FilterProfileUser from './FilterProfileUser';
import { useGetFilterProfileQuery } from 'service/httpService';
import Pagination from './Pagination';
import Skills from 'components/freelancerJobs/components/skills';
import { Button, ButtonBlock } from 'components/clientSettings/clentSettings.styles';
const discover = 'discover';
const saved = 'save';

const TalentPageLayout: FC = () => {
	const { t } = useTranslation();
	const [skillsOption, setSkillsOptions] = useState<ISkill[]>(skillsMock);
	const [select, setSelect] = useState<ICategoryBE>();
	const [search, setSearch] = useState<string>('');
	const [showFilterList, setShowFilterList] = useState<boolean>(true);
	const [active, setActive] = useState<{ [name: string]: string }>({ ['discover']: 'discover' });
	const [currentPage, setCurrentPage] = useState<number>(1);
	const paginate = (pageNumber: React.SetStateAction<number>) => setCurrentPage(pageNumber);

	function useMediaQuery(query: string, defaultMatches = window.matchMedia(query).matches) {
		const [matches, setMatches] = useState(window.matchMedia(defaultMatches.toString()).matches);

		useEffect(() => {
			const media = window.matchMedia(query);

			if (media.matches !== matches) setMatches(media.matches);

			const listener = () => setMatches(media.matches);

			media.addEventListener('change', listener);

			return () => media.removeEventListener('change', listener);
		}, [query, matches]);
		return matches;
	}
	const matchesQuery = useMediaQuery('(min-width: 1017px)');

	const filteredSkills = useMemo(() => skillsOption.filter((s) => s.value), [skillsOption]);
	const userSkills = useMemo(() => filteredSkills.map((s) => s.name), [filteredSkills]);

	const optionButtons = useMemo(() => {
		return skillsOption.map((e, i) => (
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
	}, [skillsOption]);

	const onSkillsChange = (index: number) => {
		setSkillsOptions((prevState) => {
			return prevState.map((e, i) => {
				if (index === i) {
					return { ...e, value: !e.value };
				}
				return e;
			});
		});
	};

	function getFilterList() {
		setShowFilterList(!showFilterList);
	}

	const handleChangeActive = (e: FormEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement;
		setActive({ [target.id]: target.id });
	};

	const sendFilter = {
		select: select?.name,
		skills: userSkills.toString(),
		search: search,
		page: currentPage,
	};
	const { data, isLoading } = useGetFilterProfileQuery(sendFilter);

	return (
		<div>
			<MainBlockWrapper>
				{(!showFilterList || matchesQuery) && (
					<WrapperSidePanel>
						<ButtonBlock>
							<Button
								className={active?.discover ? 'defaultActive' : ''}
								onClick={handleChangeActive}
							>
								<span id={discover}>{`${t('TalentCompanyPage.discover')}`}</span>
							</Button>
							<Button className={active?.save ? 'defaultActive' : ''} onClick={handleChangeActive}>
								<span id={saved}> {`${t('TalentCompanyPage.saved')}`}</span>
							</Button>
						</ButtonBlock>
						{active?.discover === discover && (
							<>
								<Title className="filterTitle">
									{`${t('TalentCompanyPage.filter')}`}{' '}
									<span>
										<BsArrowRightCircle className="arrowRight w-40 h-40" onClick={getFilterList} />
									</span>
								</Title>
								<Select
									options={selection}
									placeholder="Categories"
									onChange={(select) => select && setSelect({ name: select.label })}
								/>
								<Skills optionButtons={optionButtons} />
							</>
						)}
					</WrapperSidePanel>
				)}
				{(showFilterList || matchesQuery) && active?.discover === discover && (
					<Wrapper>
						<div>
							<Title>
								<span>
									<BsArrowLeftCircle className="arrowRight w-40 h-40" onClick={getFilterList} />
								</span>
								{`${t('TalentCompanyPage.title')}`}
							</Title>
						</div>
						<InputContainer>
							<Search
								search={search}
								setSearch={setSearch}
								placeholder={`${t('TalentCompanyPage.discover')}`}
							/>
						</InputContainer>
						{active?.discover === discover && data?.profile && !isLoading ? (
							<PaginationBlock>
								<ProfileBlock>
									{data?.profile &&
										data?.profile.map((item: Filter) => {
											return (
												<StyledLink to={{ pathname: `/profile/${item.id}` }}>
													<FilterProfileUser item={item} path={true} />
												</StyledLink>
											);
										})}
								</ProfileBlock>
								<Pagination filterPerPage={data.limit} total={data.total} paginate={paginate} />
							</PaginationBlock>
						) : (
							<Suspense fallback={<div>{`${t('PostDetailPage.loading')}`}</div>}></Suspense>
						)}
					</Wrapper>
				)}
				{active?.save === saved && (
					<Wrapper>
						<MySavedTalent />
					</Wrapper>
				)}
			</MainBlockWrapper>
		</div>
	);
};

export default TalentPageLayout;
