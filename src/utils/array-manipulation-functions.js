

 export const getVideoDetail = (array, id)=>{
    for(let i=0; i<array.length; i++){
        if(array[i].id === id){
            return array[i];
        }
    }   
 }

 export const getNoteDetails = (array, videoId) => {
    return array.filter((item)=> item.videoId === videoId)
 }

 export const getPlaylistData = (array, playlistId) => {
   return array.find((item)=> item.id === playlistId)
}

 export const isAlreadyAdded = (array, id) =>{
    for(let i=0; i<array.length; i++){
        if(array[i].id === id){
            return true;
        }
    }
    return false;
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