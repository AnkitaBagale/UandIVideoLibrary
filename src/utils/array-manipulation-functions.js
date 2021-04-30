

 export const getVideoDetail = (array, id)=>{
   return array?.find((item)=> item.id === id)
 }

 export const getNoteDetails = (array, videoId) => {
    return array?.filter((item)=> item.videoId === videoId)
 }

 export const getPlaylistData = (array, playlistId) => {
   return array?.find((item)=> item.id === playlistId)
}

 export const isAlreadyAdded = (array, id) =>{
   return array?.find((item)=> item.videoId._id === id)
 }

 export const isAlreadyAddedInPlaylist = (playlists, playlistId, videoId) =>{
   for(let i=0; i<playlists.length; i++){
      if(playlists[i].id === playlistId){
         if(isAlreadyAdded(playlists[i].videoList, videoId)){
            return true
         }
      }
   }
  return false;
 }

 export const addToArray = (array, newVideo) =>{
    return [ ...array, newVideo ];
 }

 export const removeFromArray = (array, id) =>{
    return array.filter((item)=> item.id !== id )
 }