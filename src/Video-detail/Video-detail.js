import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../Context";
import { getVideoDetail, getNoteDetails, isAlreadyAdded, isAlreadyAddedInPlaylist } from "../utils";
import  ReactPlayer  from "react-player";
import "./video-detail.css";
import faker from "faker";

export const VideoDetail = () =>{
    const { state, dispatch } = useStateContext();
    console.log(state.playlists)
   
    let match = useParams();
    
    let videoDetails = getVideoDetail(state.videos, match.id);

    const playerRef = useRef(null);

    return (
        <>
            <div className="video-container">
                <ReactPlayer
                ref={playerRef}
                url={`https://www.youtube.com/embed/${videoDetails.id}`}
                controls={true}
                width={"100%"}
                height={"100%"}
                onStart = {()=>{dispatch({type:"ADD_TO_HISTORY", payload: videoDetails})}}                     
                />
                <VideoDetailsSection video = {videoDetails} />
                <Notes id={videoDetails.id} />
            </div>
        </>
    )
}

const VideoDetailsSection = ({video}) =>{
    const { state, dispatch } = useStateContext();
    const [ addToPlaylist, setAddtoPlaylist ] = useState(false);
    return (
        <div className="video-details-section">
            <div className="text-container">
                <p className="body-cp-md primary-text-color">#{video.type}</p>
                <h6 className="body-cp-rg">{video.name}</h6>
                <div className="CTA-Container">
                    <button className="btn btn-icon-secondary"><i className="fas fa-pen-square btn-icon"></i></button>
                    <span className="add-to-playlist-cta-container">
                    
                        <button className="btn btn-icon-secondary" onClick={()=>{setAddtoPlaylist((flag)=>!flag)}}><i className="fas fa-folder-plus btn-icon"></i></button>
                        
                        <div className="playlist-container scroll-bar-styled" style={{display:addToPlaylist? "block":"none" }}>
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
                <img className="avatar avatar-xs-size" src={video.tutor.avatar} />

                <div className="video-tutor-name">
                    <p className="body-cp-md secondary-text-color text-light-weight">
                    {video.tutor.name}
                    </p>
                </div>
            </div>
            <div className="filter-divider-line"></div>
        </div>
    )
}

const Notes = ({id}) =>{
    const {state} = useStateContext();
    let noteDetails = getNoteDetails(state.notes, id);
    return(
        <>
        <div className="text-container">
        <h6>Notes</h6>
        <ul className="stacked-list">
        {noteDetails.length===0? "no notes added" : noteDetails.map((note)=>
            <li key={note.id}>
        
                <div className="card-horizontal">
                    
                    <div>
                        <div className="text-container-title">
                            <h6 className="body-cp-rg">{note.title}</h6>
                        </div>
                        <div className="text-container-desc">
                            <div className="body-cp-md">{note.desc}</div>
                            <time className="body-cp-sm text-light-weight">{convertTimeToString(note.time)}</time>
                        </div>
                        <div className="CTA-Container">
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    </div>
                </div>
            
            </li>
        )}
        </ul>
            </div>
     
        </>
    )
}

const convertTimeToString = (time) =>{
    if(time >= 3600){
        return `${Math.floor(time / 3600)}:${Math.floor((time % 3600) / 60)}:${time % 60}`;
    }
  
        return `${Math.floor(time / 60)}:${time % 60}`;
    
}

const AddToPlaylistContainer = ({video, setAddtoPlaylist}) =>{
    const { state, dispatch } = useStateContext();
    const [ playlistTitle, setPlaylistTitle ] = useState("");
    return (
        <>
            {
                state.playlists.map(({id, title})=>
                (       <button key={id} 
                            className="btn btn-text-icon-secondary" 
                            onClick={()=>{
                                    dispatch({type:"ADD_TO_PLAYLIST", payload: {playlistId: id, video}})
                                    setAddtoPlaylist((flag)=>!flag)
                                }
                            }>
                            <i className={isAlreadyAddedInPlaylist(state.playlists, id, video.id)
                                                ? "fas fa-check-circle btn-icon"
                                                : "fas fa-plus-circle btn-icon"}></i>
                            {title}
                        </button>   
                ))
            }
            <div className="add-new-playlist-input">
            <input value={playlistTitle} type="text" className="form-field" onChange={(e)=>{setPlaylistTitle(e.target.value)}} />
            <button onClick={
                ()=>{
                    let newPlaylistItem = {id: faker.datatype.uuid(), 
                                           title: playlistTitle, 
                                           desc:""}

                    dispatch( { type: "ADD_NEW_PLAYLIST", payload: { playlist: newPlaylistItem, video } } );
                    setAddtoPlaylist(flag => !flag);
                }
            } className="btn btn-text-icon-secondary">Add new playlist</button>
            </div>
        </>
    )
}