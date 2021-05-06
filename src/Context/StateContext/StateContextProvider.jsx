import { createContext, useContext, useReducer } from "react";
import { stateReducer } from "./state-reducer";

const StateContext = createContext();

export const StateContextProvider = ({children})=>{
    const initialState = {playlists: [], 
                          videos:[], 
                          watchLater:{},
                          watchHistory: {},
                          likedVideos: {}
                          }
    const [ state, dispatch ] = useReducer(stateReducer, initialState);
    return(
        <StateContext.Provider value={{state, dispatch}}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);