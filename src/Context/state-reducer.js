
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
            else{
                return { ...state, playlists : state.playlists.map(
                    (playlist)=> {if(payload.playlistId !== playlist.id) return playlist
                    return {...playlist, videoList: playlist.videoList.filter((video)=> video.id!==payload.video.id)}
                    })
                }
            } 

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

        case "ADD_OR_REMOVE_TO_LIKED_VIDEOS" : {
            return isAlreadyAdded(state.likedVideos, payload.id)
                    ? {...state, likedVideos: removeFromArray(state.likedVideos, payload.id)}
                    : {...state, likedVideos: addToArray(state.likedVideos, payload)}
        }

        case "CLEAR_HISTORY" : {
            return {...state, watchHistory: []}
        }
        case "ADD_NOTE" : {
            return {...state, notes: addToArray(state.notes, payload)}
        }
        case "EDIT_NOTE" : {
            return {...state, notes: state.notes.map((note)=> note.id!==payload.id ? note : {...note, title: payload.title, description: payload.description} )}
        }
        case "DELETE_NOTE" : {
            return {...state, notes: state.notes.filter((note)=>note.id!==payload)}
            
        }

        default:
            return state;
    }
}