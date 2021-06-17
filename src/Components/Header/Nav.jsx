import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthentication } from '../../Context';
import './css/nav.css';
import { SearchBar } from './SearchBar';

const navItems = [
	{
		item: 'Home',
		link: '/',
		icon: <i className='nav-icon fas fa-home'></i>,
		hideInDesktop: true,
	},
	{
		item: 'Explore',
		link: '/explore',
		icon: <i className='nav-icon hide-in-desktop fas fa-compass'></i>,
	},
	{
		item: 'Playlist',
		link: '/explore/playlists',
		icon: <i className='nav-icon hide-in-desktop fas fa-folder-plus'></i>,
	},
	{
		item: 'Likes',
		link: '/explore/liked',
		hideInDesktop: true,
		icon: <i className='nav-icon hide-in-desktop fas fa-thumbs-up'></i>,
	},
	{
		item: 'Watch Later',
		link: '/explore/watchlater',
		hideInDesktop: true,
		icon: <i className='nav-icon hide-in-desktop fas fa-bookmark'></i>,
	},
	{
		item: 'History',
		link: '/explore/history',
		hideInDesktop: true,
		icon: <i className='nav-icon hide-in-desktop fas fa-clock'></i>,
	},
];

export const Nav = () => {
	const [navOpen, setNavOpen] = useState(false);

	const {
		state: { userName },
	} = useAuthentication();

	return (
		<nav
			className={navOpen ? 'nav-bar shadow-box active' : 'nav-bar shadow-box'}>
			<div className='nav-section'>
				<div
					className='burger nav-section-items'
					onClick={() => setNavOpen((navOpen) => !navOpen)}>
					<div className='line1'></div>
					<div className='line2'></div>
					<div className='line3'></div>
				</div>

				<div className='nav-logo nav-section-items' id='my-logo'>
					<Link to='/' className='link-no-style'>
						<div className='primary-text-color logo-title'>
							U
							<span className='tertiary-text-color logo-and-symbol-style'>
								&
							</span>
							I
						</div>
						<div className='tertiary-text-color logo-tagline'>
							LET'S DESIGN TOGETHER
						</div>
					</Link>
				</div>

				<div className='nav-logo-title'>
					<Link to='/' className='link-no-style' href='/index.html'>
						<span className='primary-text-color logo-title'>
							U
							<span className='tertiary-text-color logo-and-symbol-style'>
								&
							</span>
							I
						</span>
					</Link>
				</div>

				<ul className='nav-bar-links list-style-none nav-section-items'>
					<li className='list-inline-item avatar-in-nav-links'>
						<Link
							to='/profile'
							className='nav-icon-link link-no-style avatar avatar-sm-size text-center'>
							<span className='nav-icon'>
								<i className='fas fa-user'></i>
							</span>
						</Link>
					</li>

					{navItems.map(({ item, link, hideInDesktop, icon }) => {
						return (
							<li
								key={item}
								className={`list-inline-item ${
									hideInDesktop ? 'hide-in-desktop' : ''
								}`}>
								<NavLink
									to={link}
									end
									activeClassName='primary-text-color'
									className='link-no-style'>
									<span className='padding-right-1rem-in-mobile'>{icon}</span>
									<span>{item}</span>
								</NavLink>
							</li>
						);
					})}
				</ul>
			</div>

			<div className='nav-section search-bar-section'>
				<SearchBar />

				<ul className='nav-icons list-style-none padding-left-1rem hide-in-mobile'>
					<li className='list-inline-item hide-profile-mobile'>
						<Link to='/profile' className='nav-icon-link link-no-style'>
							<span className='nav-icon'>
								<i className='fas fa-user'></i>
							</span>
							<span className='nav-icon-text space-no-wrap'>
								{userName ? `Hi, ${userName}` : 'Login'}
							</span>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};
