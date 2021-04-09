
import { useStateContext } from "../Context";
import { VideoCard } from "./Video-card";
import { types } from "../database";
import "./explore.css";
import { useLocation, Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { SideBar } from "../Header/Sidebar";

export const Explore = () =>{
    
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="margin-top-1rem">
        
            <div className="display-flex">
                <div className={ sidebarOpen ? "sidebar sidebar-active scrollbar-styled shadow-right" :"sidebar scrollbar-styled shadow-right" } >  
                    <div className="nav-bar-opening-button" onClick={()=> setSidebarOpen((flag)=>!flag)}>
                        <span className="sidebar-arrow"><i className="fas fa-chevron-down"></i></span>
                    </div>
                    <SideBar />
                </div> 
                <div className="content-area-beside-sidebar">
                    <Outlet />
                </div>
            </div>
        
        </div>
        
            
    )

}

export const Search = () =>{

    const { state } = useStateContext();

    const {search} = useLocation();
    const searchQuerySplit = search.match(/(\?type=)(.*)/);

    const searchQuery = searchQuerySplit ? decodeURI(searchQuerySplit[2]) : "All";

    return(
        
        <div>
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
        </div>
    )

}
