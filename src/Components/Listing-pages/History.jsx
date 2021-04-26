import { Link } from "react-router-dom";
import { useStateContext } from "../../Context";
import { VideoCardHorizontal } from "./utils";

export const History = () =>{
 
    const { state:{watchHistory}, dispatch } = useStateContext();

    return (
        <>

        <div className="grid-50-50-layout padding-around-1rem margin-auto margin-top-3rem">
            <div className="padding-left-1rem  padding-right-1rem">
                <img className="img-responsive" src="https://i.postimg.cc/TwsBcV04/jess-bailey-l3-N9-Q27z-ULw-unsplash.jpg"  alt="watchhistory" />
                <div className="text-container">
                    <h2 className="h4 padding-top-1rem">Learning History</h2>
                    <p>{watchHistory.length} videos</p>
                    <div className="CTA_Container">
                        <button className="btn btn-solid-secondary" onClick={()=>{
                        dispatch({type: "CLEAR_HISTORY"})
                    }}>Clear History</button>
                    </div>
                </div>
                <div className="filter-divider-line hide-in-desktop"></div>
            </div>
            <ul className="stacked-list padding-around-1rem scrollbar-styled height-90vh">
            {
            watchHistory.length === 0 
            ? (<li className="text-center p text-regular-weight">No watched videos</li>)
            :  watchHistory.map(
                    (video)=> 
                    <li key="video.id" className="badge-container" style={{width:"100%"}}>  
                        <Link className="link-no-style" to={`/explore/${video.id}`}>
                            <VideoCardHorizontal video={video} />
                        </Link>
                        <button onClick={()=>{ 
                            dispatch({type:"REMOVE_FROM_HISTORY", payload:  video.id}) }} 
                            className="btn btn-icon-secondary margin-0 btn-sm-size badge-btn">
                            <i className="fas fa-trash-alt btn-icon"></i>
                        </button>
                    </li>)
            }
            </ul>

        </div>
        
        
        </>
    )

}