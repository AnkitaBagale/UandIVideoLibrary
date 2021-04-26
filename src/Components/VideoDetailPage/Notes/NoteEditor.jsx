import { useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useStateContext } from "../../../Context";

const noteDefaultState = {
    id: null,
    title: "",
    description:""
}


export const NoteEditor = ({note = noteDefaultState, setEditMode, playerRef, videoId}) =>{
    
    const noteReducer = (state, {type, payload}) =>{
        switch (type) {
            case "SET_TITLE" : {
                return {...state, title: payload}
            }
            case "SET_DESCRIPTION" : {
                return {...state, description: payload}
            }
            default : {
                console.log("this case is not handled with reducer")
                return state
            }
                
        }
    }

    const [noteState, noteDispatch] = useReducer(noteReducer, note);

    const {dispatch} = useStateContext();

    return(
        
             <div className="padding-around-1rem">
                <div className="row">
                    <input className="body-cp-rg form-field" value={noteState.title} onChange={(e)=>{noteDispatch({type:"SET_TITLE", payload:e.target.value})}} placeholder="Title" autoFocus/>
                    </div>
                    <div className="row margin-bottom-0">
                    <textarea className="body-cp-md form-field" value={noteState.description} onChange={(e)=>{noteDispatch({type:"SET_DESCRIPTION", payload:e.target.value})}} placeholder="Description" />
                </div>
                <div className="CTA-Container">
                    <button 
                        onClick={()=>{
                            if(noteState.id){
                                dispatch({type: "EDIT_NOTE", payload: noteState});
                                setEditMode(false);
                            }else{
                                dispatch({type: "ADD_NOTE" , payload:{
                                    ...noteState,
                                    id: uuidv4(),
                                    videoId,
                                    time: playerRef.current.getCurrentTime()}});
                                    noteDispatch({type:"SET_DESCRIPTION", payload:""});
                                    noteDispatch({type:"SET_TITLE", payload:""})
                            }                        
                        }} 
                        type="submit" className="btn btn-solid-primary btn-sm-size">Save Note</button>
                    
                    <button onClick={()=>{
                        if(noteState.id){
                            setEditMode(false);
                        }else{
                            noteDispatch({type:"SET_DESCRIPTION", payload:""});
                            noteDispatch({type:"SET_TITLE", payload:""})
                        }
                    }} type="button" className="btn btn-outline-primary btn-sm-size">Discard</button>
                </div>
                
            </div>
            
        
    )
}

