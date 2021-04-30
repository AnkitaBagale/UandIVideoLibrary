
import { useState } from "react";
import { useAuthentication, useStateContext } from "../../Context";
import { isAlreadyAdded } from "../../utils";
import { addOrRemoveFromPlaylist, createNewPlaylist } from '../utils';

export const AddToPlaylistContainer = ({video, setAddtoPlaylist}) =>{
    const { state, dispatch } = useStateContext();
    const [ playlistTitle, setPlaylistTitle ] = useState("");
    const [ openAddPlaylistInput, setAddPlaylistInput] = useState(false);
    const { userId } = useAuthentication();
   
    return (
        <>  
            <button key={"watchLater"} 
                className="btn btn-text-icon-secondary" 
                onClick={()=>{
                    addOrRemoveFromPlaylist({playlistId: state.watchLater._id, dispatch, videoId: video._id, type: "SET_WATCH_LATER"});
                        setAddtoPlaylist((flag)=>!flag)
                    }
                }>
                <i className={isAlreadyAdded(state.watchLater.videoList, video._id)
                                    ? "fas fa-check-circle btn-icon"
                                    : "fas fa-plus-circle btn-icon"}></i>
                Watch Later
            </button>
            {
            state.playlists.map((playlist)=>
            (       <button key={playlist._id} 
                        className="btn btn-text-icon-secondary" 
                        onClick={()=>{
                                addOrRemoveFromPlaylist({playlistId: playlist._id, dispatch, videoId: video._id, type: "UPDATE_PLAYLIST"});
                                setAddtoPlaylist((flag)=>!flag)
                            }
                        }>
                            
                        <i className={isAlreadyAdded(playlist.videoList, video._id)
                                            ? "fas fa-check-circle btn-icon"
                                            : "fas fa-plus-circle btn-icon"}></i>
                        {playlist.title}
                    </button>   
            ))
            }

            <button style={{display: openAddPlaylistInput? "none":"block"}} type="button" className="btn btn-text-icon-secondary" onClick={()=>setAddPlaylistInput(true)}><i className="fas fa-plus-circle btn-icon"></i>Add new playlist</button>

            {openAddPlaylistInput && 
            <div className="add-new-playlist-input" >
                <form onSubmit={(e)=>{
                        e.preventDefault();
                        createNewPlaylist({dispatch, userId, video, title:playlistTitle, setPlaylistTitle})
                        setAddPlaylistInput(false);
                        setAddtoPlaylist(flag => !flag);

                    }}>
                
                <input value={playlistTitle} type="text" className="form-field" onChange={(e)=>{setPlaylistTitle(e.target.value)}} autoFocus required/>
                
                <button type="submit" className="btn btn-text-icon-secondary"><i className="fas fa-plus-circle btn-icon primary-text-color"></i>Add new playlist</button>
                </form>
            
            </div>
            }
        </>
    )
}