
import './App.css';
import { VideoDetail, Explore, SearchResult, History, VideosInPlaylist, AllPlaylists, LikedVideos, WatchLater, HomePage, Nav, Footer } from "./Components";

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
              <Route path="/" element={<SearchResult />} />          
              
              <Route path="/playlists" element={<AllPlaylists />} />
              <Route path="/playlists/:playlistId" element={<VideosInPlaylist />} />            
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


