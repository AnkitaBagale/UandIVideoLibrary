import { getNoteDetails } from "../../../utils";
import { useStateContext } from "../../../Context";
import { NoteCard } from "./NoteCard";

export const NotesContainer = ({id}) =>{
    const {state} = useStateContext();
    let noteDetails = getNoteDetails(state.notes, id);
    let noteDetailsSortedWithTime = [...noteDetails].sort((note1, note2)=>Number(note2.time)-Number(note1.time));
    return(
        <>
            <>                
                <ul className="stacked-list padding-around-1rem">
                {noteDetailsSortedWithTime.length===0? <li className="padding-around-1rem">No notes added</li> : noteDetailsSortedWithTime.map((note)=>
                    <NoteCard  key={note.id} note={note} />
                )}
                </ul>
            </>
     
        </>
    )
}
