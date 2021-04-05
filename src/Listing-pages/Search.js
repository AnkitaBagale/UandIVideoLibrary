
import { useStateContext } from "../Context";
import { VideoCard } from "./Video-card";
import { types } from "../database";
import "./search.css";
import { NavLink, useLocation } from "react-router-dom";

export const Search = () =>{
 
    const {search} = useLocation();
    const searchQuerySplit = search.match(/(\?type=)(.*)/);

    const searchQuery = searchQuerySplit ? decodeURI(searchQuerySplit[2]) : "All";

    const { state } = useStateContext();

    return (
        <>
            {/* <div className="category-list grid-right-of-filter padding-around-1rem">
                {
                    types.map((type)=>{
                        
                       return <div
                  key={type}
                  className="card-vertical card-hover"
                >
                  <div className="overlay-container">
                    <div className="image-container category-list-item-bg">                    
                    </div>
                  </div>
                  <div className="overlay-text text-center">
                    <div className="h6">{type}</div>
                  </div>
                </div>
                    
                    })
                }
            </div> */}

            <div className="CTA-Container padding-around-1rem">
                {types.map((type)=>
                <NavLink end to={{search: `?type=${encodeURI(type)}`}} activeClassName="btn" className="btn btn-outline-primary btn-rounded-corners" key={type}>
                    {type}
                </NavLink>)}
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

