
import { useStateContext } from "../Context";
import { Link } from "react-router-dom";
import { VideoCardHorizontal } from "./Video-card-horizontal";

export const LikedVideos = () =>{
 
    const { state:{likedVideos} } = useStateContext();

    return (
        <>
        <h1 className="text-center h3 margin-top-3rem">Liked Videos</h1>

        {likedVideos.length===0
            ? <div className="p text-center text-regular-weight">No liked videos</div>
            :(<ul className="stacked-list">
                { likedVideos.map(
                    (video)=> 
                    <li key={video.id}>  
                        <Link className="link-no-style" to={`/explore/${video.id}`}>
                            <VideoCardHorizontal video={video}/>
                        </Link>
                    </li>)
                }
            </ul>)}
        </>
    )

}