
import { useStateContext } from "../Context";
import { isAlreadyAdded } from "../utils";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

export const AddToPlaylistContainer = ({video, setAddtoPlaylist}) =>{
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
                                dispatch({type:"ADD_OR_REMOVE_TO_PLAYLIST", payload: {playlistId: playlist.id, video}})
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