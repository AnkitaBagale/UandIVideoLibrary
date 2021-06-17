import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useAuthentication, useStateContext } from '../../../Context';
import {
	addOrRemoveFromPlaylist,
	updatePlaylistInformation,
} from '../../utils';
import { deleteEntirePlaylist } from '../../utils/server-requests';
import { VideoCardHorizontal } from '../VideoCards';
import { AllPlaylists } from './AllPlaylists';
import './playlists.css';

export const VideosInPlaylist = () => {
	const { playlistId } = useParams();
	const { state, dispatch } = useStateContext();
	const [isEditMode, setEditMode] = useState(false);

	const playlist = state.playlists.find(
		(playlist) => playlist._id === playlistId,
	);

	const [playlistTitle, setPlaylistTitle] = useState(playlist?.title);
	const {
		state: { token },
	} = useAuthentication();

	const playlistTitleUpdateForm = (
		<div>
			<input
				className='form-field h5'
				value={playlistTitle}
				onChange={(e) => {
					setPlaylistTitle(e.target.value);
				}}
			/>
			<div className='CTA-Container padding-bottom-1rem'>
				<button
					className='btn btn-solid-primary margin-0'
					onClick={() => {
						updatePlaylistInformation({
							playlistId,
							dispatch,
							title: playlistTitle,
							token,
						});
						setEditMode(false);
					}}>
					Save
				</button>

				<button
					className='btn btn-outline-primary margin-0'
					onClick={() => {
						setPlaylistTitle(playlist.title);
						setEditMode(false);
					}}>
					Discard
				</button>
			</div>
		</div>
	);

	return (
		<>
			{playlist ? (
				<div className='grid-30-70-layout margin-auto margin-top-3rem'>
					<div className='plyalist-details-container'>
						<img
							className='img-responsive'
							src='https://i.postimg.cc/TwsBcV04/jess-bailey-l3-N9-Q27z-ULw-unsplash.jpg'
							alt='playlist'
						/>

						<div className='text-container'>
							{isEditMode ? (
								playlistTitleUpdateForm
							) : (
								<h2 className='h5 padding-top-1rem'>{playlist.title}</h2>
							)}

							<p>{playlist.videoList.length} videos</p>

							<div className='CTA-Container'>
								<button
									className='btn btn-icon-primary padding-0 margin-0 btn-sm-size'
									onClick={() => {
										setEditMode(true);
									}}>
									<i className='fas fa-pencil-alt btn-icon'></i>
								</button>

								<button
									className='btn btn-icon-secondary margin-0 btn-sm-size'
									onClick={() =>
										deleteEntirePlaylist({ dispatch, playlistId, token })
									}>
									<i className='fas fa-trash-alt btn-icon'></i>
								</button>
							</div>
						</div>
						<div className='filter-divider-line hide-in-desktop'></div>
					</div>
					<ul className='stacked-list padding-around-1rem scrollbar-styled height-90vh'>
						{playlist.videoList.length === 0 ? (
							<div className='p text-center text-regular-weight'>
								No videos added to the playlist
							</div>
						) : (
							playlist.videoList.map(({ videoId: video, date }) => (
								<li
									key={video._id}
									className='badge-container'
									style={{ width: '100%' }}>
									<Link className='link-no-style' to={`/explore/${video._id}`}>
										<VideoCardHorizontal video={{ ...video, date }} />
									</Link>
									<button
										onClick={() =>
											addOrRemoveFromPlaylist({
												playlistId: playlistId,
												dispatch,
												videoId: video._id,
												type: 'UPDATE_PLAYLIST',
												token,
											})
										}
										className='btn btn-icon-secondary margin-0 btn-sm-size badge-btn'>
										<i className='fas fa-trash-alt btn-icon'></i>
									</button>
								</li>
							))
						)}
					</ul>
				</div>
			) : (
				<Navigate replace to='/explore/playlists' element={<AllPlaylists />} />
			)}
		</>
	);
};
