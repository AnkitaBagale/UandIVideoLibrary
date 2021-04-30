import axios from "axios"

export const addOrRemoveFromPlaylist = async ({playlistId, dispatch, videoId, type}) =>{
    try {
        const {data:{response}} = await axios({method: "POST", 
                                                url: `https://uandistoreapi.herokuapp.com/playlists/${playlistId}/videos`, 
                                                data:{
                                                   videoId,
                                                   date: (new Date()).toDateString() 
                                                }})
        dispatch({type, payload: response})
    } catch(error) {
        console.log(error)
    }
}

export const updatePlaylistInformation = async ({playlistId, title, dispatch}) =>{
    try {
        const {data:{response}} = await axios({method: "POST", 
                                                url: `https://uandistoreapi.herokuapp.com/playlists/${playlistId}`, 
                                                data:{
                                                   title 
                                                }})
        dispatch({type:"UPDATE_PLAYLIST", payload: response});
    } catch(error) {
        console.log(error)
    }
}

export const deleteEntirePlaylist = async ({dispatch, playlistId}) =>{
    try {
        const {data:{response}} = await axios({method: "DELETE", 
                                                url: `https://uandistoreapi.herokuapp.com/playlists/${playlistId}`} 
                                               )
        dispatch({type:"DELETE_PLAYLIST", payload: response._id});
    } catch(error) {
        console.log(error)
    }
}


export const createNewPlaylist = async ({title, video, dispatch, userId, setPlaylistTitle})=>{
    try {
        const {data:{response}} = await axios({method: "POST", 
                                                url: `https://uandistoreapi.herokuapp.com/playlists`, 
                                                data:{
                                                    title,
                                                    userId,
                                                    thumbnail: video.thumbnail,
                                                    videoList: [
                                                        {videoId: video._id,
                                                        date: (new Date()).toDateString()}
                                                    ]
                                                }})
        console.log({response});
        dispatch({type:"ADD_NEW_PLAYLIST", payload: response});
        setPlaylistTitle("");
    } catch(error) {
        console.log(error)
    }
}

export const clearHistory  = async ({playlistId, dispatch}) =>{
    try {
        const {data:{response}} = await axios({method: "POST", 
                                                url: `https://uandistoreapi.herokuapp.com/playlists/${playlistId}`, 
                                                data:{
                                                   videoList: [] 
                                                }})
                                                
        dispatch({type:"SET_HISTORY", payload: response});
        
    } catch(error) {
        console.log(error)
    }
}
export const getNotesForVideo = async({userId, videoId, setNotes}) =>{
    try {
        const { data: {response} } = await axios.get(`https://uandistoreapi.herokuapp.com/users/${userId}/notes/${videoId}`);
        
        setNotes(response);
      } catch(error) {
        console.log(error);
      }
}

export const CreateNoteForVideo = async({setNotes, newVideo, noteDispatch}) =>{
    try {
        const { data: {response} } = await axios.post(`https://uandistoreapi.herokuapp.com/notes`, newVideo);
        setNotes(notes => [...notes, response]);
        noteDispatch({type:"SET_DESCRIPTION", payload:""});
        noteDispatch({type:"SET_TITLE", payload:""})
      } catch(error) {
        console.log(error);
      }
}

export const UpdateNoteForVideo = async({noteId, setNotes, noteUpdates, setEditMode}) =>{
    try {
        const { data: {response} } = await axios.post(`https://uandistoreapi.herokuapp.com/notes/${noteId}`, noteUpdates);
        
        setNotes(notes => notes.map((note)=>note._id !== response._id ? note : response));
        setEditMode(false);

      } catch(error) {
        console.log(error);
      }
}

export const deleteNoteForVideo = async({noteId, setNotes}) =>{
    try {
        const { data: {response} } = await axios.delete(`https://uandistoreapi.herokuapp.com/notes/${noteId}`);
        
        setNotes(notes => notes.filter((note)=>note._id !== response._id));

      } catch(error) {
        console.log(error);
      }
}
