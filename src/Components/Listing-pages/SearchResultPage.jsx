import { Link, useLocation } from 'react-router-dom';
import { useStateContext } from '../../Context';
import { VideoCard } from './VideoCards';

export const SearchResultPage = () => {
	const query = new URLSearchParams(useLocation().search);

	const searchTerm = query.get('searchTerm');

	const {
		state: { videos },
	} = useStateContext();

	const filterdData = videos.filter(
		({ name, type }) =>
			name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			type.toLowerCase().includes(searchTerm.toLowerCase()),
	);
	const numberOfItems = filterdData.length;
	return (
		<>
			{numberOfItems !== 0 ? (
				<>
					{/* valid keyword search result page */}
					<h1 className='text-center h6 page-title'>
						Search results for "{searchTerm}"
						<span className='text-light-weight'> - {numberOfItems} items</span>
					</h1>
					<div className='grid-4-column-layout grid-right-of-filter padding-around-1rem'>
						{filterdData.map((video) => {
							return <VideoCard key={video._id} video={video} />;
						})}
					</div>
				</>
			) : (
				<>
					{/* Invalid keyword search reslt page */}
					<div className='text-center'>
						<h1 className='h6 page-title'>
							Oh! No search results for "{searchTerm}"
						</h1>
						<p>Explore other videos</p>
						<Link to='/explore' className='btn btn-solid-primary'>
							Go to Explore
						</Link>
					</div>
				</>
			)}
		</>
	);
};
