import { Link } from 'react-router-dom';
import { useStateContext } from '../../../Context';
import './playlists.css';

export const AllPlaylists = () => {
	const { state } = useStateContext();
	return (
		<>
			<h1 className='h3 text-center page-title'>All Playlists</h1>

			<div className='category-list grid-4-column-layout padding-around-1rem'>
				<Link to='/explore/liked' className='link-no-style'>
					<div className='card-vertical card-hover'>
						<div className='overlay-container'>
							<div className='image-container category-list-item-bg'></div>
						</div>
						<div className='overlay-text text-center'>
							<div className='h6'>Liked Videos</div>
						</div>
					</div>
				</Link>
				<Link to='/explore/watchlater' className='link-no-style'>
					<div className='card-vertical card-hover'>
						<div className='overlay-container'>
							<div className='image-container category-list-item-bg'></div>
						</div>
						<div className='overlay-text text-center'>
							<div className='h6'>Saved Videos</div>
						</div>
					</div>
				</Link>
				{state.playlists.map((playlist) => {
					return (
						<Link
							key={playlist._id}
							to={{ pathname: `/explore/playlists/${playlist._id}` }}
							className='link-no-style'>
							<div key={playlist._id} className='card-vertical card-hover'>
								<div className='overlay-container'>
									<div className='image-container category-list-item-bg'></div>
								</div>
								<div className='overlay-text text-center'>
									<div className='h6'>{playlist.title}</div>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</>
	);
};
