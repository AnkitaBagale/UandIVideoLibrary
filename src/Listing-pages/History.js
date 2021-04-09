
import { useStateContext } from "../Context";
import { Link } from "react-router-dom";
import { VideoCardHorizontal } from "./Video-card-horizontal";

export const History = () =>{
 
    const { state:{watchHistory}, dispatch } = useStateContext();

    return (
        <>
        <h1 className="h3 text-center margin-top-3rem">Learning History</h1>
        
        {
        watchHistory.length === 0 
            ? (<div className="text-center p text-regular-weight">No watched videos</div>)
            : (<>
                <div className="text-right">
                
                <ul className="stacked-list">
                    { watchHistory.map(
                        (video)=> 
                        <li key={video.id}>  
                            <Link className="link-no-style" to={`/explore/${video.id}`}>
                                <VideoCardHorizontal video={video} />
                            </Link>
                        </li>)
                    }
                </ul>

                <button className="btn btn-solid-secondary" onClick={()=>{
                    dispatch({type: "CLEAR_HISTORY"})
                }}>Clear History</button>
                </div>
             </>)
        
        }
        </>
    )

}