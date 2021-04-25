
import { useStateContext } from "../Context";
import { VideoCard } from "./VideoCard";
import { types } from "../database";
import "./explore.css";
import { useLocation, Outlet, Link } from "react-router-dom";
import { SideBar } from "../Header/Sidebar";

export const Explore = () =>{
    
    return (

        <div className="display-flex">
            <div className = "sidebar sidebar-active scrollbar-styled shadow-right" >  
                <SideBar />
            </div> 
            <div className="content-area-beside-sidebar">
                <Outlet />
            </div>
        </div>
        
            
    )

}

export const Search = () =>{

    const { state } = useStateContext();

    
    const query = new URLSearchParams(useLocation().search);

    const searchQuery = query.get("type")? query.get("type") : "All";

    return(
        
        <>
            <div className="CTA-Container padding-around-1rem">
                {types.map((type)=>
                <Link to={{search: `?type=${encodeURI(type)}`}} className={`btn btn-outline-primary btn-rounded-corners ${searchQuery===type && "category-link-active"}`} key={type}>
                    {type}
                </Link>)}
            </div>
        
            <div className="grid-4-column-layout grid-right-of-filter padding-around-1rem">  
            {
            searchQuery==="All" ?
                            
                state.videos.map((video)=> <VideoCard key={video.id} video={video} />)
            : (state.videos.filter((item)=>item.type===searchQuery)).map((video)=> <VideoCard key={video.id} video={video} />)
            }  
            </div> 
        </>
    )

}
