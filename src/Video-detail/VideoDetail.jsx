import { useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { useStateContext } from "../Context";

import { getVideoDetail, isAlreadyAdded } from "../utils";
import {AddToPlaylistContainer} from "./PlaylistsContainer";
import {Notes, AddNewNote} from "./NotesContainer";
import  ReactPlayer  from "react-player";
import "./video-detail.css";


export const VideoDetail = () =>{

    const { state, dispatch } = useStateContext();
   
    let match = useParams();
    
    let videoDetails = getVideoDetail(state.videos, match.id);

    const playerRef = useRef(null);

    return (
        <>
            <div className=" display-flex max-width-do-not-stretch">
                <div className="video-details">
                    <div className="video-container">
                        <ReactPlayer
                        ref={playerRef}
                        url={`https://www.youtube.com/embed/${videoDetails.id}`}
                        controls={true}
                        width={"100%"}
                        height={"100%"}
                        onStart = {()=>{dispatch({type:"ADD_TO_HISTORY", payload: videoDetails})}}                     
                        />
                    </div>
                    <div className="video-details-section">
                        <VideoDetailsSection video = {videoDetails} />
                    </div>
                </div>

                <div className="notes-section scrollbar-styled scroll-visible-in-mobile" id="note-section">
                    <div>
                        <h6 className="padding-around-1rem margin-0">Notes</h6>
                        <div>
                            <AddNewNote playerRef={playerRef} videoId={videoDetails.id} />
                        </div>
                    </div>

                    <Notes id={videoDetails.id}/>
                    
                </div>
                
            </div>
        </>
    )
}

const VideoDetailsSection = ({video}) =>{
    const { state, dispatch } = useStateContext();
    const [ addToPlaylist, setAddtoPlaylist ] = useState(false);
    return (
        <>
            <div className="text-container">

                <p className="body-cp-md primary-text-color">#{video.type}</p>
                
                <h6 className="body-cp-rg">{video.name}</h6>
                
                <div className="CTA-Container">
                    
                    <button className={ isAlreadyAdded( state.likedVideos, video.id )? "btn btn-icon-primary" :"btn btn-icon-secondary" } onClick={()=>{dispatch({type:"ADD_OR_REMOVE_TO_LIKED_VIDEOS", payload: video})}}><i className="fas fa-thumbs-up btn-icon"></i></button>

                    <a href="#note-section" className="btn btn-icon-secondary"><i className="fas fa-pen-square btn-icon"></i></a>
                    
                    
                    <span className="add-to-playlist-cta-container">
                    
                        <button className="btn btn-icon-secondary" onClick={()=>{setAddtoPlaylist((flag)=>!flag)}}><i className="fas fa-folder-plus btn-icon"></i></button>
                        
                        <div className="playlist-container scroll-bar-styled shadow-box" style={{display:addToPlaylist? "block":"none" }}>
                            <AddToPlaylistContainer video = {video} setAddtoPlaylist = {setAddtoPlaylist} />
                        </div>

                    </span>

                    <button className={ isAlreadyAdded( state.watchLater, video.id )? "btn btn-icon-primary" :"btn btn-icon-secondary" }
                    onClick={()=>{dispatch({type: "ADD_OR_REMOVE_TO_WATCH_LATER", payload: video})}}><i className="fas fa-bookmark btn-icon"></i> </button>
                    
                    <button className="btn btn-icon-secondary"><i className="fas fa-share-alt btn-icon"></i></button>
                </div> 
            </div>
            
            <div className="filter-divider-line"></div>
            
            <div className = "video-tutor-details">
                <img className="avatar avatar-xs-size" src={video.tutor.avatar} alt="video" />

                <div className="video-tutor-name">
                    <p className="body-cp-md secondary-text-color text-light-weight">
                    {video.tutor.name}
                    </p>
                </div>

            </div>

            <div className="filter-divider-line"></div>
        </>
    )
}





