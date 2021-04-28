
import './App.css';
import { VideoDetail, Explore, SearchResult, History, VideosInPlaylist, AllPlaylists, LikedVideos, WatchLater, HomePage, Nav, Footer, ForgotPasswordPage, Login, PrivateRoute, Profile, ProfilePage, Settings, SignUp, ErrorPage} from "./Components";

import {
  Routes,
  Route
} from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from './Context';


export function App() {
  const {dispatch} = useStateContext();

  useEffect(()=>{

    (async()=>{
      
      try {
        const { data: {response} } = await axios.get("https://uandistoreapi.herokuapp.com/videos");
        dispatch({type: "SET_VIDEOS", payload: response})
        console.log(response);
      } catch(error) {
        console.log(error);
      }
      


    })()

  },[]);

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
              
              <PrivateRoute path="/playlists" element={<AllPlaylists />} />
              <PrivateRoute path="/playlists/:playlistId" element={<VideosInPlaylist />} />            
              <PrivateRoute path="/watchlater" element={<WatchLater />} />
              <PrivateRoute path="/history" element={<History />} /> 
              <PrivateRoute path="/liked" element={<LikedVideos />} />
                  
            </Route>

            <PrivateRoute path="/profile" element={<ProfilePage />}>
              <Route path="/" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </PrivateRoute>

            <Route path="/explore/:id" element={<VideoDetail />} />

            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<ForgotPasswordPage />} />
            <Route path="/signup" element={<SignUp />} />
            
            
            <Route path="*" element={<ErrorPage />} />
            <Route path="/error" element={<ErrorPage />} />

          </Routes>
          
        </div>
        
        
        <Footer />
        
      </div>
    
  );
}


