import { useState } from "react";
import { isAlreadyAdded } from "../../utils";
import {AddToPlaylistContainer} from "./AddToPlaylistContainer";
import { useStateContext } from "../../Context";
import { addOrRemoveFromPlaylist } from "../utils";


export const VideoDetailsSection = ({video}) =>{
    const { state, dispatch } = useStateContext();
    const [ addToPlaylist, setAddtoPlaylist ] = useState(false);
    
    return (
        <>
            <div className="text-container">

                <p className="body-cp-md primary-text-color">#{video.type}</p>
                
                <h6 className="body-cp-rg">{video.name}</h6>
                
                <div className="CTA-Container">
                    
                    <button className={ isAlreadyAdded( state.likedVideos.videoList, video._id )? "btn btn-icon-primary" :"btn btn-icon-secondary" } 
                    onClick={()=>addOrRemoveFromPlaylist({playlistId: state.likedVideos._id, dispatch, videoId: video._id, type: "SET_LIKED_VIDEOS"})}><i className="fas fa-thumbs-up btn-icon"></i></button>

                    <a href="#note-section" className="btn btn-icon-secondary"><i className="fas fa-pen-square btn-icon"></i></a>
                    
                    
                    <span className="add-to-playlist-cta-container">
                    
                        <button className="btn btn-icon-secondary" onClick={()=>{setAddtoPlaylist((flag)=>!flag)}}><i className="fas fa-folder-plus btn-icon"></i></button>
                        
                        <div className="playlist-container scroll-bar-styled shadow-box" style={{display:addToPlaylist? "block":"none" }}>
                            <AddToPlaylistContainer video = {video} setAddtoPlaylist = {setAddtoPlaylist} />
                        </div>

                    </span>

                    <button className={ isAlreadyAdded( state.watchLater.videoList, video._id )? "btn btn-icon-primary" :"btn btn-icon-secondary" }
                    onClick={()=>addOrRemoveFromPlaylist({playlistId: state.watchLater._id, dispatch, videoId: video._id, type: "SET_WATCH_LATER"})}><i className="fas fa-bookmark btn-icon"></i> </button>
                    
                    <button className="btn btn-icon-secondary"><i className="fas fa-share-alt btn-icon"></i></button>
                </div> 
            </div>
            
            <div className="filter-divider-line"></div>
            
            <div className = "video-tutor-details">
                <img className="avatar avatar-xs-size" src={video.tutorId.avatar} alt="video" />

                <div className="video-tutor-name">
                    <p className="body-cp-md secondary-text-color text-light-weight">
                    {video.tutorId.name}
                    </p>
                </div>

            </div>

            <div className="filter-divider-line"></div>
        </>
    )
}