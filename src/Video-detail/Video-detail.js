import { useState, useRef, useReducer } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../Context";
import { getVideoDetail, getNoteDetails, isAlreadyAdded } from "../utils";
import  ReactPlayer  from "react-player";
import "./video-detail.css";
import { v4 as uuidv4 } from 'uuid';

export const VideoDetail = () =>{

    const { state, dispatch } = useStateContext();
    const [showAddNewNote, setAddNewNote] = useState(false);

    console.log(state.playlists)
   
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
                        <VideoDetailsSection video = {videoDetails} setAddNewNote={setAddNewNote} />
                    </div>
                </div>

                <div className="notes-section">
                    <div className="text-container">
                        <button onClick={()=>{setAddNewNote(flag=>!flag)}} className="btn btn-solid-secondary margin-top-0">{showAddNewNote? "Close Editor" : "Add New Note"}</button>
                        {showAddNewNote && 
                        <div>
                        <AddNewNote setEditMode={setAddNewNote} playerRef={playerRef} videoId={videoDetails.id} />
                        </div>}
                    </div>

                    <Notes id={videoDetails.id}/>
                    
                </div>
                
            </div>
        </>
    )
}

const VideoDetailsSection = ({video, setAddNewNote}) =>{
    const { state, dispatch } = useStateContext();
    const [ addToPlaylist, setAddtoPlaylist ] = useState(false);
    return (
        <>
            <div className="text-container">

                <p className="body-cp-md primary-text-color">#{video.type}</p>
                
                <h6 className="body-cp-rg">{video.name}</h6>
                
                <div className="CTA-Container">
                    
                    <button className={ isAlreadyAdded( state.likedVideos, video.id )? "btn btn-icon-primary" :"btn btn-icon-secondary" } onClick={()=>{dispatch({type:"ADD_OR_REMOVE_TO_LIKED_VIDEOS", payload: video})}}><i className="fas fa-thumbs-up btn-icon"></i></button>

                    <button className="btn btn-icon-secondary" onClick={()=>{setAddNewNote(flag=>!flag)}}><i className="fas fa-pen-square btn-icon"></i></button>
                    
                    
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

const Notes = ({id}) =>{
    const {state} = useStateContext();
    let noteDetails = getNoteDetails(state.notes, id);
    return(
        <>
        <div className="text-container">
        
        <h6>Notes</h6>
        
        <ul className="stacked-list">
        {noteDetails.length===0? "no notes added" : noteDetails.map((note)=>
            <NoteCard  key={note.id} note={note} />
        )}
        </ul>
            </div>
     
        </>
    )
}

const NoteCard = ({note}) =>{
    const { dispatch } = useStateContext();
    
    const [isEditMode, setEditMode] = useState(false);
    
    return(
        <li>
            {
                !isEditMode?
                (<div className="border-1px-square padding-around-1rem">

                    <h6 className="body-cp-rg">{note.title}</h6>
                    <div className="body-cp-md">{note.description}</div>
                    <time className="body-cp-sm text-light-weight"> <span className="padding-right-4px"><i className="far fa-clock"></i></span> {convertTimeToString(note.time)}</time>
                    
                    <div className="notes-cta-container">
                        <button onClick={()=>{setEditMode(true)}} className="btn btn-icon-secondary"><i className="fas fa-pencil-alt btn-icon"></i></button>
                        <button className="btn btn-icon-secondary" onClick={()=>dispatch({type:"DELETE_NOTE", payload:note.id})}><i className="fas fa-trash-alt btn-icon"></i></button>
                    </div>
                    
                </div>) : 
                (
                    <AddNewNote note={note} setEditMode={setEditMode} />
                )
            }
            
        </li>
    )
}

const noteDefaultState = {
    id: null,
    title: "",
    description:""
}

const AddNewNote = ({note = noteDefaultState, setEditMode, playerRef, videoId}) =>{
    
    const noteReducer = (state, {type, payload}) =>{
        switch (type) {
            case "SET_TITLE" : {
                return {...state, title: payload}
            }
            case "SET_DESCRIPTION" : {
                return {...state, description: payload}
            }
            default : {
                console.log("this case is not handled with reducer")
                return state
            }
                
        }
    }

    const [noteState, noteDispatch] = useReducer(noteReducer, note);

    const {state, dispatch} = useStateContext();
    console.log({note});
    console.log({noteState});

    return(
        
             <div className="border-1px-square padding-around-1rem">
                <div className="row">
                    <input className="body-cp-rg form-field" value={noteState.title} onChange={(e)=>{noteDispatch({type:"SET_TITLE", payload:e.target.value})}} placeholder="Title" autoFocus/>
                    </div>
                    <div className="row margin-bottom-0">
                    <textarea className="body-cp-md form-field" value={noteState.description} onChange={(e)=>{noteDispatch({type:"SET_DESCRIPTION", payload:e.target.value})}} placeholder="Description" />
                </div>
                <div className="CTA-Container">
                    <button onClick={()=>{
                        if(noteState.id){
                            dispatch({type: "EDIT_NOTE", payload: noteState})
                        }else{
                            dispatch({type: "ADD_NOTE" , payload:{
                                ...noteState,
                                id: uuidv4(),
                                videoId,
                                time: playerRef.current.getCurrentTime()}})   
                        }
                                                
                        setEditMode(false);}
                    } 
                        type="submit" className="btn btn-outline-primary btn-sm-size">Add Note</button>
                    
                    <button onClick={()=>{
                        setEditMode(false)
                    }} type="button" className="btn btn-outline-secondary btn-sm-size">Discard</button>
                </div>
                
            </div>
            
        
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
    const [ openAddPlaylistInput, setAddPlaylistInput] = useState(false);
    
    return (
        <>  
            <button key={"watchLater"} 
                className="btn btn-text-icon-secondary" 
                onClick={()=>{
                        dispatch({type:"ADD_OR_REMOVE_TO_WATCH_LATER", payload: video})
                        setAddtoPlaylist((flag)=>!flag)
                    }
                }>
                <i className={isAlreadyAdded(state.watchLater, video.id)
                                    ? "fas fa-check-circle btn-icon"
                                    : "fas fa-plus-circle btn-icon"}></i>
                Watch Later
            </button>
            {
            state.playlists.map((playlist)=>
            (       <button key={playlist.id} 
                        className="btn btn-text-icon-secondary" 
                        onClick={()=>{
                                dispatch({type:"ADD_TO_PLAYLIST", payload: {playlistId: playlist.id, video}})
                                setAddtoPlaylist((flag)=>!flag)
                            }
                        }>
                        <i className={isAlreadyAdded(playlist.videoList, video.id)
                                            ? "fas fa-check-circle btn-icon"
                                            : "fas fa-plus-circle btn-icon"}></i>
                        {playlist.title}
                    </button>   
            ))
            }

            <button style={{display: openAddPlaylistInput? "none":"block"}} type="button" className="btn btn-text-icon-secondary" onClick={()=>setAddPlaylistInput(true)}><i className="fas fa-plus-circle btn-icon"></i>Add new playlist</button>

            <div style={{display: openAddPlaylistInput? "block":"none"}} className="add-new-playlist-input" >
                <form onSubmit={(e)=>{
                        e.preventDefault();
                        let newPlaylistItem = {id: uuidv4(), 
                                            title: playlistTitle, 
                                            description:""}

                        dispatch( { type: "ADD_NEW_PLAYLIST", payload: { playlist: newPlaylistItem, video } } );
                        setAddPlaylistInput(false);
                        setAddtoPlaylist(flag => !flag);

                    }}>
                
                <input value={playlistTitle} type="text" className="form-field" onChange={(e)=>{setPlaylistTitle(e.target.value)}} required/>
                
                <button type="submit" className="btn btn-text-icon-secondary">Add new playlist</button>
                </form>
            
            </div>
        </>
    )
}


