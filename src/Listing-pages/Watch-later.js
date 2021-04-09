
import { useStateContext } from "../Context";
import { Link } from "react-router-dom";
import { VideoCardHorizontal } from "./Video-card-horizontal";

export const WatchLater = () =>{
 
    const { state:{watchLater} } = useStateContext();

    return (
        <>
        <h1 className="h3 text-center margin-top-3rem">Saved Videos</h1>
        <ul className="stacked-list">
            { watchLater.length===0
                ? (<li className="text-center text-regular-weight">No videos saved</li>) 
                :watchLater.map(
                (video)=> 
                <li key={video.id}>  
                    <Link className="link-no-style" to={`/explore/${video.id}`}>
                        <VideoCardHorizontal video={video}/>
                    </Link>
                </li>)
             }
        </ul>
        </>
    )

}