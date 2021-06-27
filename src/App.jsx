import './App.css';
import {
	VideoDetailPage,
	Explore,
	SearchResultPage,
	AllVideos,
	History,
	VideosInPlaylist,
	AllPlaylists,
	LikedVideos,
	WatchLater,
	HomePage,
	Nav,
	Footer,
	ForgotPasswordPage,
	Login,
	PrivateRoute,
	Profile,
	ProfilePage,
	Settings,
	SignUp,
	ErrorPage,
} from './Components';

import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useAuthentication, useStateContext } from './Context';
import { API_URL } from './utils';
import { setupAuthenticationErrorHandler } from './Context/AuthenticationContext/utils/setupAthenticationErrorHandler';

export function App() {
	const { dispatch } = useStateContext();

	const navigate = useNavigate();

	const {
		state: { token },
		logOutUser,
	} = useAuthentication();

	useEffect(() => {
		setupAuthenticationErrorHandler(logOutUser, navigate);
	}, []);

	useEffect(() => {
		(async () => {
			try {
				const {
					data: { response },
				} = await axios.get(`${API_URL}/videos`);

				dispatch({ type: 'SET_VIDEOS', payload: response });
			} catch (error) {
				console.log(error);
				toast.error('Please refresh the page!');
			}
		})();
	}, []);

	useEffect(() => {
		if (token) {
			(async () => {
				try {
					const {
						data: {
							response: {
								customPlaylist,
								watchlaterPlaylist,
								likedPlaylist,
								historyPlaylist,
							},
						},
					} = await axios({
						url: `${API_URL}/playlists`,
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					dispatch({ type: 'SET_PLAYLISTS', payload: customPlaylist });
					dispatch({ type: 'SET_WATCH_LATER', payload: watchlaterPlaylist });
					dispatch({ type: 'SET_LIKED_VIDEOS', payload: likedPlaylist });
					dispatch({ type: 'SET_HISTORY', payload: historyPlaylist });
				} catch (error) {
					console.log(error);
					toast.error('Please refresh the page!');
				}
			})();
		}
	}, [token]);

	return (
		<div className='App page-grid-layout'>
			<div className='grid-item-nav'>
				<Nav />
			</div>
			<ToastContainer />

			<div className='app-container grid-item-main'>
				<Routes>
					<Route path='/' element={<HomePage />} />

					<Route path='/explore' element={<Explore />}>
						<Route path='/' element={<AllVideos />} />

						<PrivateRoute path='/playlists' element={<AllPlaylists />} />
						<PrivateRoute
							path='/playlists/:playlistId'
							element={<VideosInPlaylist />}
						/>
						<PrivateRoute path='/watchlater' element={<WatchLater />} />
						<PrivateRoute path='/history' element={<History />} />
						<PrivateRoute path='/liked' element={<LikedVideos />} />
					</Route>

					<Route path='/search' element={<SearchResultPage />} />

					<PrivateRoute path='/profile' element={<ProfilePage />}>
						<Route path='/' element={<Profile />} />
						<Route path='/settings' element={<Settings />} />
					</PrivateRoute>

					<Route path='/explore/:id' element={<VideoDetailPage />} />

					<Route path='/login' element={<Login />} />
					<Route path='/forgot' element={<ForgotPasswordPage />} />
					<Route path='/signup' element={<SignUp />} />

					<Route path='*' element={<ErrorPage />} />
					<Route path='/error' element={<ErrorPage />} />
				</Routes>
			</div>

			<Footer />
		</div>
	);
}
