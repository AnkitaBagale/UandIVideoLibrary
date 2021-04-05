
import './App.css';
import { HomePage } from "./Home";
import { Nav } from "./Header";
// import { Footer } from "./Footer";
import { Search, History, Playlists, PlaylistMainContent, AllPlaylistContent } from "./Listing-pages";
import { VideoDetail } from "./Video-detail";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { WatchLater } from './Listing-pages/Watch-later';

export function App() {
  return (
    <Router>
      
      <div className="App">
        <Nav />
        <div className="app-container">
          
          <Routes>
            <Route path="/" element={<HomePage />} />              

            <Route path="/explore" element={<Search />} />             

            <Route path="/history" element={<History />} />             

            <Route path="/saved" element={<WatchLater />} />

            <Route path="/playlists" element={<Playlists />} >
              <Route path="/" element={<AllPlaylistContent />} />
              <Route path=":playlistId" element={<PlaylistMainContent />} />
            </Route>

            <Route path="/search/:id" element={<VideoDetail />} />
          </Routes>

        </div>
        
        {/* <Footer /> */}
        
      </div>
    </Router>
  );
}


