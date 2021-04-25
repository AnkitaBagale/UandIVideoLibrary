
import './App.css';
import { HomePage } from "./Home";
import { Nav } from "./Header";
import { Footer } from "./Footer";
import { Explore, Search, History, PlaylistMainContent, AllPlaylistContent, LikedVideos, WatchLater } from "./Listing-pages";
import { VideoDetail } from "./Video-detail";

import {
  Routes,
  Route
} from "react-router-dom";


export function App() {
  return (
    
      
      <div className="App page-grid-layout">
        <div className="grid-item-nav">
          <Nav />
        </div>

        <div className="app-container grid-item-main">
          
          <Routes>
            <Route path="/" element={<HomePage />} />              

            <Route path="/explore" element={<Explore />} >   
              <Route path="/" element={<Search />} />          
              
              <Route path="/playlists" element={<AllPlaylistContent />} />
              <Route path="/playlists/:playlistId" element={<PlaylistMainContent />} />            
              <Route path="/watchlater" element={<WatchLater />} />
              <Route path="/history" element={<History />} /> 
              <Route path="/likes" element={<LikedVideos />} />
                  
            </Route>

            <Route path="explore/:id" element={<VideoDetail />} />
          </Routes>

        </div>
        
        
          <Footer />
        
        
        
      </div>
    
  );
}


