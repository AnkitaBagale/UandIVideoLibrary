import { useReducer } from 'react';
import { useAuthentication } from '../../../Context';
import { toast } from 'react-toastify';
import {
	CreateNoteForVideo,
	UpdateNoteForVideo,
} from '../../utils/server-requests';

const noteDefaultState = {
	_id: null,
	title: '',
	description: '',
};

const toastOptions = { autoClose: 2000, className: 'toast toast-inform' };

export const NoteEditor = ({
	note = noteDefaultState,
	setEditMode,
	setNotes,
	playerRef,
	videoId,
}) => {
	const {
		state: { token },
	} = useAuthentication();
	const noteReducer = (state, { type, payload }) => {
		switch (type) {
			case 'SET_TITLE': {
				return { ...state, title: payload };
			}
			case 'SET_DESCRIPTION': {
				return { ...state, description: payload };
			}
			default: {
				return state;
			}
		}
	};

	const [noteState, noteDispatch] = useReducer(noteReducer, note);

	const editOrAddNote = () => {
		if (!token) {
			toast.info('Please login to proceed !', toastOptions);
			return;
		}
		if (noteState.title !== '') {
			if (noteState._id) {
				UpdateNoteForVideo({
					noteId: noteState._id,
					setNotes,
					noteUpdates: {
						title: noteState.title,
						description: noteState.description,
					},
					setEditMode,
					token,
				});
			} else {
				CreateNoteForVideo({
					setNotes,
					newVideo: {
						videoId,
						title: noteState.title,
						description: noteState.description,
						time: playerRef.current.getCurrentTime(),
					},
					noteDispatch,
					token,
				});
			}
		}
	};

	const discardNote = () => {
		if (noteState._id) {
			setEditMode(false);
		} else {
			noteDispatch({ type: 'SET_DESCRIPTION', payload: '' });
			noteDispatch({ type: 'SET_TITLE', payload: '' });
		}
	};

	return (
		<div className='padding-around-1rem'>
			<div className='row'>
				<input
					className='body-cp-rg form-field'
					value={noteState.title}
					onChange={(e) => {
						noteDispatch({ type: 'SET_TITLE', payload: e.target.value });
					}}
					placeholder='Title'
					autoFocus
				/>
			</div>
			<div className='row margin-bottom-0'>
				<textarea
					className='body-cp-md form-field'
					value={noteState.description}
					onChange={(e) => {
						noteDispatch({ type: 'SET_DESCRIPTION', payload: e.target.value });
					}}
					placeholder='Description'
				/>
			</div>
			<div className='CTA-Container'>
				<button
					onClick={editOrAddNote}
					type='submit'
					className='btn btn-solid-primary btn-sm-size'>
					Save Note
				</button>

				<button
					onClick={discardNote}
					type='button'
					className='btn btn-outline-primary btn-sm-size'>
					Discard
				</button>
			</div>
		</div>
	);
};
