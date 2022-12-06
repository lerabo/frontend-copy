import React, { FC, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from 'components/Layout/Layout';
import PrivateRoutes from './hoc/PrivateRoutes';
import './App.css';
import GlobalStyle from 'config/GlobalStyle';
import TalentPage from 'pages/TalentPage';
import SingleProfilePage from 'pages/SingleProfilePage';
import MyContractPage from 'pages/MyContractPage';
import FreelancerSettingsPage from 'pages/freelancerPage';
import ContactInfoPage from 'pages/ContactInfoPage';
import WelcomePage from 'pages/WelcomePage';
import RoleSelection from 'components/RoleSelection/RoleSelection';
import HomePage from 'pages/HomePage';

const SignUp = lazy(() => import('pages/Signup'));

const Cookies = require('js-cookie');

const SignIn = lazy(() => import('pages/SigninPage'));

const JobPostPage = lazy(() => import('pages/JobPostPage'));

const ForgotPassword = lazy(() => import('components/forgotPassword/forgotPassword'));

const RestorePassword = lazy(() => import('components/restorePassword/restorePassword'));
const PostJobPage = lazy(() => import('pages/PostJobPage'));
const JobDescriptionPage = lazy(() => import('pages/JobDescriptionPage'));
const JobDescriptionEditPage = lazy(() => import('pages/JobDescriptionEditPage'));
const ClientSettings = lazy(() => import('pages/ClientSettingsPage'));

const Chat = lazy(() => import('components/chat/chat'));

const App: FC = () => {
	Cookies.set('name', 'value');
	// const a = Cookies.get('accessToken'); // TODO delete mock token when sign up/sign in will be completed
	const token: string | null = localStorage.getItem('token');

	return (
		<>
			<GlobalStyle />
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/" element={<Layout />}>
						{/*here public routes */}
						<Route path="/" element={<HomePage />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						<Route path={'/restore-password/:token'} element={<RestorePassword />} />
						<Route path="/sign-in" element={<SignIn />} />
						<Route path="/sign-up" element={<SignUp />} />
						<Route path="/welcome" element={<WelcomePage />} />
						<Route path="/create-job-post" element={<JobPostPage />} />
						<Route path="/role-selection" element={<RoleSelection />} />
						<Route path="/role-selection/:user" element={<RoleSelection />} />
						<Route path="post-job/:id/edit" element={<JobDescriptionEditPage />} />
						<Route path="post-job/:id" element={<JobDescriptionPage />} />
						<Route path="post-job" element={<PostJobPage />} />
						<Route path="/talent" element={<TalentPage />} />
						<Route path="/freelancer" element={<FreelancerSettingsPage />} />
						<Route path="/chat" element={<Chat />} />
						<Route path="/contracts" element={<MyContractPage />} />
						<Route path="/client-settings" element={<ClientSettings />} />
						<Route path="profile/:id" element={<SingleProfilePage />} />
						<Route path="settings/edit-profile" element={<FreelancerSettingsPage />} />
						<Route path="settings/contact-info" element={<ContactInfoPage />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Route>
					<Route element={<PrivateRoutes token={token} />}>
						{/*here insert your private routes */}
					</Route>
				</Routes>
			</Suspense>
		</>
	);
};

export default App;
