import { useState, useRef, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { VideoDetailsSection } from './VideoDetailsSection';
import { useStateContext } from '../../Context';
import { NotesContainer } from './Notes';
import { addOrRemoveFromPlaylist } from '../utils';
import './video-detail.css';

export const VideoDetailPage = () => {
	const {
		state: { watchHistory },
		dispatch,
	} = useStateContext();
	const [videoDetails, setVideoDetails] = useState(null);
	const navigate = useNavigate();
	const playerRef = useRef(null);
	let { id } = useParams();

	useEffect(() => {
		(async () => {
			try {
				const {
					data: { response },
					status,
				} = await axios.get(`https://uandistoreapi.herokuapp.com/videos/${id}`);
				setVideoDetails(response);
			} catch (error) {
				setVideoDetails('error');
			}
		})();
	}, []);

	return (
		<>
			{videoDetails === 'error' && <Navigate to='/error' replace />}
			{videoDetails !== null && videoDetails !== 'error' && (
				<div className=' display-flex max-width-do-not-stretch'>
					<div className='video-details'>
						<div className='video-container'>
							<ReactPlayer
								ref={playerRef}
								url={`https://www.youtube.com/embed/${videoDetails._id}`}
								controls={true}
								width={'100%'}
								height={'100%'}
								onStart={() => {
									addOrRemoveFromPlaylist({
										playlistId: watchHistory._id,
										dispatch,
										videoId: id,
										type: 'SET_HISTORY',
									});
								}}
							/>
						</div>
						<div className='video-details-section'>
							<VideoDetailsSection video={videoDetails} />
						</div>
					</div>

					<div
						className='notes-section scrollbar-styled scroll-visible-in-mobile'
						id='note-section'>
						<NotesContainer videoId={videoDetails._id} playerRef={playerRef} />
					</div>
				</div>
			)}

			{videoDetails === null && (
				<div className='overlay-text'>
					<Loader type='TailSpin' color='#ff3f6c' height={80} width={80} />
				</div>
			)}
		</>
	);
};
