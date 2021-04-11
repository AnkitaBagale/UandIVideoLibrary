
import { useStateContext } from "../Context";
import { Link, useParams, Navigate } from "react-router-dom";
import "./playlists.css";
import { VideoCardHorizontal } from "./Video-card-horizontal";
import { useState } from "react";


export const PlaylistMainContent = ()=>{
    const {playlistId} = useParams();
    const { state, dispatch } = useStateContext();
    const [ isEditMode, setEditMode ] = useState(false);
    
    const playlist = state.playlists.find((playlist) => playlist.id === (playlistId) )
    const [ playlistTitle, setPlaylistTitle ] = useState(playlist?.title);

    const playlistTitleUpdateForm = (
    <div>
        <input className="form-field h5" value={playlistTitle} onChange={(e)=>{setPlaylistTitle(e.target.value)}} />
        <div className="CTA-Container padding-bottom-1rem">
            
            <button className="btn btn-solid-primary margin-0" 
            onClick={()=>
                { dispatch({type:"UPDATE_PLAYLIST", payload: {...playlist, title: playlistTitle}});

                setEditMode(false)}
                }  >Save</button>
            
            <button className="btn btn-outline-primary margin-0" onClick={()=>{ setPlaylistTitle(playlist.title); setEditMode(false)}}  >Discard</button>
        </div>
    </div>)

    return(
        <>
       {playlist ? 
        (<div className="grid-50-50-layout padding-around-1rem margin-auto margin-top-3rem">
            <div className="padding-left-1rem  padding-right-1rem">

                <img className="img-responsive" src="https://i.postimg.cc/TwsBcV04/jess-bailey-l3-N9-Q27z-ULw-unsplash.jpg"  alt="playlist" />
                
                <div className="text-container">
                    {isEditMode
                        ? playlistTitleUpdateForm
                        : <h2 className="h4 padding-top-1rem">{playlist.title}</h2>
                    }

                    <p>{playlist.videoList.length} videos</p>

                    <div className="CTA-Container">
                        
                        <button className="btn btn-icon-primary padding-0 margin-0 btn-sm-size" 
                        onClick={()=>{ setEditMode(true) }}>
                            <i className="fas fa-pencil-alt btn-icon"></i>
                        </button>
                        
                        <button className="btn btn-icon-secondary margin-0 btn-sm-size" 
                        onClick={()=>{ dispatch({type:"DELETE_PLAYLIST", payload: playlist.id}) }}>
                            <i className="fas fa-trash-alt btn-icon"></i>
                        </button>

                    </div>
                </div>
                <div className="filter-divider-line hide-in-desktop"></div>

            </div>
            <ul className="stacked-list padding-around-1rem scrollbar-styled height-90vh">
                {playlist.videoList.length===0
                ? (<div className="p text-center text-regular-weight">No videos added to the playlist</div>)    
                : playlist.videoList.map((video)=>
                <li key="video.id" className="badge-container" style={{width:"100%"}}>
                    <Link className="link-no-style" to={`/explore/${video.id}`}>
                            <VideoCardHorizontal video = {video} />
                    </Link>
                    <button onClick={()=>{ 
                        dispatch({type:"ADD_OR_REMOVE_TO_PLAYLIST", payload:  {playlistId: playlist.id, video}}) }} 
                        className="btn btn-icon-secondary margin-0 btn-sm-size badge-btn">
                        <i className="fas fa-trash-alt btn-icon"></i>
                    </button>
                </li>)
                }
            </ul>
        </div>)
        : <Navigate replace to="/explore/playlists" element={<AllPlaylistContent/>} />
        }
        
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