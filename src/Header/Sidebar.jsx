import { Link } from "react-router-dom";
import "./sidebar.css";

export const SideBar = () =>{
    return(
        <ul className="stacked-list padding-around-1rem">
                <li>
                    <Link to="/" className="nav-icon-link btn btn-text-icon-secondary" >
                    <i className="btn-icon padding-0 fas fa-home"></i>
                    <span className="nav-icon-text">Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/explore" className="nav-icon-link btn btn-text-icon-secondary" >
                    <i className="btn-icon padding-0 fas fa-compass"></i>
                    <span className="nav-icon-text">Explore</span>
                    </Link>
                </li>
                <li>
                    <Link to="/explore/playlists" className="nav-icon-link btn btn-text-icon-secondary" >
                    <i className="btn-icon padding-0 fas fa-folder-plus"></i>
                    <span className="nav-icon-text">Playlists</span>
                    </Link>
                </li>
                <li>
                    <Link to="/explore/likes" className="nav-icon-link btn btn-text-icon-secondary" >
                    <i className="btn-icon padding-0 fas fa-thumbs-up"></i>
                    <span className="nav-icon-text">Likes</span>
                    </Link>
                </li>
                <li>
                    <Link to="/explore/watchlater" className="nav-icon-link btn btn-text-icon-secondary" >
                    <i className="btn-icon padding-0 fas fa-bookmark"></i>
                    <span className="nav-icon-text">Watch Later</span>
                    </Link>
                </li>
                <li>
                    <Link to="/explore/history" className="nav-icon-link btn btn-text-icon-secondary" >
                    <i className="btn-icon padding-0 fas fa-clock"></i>
                    <span className="nav-icon-text">History</span>
                    </Link>
                </li>

            </ul>
    )
}