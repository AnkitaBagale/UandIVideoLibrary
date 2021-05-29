import { useState } from 'react';
import { useAuthentication } from '../../../Context';
import { deleteNoteForVideo } from '../../utils/server-requests';
import { NoteEditor } from './NoteEditor';
import { convertTimeToString } from './utils';

export const NoteCard = ({ note, setNotes }) => {
	const [isEditMode, setEditMode] = useState(false);

	const {
		state: { token },
	} = useAuthentication();

	return (
		<li className='bg-lesslight-pink border-radius-1rem'>
			{!isEditMode ? (
				<div className='text-container'>
					<h6 className='body-cp-rg'>{note.title}</h6>
					<p className='body-cp-md'>{note.description}</p>
					<time className='body-cp-sm text-light-weight'>
						{' '}
						<span className='padding-right-4px'>
							<i className='far fa-clock'></i>
						</span>{' '}
						{convertTimeToString(note.time)}
					</time>

					<div className='notes-cta-container'>
						<button
							onClick={() => {
								setEditMode(true);
							}}
							className='btn btn-icon-primary'>
							<i className='fas fa-pencil-alt btn-icon'></i>
						</button>

						<button
							className='btn btn-icon-primary'
							onClick={() =>
								deleteNoteForVideo({ setNotes, noteId: note._id, token })
							}>
							<i className='fas fa-trash-alt btn-icon'></i>
						</button>
					</div>
				</div>
			) : (
				<NoteEditor note={note} setEditMode={setEditMode} setNotes={setNotes} />
			)}
		</li>
	);
};
