import { useState } from 'react';
import { useStateContext } from '../../../Context';
import { isAlreadyAdded } from '../../../utils';
import { addOrRemoveFromPlaylist } from '../../utils';
import '../../VideoDetailPage/video-detail.css';

export const ActionButtonsOfVideoCard = ({ video }) => {
	const {
		state: { watchLater, likedVideos },
		dispatch,
	} = useStateContext();

	const [openContainer, setContainer] = useState(false);
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
						onClick={() => {
							addOrRemoveFromPlaylist({
								playlistId: watchLater._id,
								dispatch,
								videoId: video._id,
								type: 'SET_WATCH_LATER',
							});
						}}>
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
							addOrRemoveFromPlaylist({
								playlistId: likedVideos._id,
								dispatch,
								videoId: video._id,
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
