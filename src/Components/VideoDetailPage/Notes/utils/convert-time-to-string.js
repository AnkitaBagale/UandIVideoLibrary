export const convertTimeToString = (time) =>{
    time = Number(time);
    if(time >= 3600){
        return `${Math.floor(time / 3600)}:${Math.floor((time % 3600) / 60)}:${Math.floor(time % 60)}`;
    }
        return `${Math.floor(time / 60)}:${Math.floor(time % 60)}`;
    
}