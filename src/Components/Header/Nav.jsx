import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthentication } from '../../Context';
import './css/nav.css';
import { SearchBar } from './SearchBar';

export const Nav = () => {
	const [navOpen, setNavOpen] = useState(false);

	const { username } = useAuthentication();

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

					<li className='list-inline-item hide-in-desktop'>
						<NavLink
							to='/explore'
							end
							activeClassName='primary-text-color'
							className='link-no-style'>
							<span className='padding-right-1rem-in-mobile'>
								<i className='nav-icon fas fa-home'></i>
							</span>
							<span>Home</span>
						</NavLink>
					</li>

					<li className='list-inline-item'>
						<NavLink
							to='/explore'
							end
							activeClassName='primary-text-color'
							className='link-no-style'>
							<span className='padding-right-1rem-in-mobile'>
								<i className='nav-icon hide-in-desktop fas fa-compass'></i>
							</span>
							<span>Explore</span>
						</NavLink>
					</li>
					<li className='list-inline-item'>
						<NavLink
							to='/explore/playlists'
							activeClassName='primary-text-color'
							className='link-no-style'>
							<span className='padding-right-1rem-in-mobile'>
								<i className='nav-icon hide-in-desktop fas fa-folder-plus'></i>
							</span>
							<span>Playlists</span>
						</NavLink>
					</li>
					<li className='list-inline-item'>
						<NavLink
							to='/explore/liked'
							activeClassName='primary-text-color'
							className='link-no-style'>
							<span className='padding-right-1rem-in-mobile'>
								<i className='nav-icon hide-in-desktop fas fa-thumbs-up'></i>
							</span>
							<span>Likes</span>
						</NavLink>
					</li>
					<li className='list-inline-item'>
						<NavLink
							to='/explore/watchlater'
							activeClassName='primary-text-color'
							className='link-no-style'>
							<span className='padding-right-1rem-in-mobile'>
								<i className='nav-icon hide-in-desktop fas fa-bookmark'></i>
							</span>
							<span>Watch Later</span>
						</NavLink>
					</li>
					<li className='list-inline-item'>
						<NavLink
							to='/explore/history'
							activeClassName='primary-text-color'
							className='link-no-style'>
							<span className='padding-right-1rem-in-mobile'>
								<i className='nav-icon hide-in-desktop fas fa-clock'></i>
							</span>
							<span>History</span>
						</NavLink>
					</li>
				</ul>
			</div>

			<div className='nav-section search-bar-section'>
				<SearchBar />

				<ul className='nav-icons list-style-none nav-section-item-width50pc hide-in-mobile'>
					<li className='list-inline-item hide-profile-mobile'>
						<Link to='/profile' className='nav-icon-link link-no-style'>
							<span className='nav-icon'>
								<i className='fas fa-user'></i>
							</span>
							<span className='nav-icon-text'>
								{username ? `Hi, ${username}` : 'Login'}
							</span>
						</Link>
					</li>
					{/* Keeping this commented to use it after language context feat is done
          <li>
              <button className="language-icon link-no-style dropdown-list-container" onClick={()=>{setLanguageDropdown(flag=>!flag)}}>
                <img src={languageChangeSvg} alt="change language" />
                <span className="dropdown-list" style={{display: languageDropdownOpen?"block":"none"}}> 
                    <ul className="list-style-none text-left">
                        {
                            allLanguages.map((lang) => 
                            <li key={lang} className={language===lang?"dropdown-item primary-text-color":"dropdown-item"} 
                                            onClick={()=>{
                                                setLanguage(lang);
                                            }}>
                            {lang}
                            </li>)
                        }
                    </ul>

                </span>
                </button>
        </li> */}
				</ul>
			</div>
		</nav>
	);
};
