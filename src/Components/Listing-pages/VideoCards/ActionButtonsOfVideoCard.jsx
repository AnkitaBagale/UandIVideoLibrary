import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthentication, useStateContext } from '../../../Context';
import { isAlreadyAdded } from '../../../utils';
import { addOrRemoveFromPlaylist } from '../../utils';
import '../../VideoDetailPage/video-detail.css';

const toastOptions = { autoClose: 2000, className: 'toast toast-inform' };

export const ActionButtonsOfVideoCard = ({ video }) => {
	const {
		state: { watchLater, likedVideos },
		dispatch,
	} = useStateContext();

	const { isUserLoggedIn } = useAuthentication();

	const [openContainer, setContainer] = useState(false);

	const addOrRemoveVideo = ({ playlistId, type }) => {
		if (isUserLoggedIn) {
			addOrRemoveFromPlaylist({
				playlistId,
				dispatch,
				videoId: video._id,
				type,
			});
		} else {
			toast.info('Sign up to proceed !', toastOptions);
		}
	};
	return (
		<div className='action-buttons-cta-container'>
			<button
				className='link-no-style more-options-button'
				onClick={() => setContainer(!openContainer)}>
				<i className='fas fa-ellipsis-v'></i>
			</button>

			{openContainer && (
				<div className='playlist-container scroll-bar-styled shadow-box'>
					<button
						className='btn btn-text-icon-secondary'
						onClick={() =>
							addOrRemoveVideo({
								playlistId: watchLater._id,
								type: 'SET_WATCH_LATER',
							})
						}>
						<i
							className={
								isAlreadyAdded(watchLater.videoList, video._id)
									? 'fas fa-check-circle btn-icon'
									: 'fas fa-plus-circle btn-icon'
							}></i>
						Watch Later
					</button>
					<button
						className='btn btn-text-icon-secondary'
						onClick={() =>
							addOrRemoveVideo({
								playlistId: likedVideos._id,
								type: 'SET_LIKED_VIDEOS',
							})
						}>
						<i
							className={
								isAlreadyAdded(likedVideos.videoList, video._id)
									? 'fas fa-check-circle btn-icon'
									: 'fas fa-plus-circle btn-icon'
							}></i>
						Liked Videos
					</button>
				</div>
			)}
		</div>
	);
};
