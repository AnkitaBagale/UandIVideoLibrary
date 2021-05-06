import { Link } from 'react-router-dom';
import '../styles.css';
import { ActionButtonsOfVideoCard } from './ActionButtonsOfVideoCard';

export const VideoCard = ({ video }) => {
	return (
		<div>
			<div className='card-vertical'>
				<Link
					to={`/explore/${video._id}`}
					className='image-container link-no-style'>
					<img
						className='img-responsive card-img'
						src={video.thumbnail}
						alt={video.name}
					/>
				</Link>
				<div className='video-info'>
					<Link to={`/explore/${video._id}`} className='link-no-style'>
						<img
							className='avatar avatar-xs-size'
							src={video.tutorId.avatar}
							alt='video'
						/>
					</Link>

					<Link
						to={`/explore/${video._id}`}
						className='link-no-style text-container'>
						<div className='text-container-title'>
							<h6 className='body-cp-rg'>{video.name}</h6>
						</div>
						<div className='text-container-desc'>
							<p className='body-cp-md secondary-text-color text-light-weight'>
								{video.tutorId.name}
							</p>
							<p className='body-cp-md secondary-text-color text-light-weight display-flex'>
								{video.type}
								<span className='badge-dot-to-separate'>&#8226;</span>
								{video.level}
							</p>
						</div>
					</Link>

					<ActionButtonsOfVideoCard video={video} />
				</div>
			</div>
		</div>
	);
};
