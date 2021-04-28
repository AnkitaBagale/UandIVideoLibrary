import { createContext, useContext, useReducer } from "react";
import { stateReducer } from "./state-reducer";
import { videos } from "../../database";

const StateContext = createContext();

export const StateContextProvider = ({children})=>{
    const initialState = {playlists: [

                                {
                                    id: "1",
                                    title: "My Playlist",
                                    thumbnail: "",
                                    videoList : [
                                        {id: "ewMksAbgdBI",
                                        name: "Learn To Draw #01",
                                        type: "Pencil Sketching",
                                        level:"Beginner",
                                        language: "English",
                                        thumbnail:"https://i.postimg.cc/d1T0PQZ3/jess-bailey-l3-N9-Q27z-ULw-unsplash.jpg",
                                        tutor: {id:1, name: "SchaeferArt", avatar: "https://i.postimg.cc/fRf3jmN7/post-icon.png"}
                                        }
                                    ]
                                },

                                {
                                    id: "2",
                                    title: "Sketching Playlist",
                                    thumbnail: "",
                                    videoList : [
                                        {id: "jopx5u5QVpo",
                                        name: "Learn To Draw #01",
                                        type: "Pencil Sketching",
                                        level:"Advance",
                                        language: "Hindi",
                                        thumbnail:"https://i.postimg.cc/d1T0PQZ3/jess-bailey-l3-N9-Q27z-ULw-unsplash.jpg",
                                        tutor: {id:1, name: "Sketchbook by Abhishek", avatar: "https://i.postimg.cc/fRf3jmN7/post-icon.png"}
                                        }
                                    ]
                                } 
                                
                            ], 
                          videos:[], 
                          watchLater:[],
                          watchHistory: [],
                          likedVideos: [],
                          notes: [
                                {   id: 1,
                                    videoId: "ewMksAbgdBI",
                                    title: "stuck here",
                                    description: "dint understand how to shade",
                                    time: "23"
                                },
                                {   id: 2,
                                    videoId: "ewMksAbgdBI",
                                    title: "stuck here",
                                    description: "dint understand how to shade",
                                    time: "70"
                                }
                            ]
                          }
    const [ state, dispatch ] = useReducer(stateReducer, initialState);
    return(
        <StateContext.Provider value={{state, dispatch}}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);