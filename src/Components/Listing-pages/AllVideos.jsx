import { useLocation, Link } from 'react-router-dom';
import { useStateContext } from '../../Context';
import { VideoCard } from './VideoCards';
import { types } from '../../database';
import './styles.css';
import Loader from 'react-loader-spinner';

export const AllVideos = () => {
	const { state } = useStateContext();

	const query = new URLSearchParams(useLocation().search);

	const searchQuery = query.get('type') ? query.get('type') : 'All';

	return (
		<>
			<div className='CTA-Container padding-around-1rem'>
				{types?.map((type) => (
					<Link
						to={{ search: `?type=${encodeURI(type)}` }}
						className={`btn btn-outline-primary btn-rounded-corners ${
							searchQuery === type && 'category-link-active'
						}`}
						key={type}>
						{type}
					</Link>
				))}
			</div>

			{state?.videos?.length !== 0 ? (
				<div className='grid-4-column-layout grid-right-of-filter padding-around-1rem'>
					{searchQuery === 'All'
						? state?.videos?.map((video) => (
								<VideoCard key={video._id} video={video} />
						  ))
						: state?.videos
								.filter((item) => item.type === searchQuery)
								.map((video) => <VideoCard key={video._id} video={video} />)}
				</div>
			) : (
				<div className='overlay-text'>
					<Loader type='TailSpin' color='#ff3f6c' height={80} width={80} />
				</div>
			)}
		</>
	);
};
