import { Link } from "react-router-dom";
import { useStateContext } from "../../../Context";
import "./playlists.css";

export const AllPlaylists = ()=>{
    const {state} = useStateContext();
    return (
        <>
        <h1 className="h3 text-center margin-top-3rem">All Playlists</h1>

         <div className="category-list grid-4-column-layout padding-around-1rem">
            <Link to="/explore/liked" className="link-no-style">
                <div className="card-vertical card-hover">
                    <div className="overlay-container">
                        <div className="image-container category-list-item-bg">                    
                        </div>
                    </div>
                    <div className="overlay-text text-center">
                        <div className="h6">Liked Videos</div>
                    </div>
                </div>
            </Link>
            <Link to="/explore/watchlater" className="link-no-style">
                <div className="card-vertical card-hover">
                    <div className="overlay-container">
                        <div className="image-container category-list-item-bg">                    
                        </div>
                    </div>
                    <div className="overlay-text text-center">
                        <div className="h6">Saved Videos</div>
                    </div>
                </div>
            </Link>
                {
                    state.playlists.map((playlist)=>{    
                    return (
                        <Link key={playlist.id} to={{pathname:`/explore/playlists/${playlist.id}`}} className="link-no-style">
                        <div
                        key={playlist.id}
                        className="card-vertical card-hover"
                        >
                        <div className="overlay-container">
                            <div className="image-container category-list-item-bg">                    
                            </div>
                        </div>
                        <div className="overlay-text text-center">
                            <div className="h6">{playlist.title}</div>
                        </div>
                        </div>
                        </Link>)
                    
                    })
                }
            </div>
        </>
    )
}