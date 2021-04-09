
import { useStateContext } from "../Context";
import { Link, useParams, Outlet } from "react-router-dom";
import "./playlists.css";
import { VideoCardHorizontal } from "./Video-card-horizontal";


export const PlaylistMainContent = ()=>{
    const {playlistId} = useParams();
    const { state } = useStateContext();
    console.log(playlistId)
    
    const {title, videoList} = state.playlists.find((playlist) => playlist.id === (playlistId) )
    
    return(
        <>
        <h1 className="h3 text-center margin-top-3rem">{title}</h1>
        <ul className="stacked-list">
            {videoList.map((video)=>
               <li key="video.id">
                   <Link className="link-no-style" to={`/explore/${video.id}`}>
                        <VideoCardHorizontal video = {video} />
                   </Link>
               </li>
            )}
        </ul>
        </>

    )
}

export const AllPlaylistContent = ()=>{
    const {state} = useStateContext();
    return (
        <>
        <h1 className="h3 text-center margin-top-3rem">All Playlists</h1>

         <div className="category-list grid-4-column-layout padding-around-1rem">
            <Link to="/explore/likes" className="link-no-style">
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
            <Link to="/explore/saved" className="link-no-style">
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
                        <Link to={{pathname:`/explore/playlists/${playlist.id}`}} className="link-no-style">
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