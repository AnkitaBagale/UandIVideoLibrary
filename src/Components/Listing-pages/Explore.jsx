import { Outlet } from "react-router-dom";
import { SideBar } from "../Header/Sidebar";
import "./styles.css";

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

