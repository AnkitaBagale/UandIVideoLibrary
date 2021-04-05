import { useState } from "react";
import { useStateContext } from "../Context";
import { Link, Route, useParams, Routes, Outlet } from "react-router-dom";
import "./playlists.css";
import { VideoCardHorizontal } from "./Video-card-horizontal";


export const Playlists = () =>{
    const { state, dispatch } =  useStateContext();
    const [ sidebarOpen, setSidebarOpen ] = useState(false);

    return (
        <div className="grid-30-70-layout playlists-container">
            
            <div className={ sidebarOpen ? "sidebar sidebar-active" :"sidebar" } >  
                <div className="nav-bar-opening-button" onClick={()=> setSidebarOpen((flag)=>!flag)}>      
                    <h2 className="h5 nav-title">My Playlists</h2>
                    <span className="sidebar-arrow"><i className="fas fa-chevron-down"></i></span>
                </div>
            
                <ul className="nav-links">
                    <li className="nav-link-item">
                        <Link to={{pathname:"/playlists"}} className="link-no-style">All</Link>
                    </li>
                    {
                        state.playlists.map((playlist)=>{
                            return <li key={playlist.id} className="nav-link-item">
                                        <Link to={{pathname:`${playlist.id}`}} className="link-no-style">{playlist.title}</Link>
                                    </li>
                        })
                    }  
                </ul>
            </div> 
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    )
}


export const PlaylistMainContent = ()=>{
    const {playlistId} = useParams();
    const { state } = useStateContext();
    console.log(playlistId)
    
    const {title, videoList} = state.playlists.find((playlist) => playlist.id === Number(playlistId) )
    
    return(
        <>
        <h1>{title}</h1>
        <ul className="stacked-list">
            {videoList.map((video)=>
               <li key="video.id">
                   <Link className="link-no-style" to={`/search/${video.id}`}>
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
        <h1>All Playlists</h1>
        
        <ul className="stacked-list">
            { state.playlists.map((playlist) => 
                 playlist.videoList.map((video) => 
                (<li key="video.id">
                    <Link className="link-no-style" to={`/search/${video.id}`}>
                        <VideoCardHorizontal video = {video} />
                    </Link>
                </li>)
            ) )
            }
        
        </ul>
        </>
    )
}