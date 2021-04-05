
import { isAlreadyAdded, addToArray, removeFromArray, isAlreadyAddedInPlaylist } from "../utils";

export const stateReducer = (state, {type, payload}) =>{
    switch (type){

        case "ADD_TO_PLAYLIST" : {    
            if( !isAlreadyAddedInPlaylist(state.playlists, payload.playlistId, payload.video.id) )
                return { ...state, playlists : state.playlists.map((playlist)=>{
                                
                                if(payload.playlistId !== playlist.id)
                                    return playlist 

                                return {...playlist, videoList: addToArray(playlist.videoList, payload.video)}

                    }) 
                }
            return state;
        }
        case "ADD_NEW_PLAYLIST" : {
            return { ...state, playlists : addToArray(state.playlists, {...payload.playlist, videoList: [payload.video] })}
        }

        case "ADD_TO_HISTORY" : {
            return {...state, watchHistory: addToArray(state.watchHistory,{...payload, date: new Date()}) }
        }

        case "ADD_OR_REMOVE_TO_WATCH_LATER" : {
            return isAlreadyAdded(state.watchLater, payload.id)
                    ? {...state, watchLater: removeFromArray(state.watchLater, payload.id)}
                    : {...state, watchLater: addToArray(state.watchLater, payload)}
        }

        case "CLEAR_HISTORY" : {
            return {...state, watchHistory: []}
        }

        default:
            return state;
    }
}