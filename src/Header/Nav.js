import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./nav.css"
import languageChangeSvg  from "./Images/languageChange.svg"
import { useLanguageContext } from "../Context/language-context";

const allLanguages = ["English", "Hindi"];

export const Nav = () => {
    const { language, setLanguage } = useLanguageContext();

    const [ navOpen, setNavOpen ] = useState(false);
    const [ languageDropdownOpen, setLanguageDropdown] = useState(false);
   
    return (
    <nav className= { navOpen ? "nav-bar shadow-box active" : "nav-bar shadow-box" }>
        <div className="nav-section">
            <div className= "burger nav-section-items"
                 onClick={() => setNavOpen((navOpen)=> !navOpen )}> 
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
		
            <div className="nav-logo nav-section-items" id="my-logo">
                <Link to="/" className="link-no-style">
                    <div className="primary-text-color logo-title">U<span className="tertiary-text-color logo-and-symbol-style">&</span>I
                    </div>
                    <div className="tertiary-text-color logo-tagline">LET'S DESIGN TOGETHER</div>
                </Link>
            </div>        
            
            <ul className="nav-bar-links list-style-none nav-section-items">
                <Link to="/" className="link-no-style">
                    <li className="list-inline-item avatar-in-nav-links">
                        <div className="primary-text-color logo-title">
                        U
                        <span className="tertiary-text-color logo-and-symbol-style">
                            &
                        </span>
                        I
                        </div>
                        <div className="tertiary-text-color logo-tagline">
                        LET'S DESIGN TOGETHER
                        </div>
                    </li>
                </Link>

                <li className="list-inline-item">
                    <NavLink end to="/explore" activeClassName="primary-text-color" className="link-no-style">
                        Explore
                    </NavLink>
                </li>

                <li className="list-inline-item">
                    <NavLink to="/explore/playlists" activeClassName="primary-text-color" className="link-no-style">
                        My Playlists
                    </NavLink>
                </li>

                <li className="list-inline-item">
                    <NavLink to="/explore/saved" activeClassName="primary-text-color" className="link-no-style">
                        Watch Later
                    </NavLink>
                </li>

                <li className="list-inline-item">
                    <NavLink to="/explore/history" activeClassName="primary-text-color" className="link-no-style">
                        Learning History
                    </NavLink>
                </li> 

            </ul>

        </div>

        <div className="nav-section search-bar-section">
            
            <label className="search-bar nav-section-item-width50pc">
                <Link to="/search" className="link-no-style">
                    <span className="search-bar-btn" type="submit"><i className="fa fa-search"> </i></span>
                </Link>
                <input className="search-bar-input" type="text" placeholder="Type to search" name="search" />
            </label>
            
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

        </div>
    </nav>)
}