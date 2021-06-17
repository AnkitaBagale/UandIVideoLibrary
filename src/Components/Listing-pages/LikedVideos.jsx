import { Link } from 'react-router-dom';
import { useAuthentication, useStateContext } from '../../Context';
import { addOrRemoveFromPlaylist } from '../utils';
import { VideoCardHorizontal } from './VideoCards';

export const LikedVideos = () => {
	const {
		state: { likedVideos },
		dispatch,
	} = useStateContext();
	const {
		state: { token },
	} = useAuthentication();

	return (
		<>
			<div className='grid-30-70-layout margin-auto margin-top-3rem'>
				<div className='plyalist-details-container'>
					<img
						className='img-responsive'
						src='https://i.postimg.cc/TwsBcV04/jess-bailey-l3-N9-Q27z-ULw-unsplash.jpg'
						alt='likedVideos'
					/>
					<div className='text-container'>
						<h2 className='h5 padding-top-1rem'>Liked Videos</h2>
						<p>{likedVideos.videoList.length} videos</p>
					</div>
					<div className='filter-divider-line hide-in-desktop'></div>
				</div>
				<ul className='stacked-list padding-around-1rem scrollbar-styled height-90vh'>
					{likedVideos.videoList.length === 0 ? (
						<li className='text-center p text-regular-weight'>
							No liked videos
						</li>
					) : (
						likedVideos.videoList.map(({ videoId: video, date }) => (
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
											playlistId: likedVideos._id,
											dispatch,
											videoId: video._id,
											type: '	',
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
		</>
	);
};
