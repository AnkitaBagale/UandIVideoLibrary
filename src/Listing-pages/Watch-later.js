
import { useStateContext } from "../Context";
import { Link } from "react-router-dom";
import { VideoCardHorizontal } from "./Video-card-horizontal";

export const WatchLater = () =>{
 
    const { state } = useStateContext();

    return (
        <>
        <ul className="stacked-list">
            { state.watchLater.map(
                (video)=> 
                <li key={video.id}>  
                    <Link className="link-no-style" to={`/search/${video.id}`}>
                        <VideoCardHorizontal video={video}/>
                    </Link>
                </li>)
             }
        </ul>
        </>
    )

}