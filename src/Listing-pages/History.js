
import { useStateContext } from "../Context";
import { Link } from "react-router-dom";
import { VideoCardHorizontal } from "./Video-card-horizontal";

export const History = () =>{
 
    const { state, dispatch } = useStateContext();

    return (
        <>
        <button onClick={()=>{
            dispatch({type: "CLEAR_HISTORY"})
        }}>Clear History</button>

        <ul className="stacked-list">
            { state.watchHistory.map(
                (video)=> 
                <li key={video.id}>  
                    <Link className="link-no-style" to={`/search/${video.id}`}>
                        <VideoCardHorizontal video={video} />
                    </Link>
                </li>)
             }
        </ul>
        </>
    )

}