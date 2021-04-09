import { getNoteDetails } from "../utils";
import { v4 as uuidv4 } from 'uuid';

import { useStateContext } from "../Context";
import { useState, useReducer } from "react";

export const Notes = ({id}) =>{
    const {state} = useStateContext();
    let noteDetails = getNoteDetails(state.notes, id);
    console.log(noteDetails);
    let noteDetailsSortedWithTime = [...noteDetails].sort((note1, note2)=>Number(note2.time)-Number(note1.time));
    return(
        <>
            <>                
                <ul className="stacked-list margin-top-1rem">
                {noteDetailsSortedWithTime.length===0? <li className="padding-around-1rem">No notes added</li> : noteDetailsSortedWithTime.map((note)=>
                    <NoteCard  key={note.id} note={note} />
                )}
                </ul>
            </>
     
        </>
    )
}

const NoteCard = ({note}) =>{
    const { dispatch } = useStateContext();
    
    const [isEditMode, setEditMode] = useState(false);
    
    return(
        <li className="bg-lesslight-pink border-radius-1rem">
            {   
                !isEditMode?
                (<div className="text-container">

                    <h6 className="body-cp-rg">{note.title}</h6>
                    <p className="body-cp-md">{note.description}</p>
                    <time className="body-cp-sm text-light-weight"> <span className="padding-right-4px"><i className="far fa-clock"></i></span> {convertTimeToString(note.time)}</time>
                    
                    <div className="notes-cta-container">
                        <button onClick={()=>{setEditMode(true)}} className="btn btn-icon-primary"><i className="fas fa-pencil-alt btn-icon"></i></button>
                        <button className="btn btn-icon-primary" onClick={()=>dispatch({type:"DELETE_NOTE", payload:note.id})}><i className="fas fa-trash-alt btn-icon"></i></button>
                    </div>
                    
                </div>) : 
                (
                    <AddNewNote note={note} setEditMode={setEditMode} />
                )
            }
            
        </li>
    )
}

const noteDefaultState = {
    id: null,
    title: "",
    description:""
}

export const AddNewNote = ({note = noteDefaultState, setEditMode, playerRef, videoId}) =>{
    
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

const convertTimeToString = (time) =>{
    time = Number(time);
    if(time >= 3600){
        return `${Math.floor(time / 3600)}:${Math.floor((time % 3600) / 60)}:${Math.floor(time % 60)}`;
    }
        return `${Math.floor(time / 60)}:${Math.floor(time % 60)}`;
    
}