
import { useStateContext } from "../Context";
import { VideoCard } from "./Video-card";

import { types } from "../database";

export const Search = () =>{
 
    const { state, dispatch } = useStateContext();

    return (
        <div className="grid-4-column-layout grid-right-of-filter padding-around-1rem">

        
            { state.videos.map((video)=> <VideoCard key={video.id} video={video} />) }
        
        </div>
    )

}