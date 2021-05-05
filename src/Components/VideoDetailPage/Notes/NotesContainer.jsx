import { useEffect, useState } from 'react';

import { useAuthentication } from '../../../Context';
import { NoteCard } from './NoteCard';
import { getNotesForVideo } from '../../utils/server-requests';
import { NoteEditor } from './NoteEditor';

export const NotesContainer = ({ videoId, playerRef }) => {
	const { userId } = useAuthentication();
	const [noteDetails, setNotes] = useState([]);

	useEffect(() => {
		if (userId) {
			getNotesForVideo({ userId, videoId, setNotes });
		}
	}, []);

	let noteDetailsSortedWithTime = [...noteDetails].sort(
		(note1, note2) => Number(note2.time) - Number(note1.time),
	);

	return (
		<>
			<div>
				<h6 className='padding-around-1rem margin-0'>Notes</h6>
				<div>
					<NoteEditor
						playerRef={playerRef}
						videoId={videoId}
						setNotes={setNotes}
					/>
				</div>
			</div>

			<ul className='stacked-list padding-around-1rem'>
				{noteDetailsSortedWithTime.length === 0 ? (
					<li className='padding-around-1rem'>No notes added</li>
				) : (
					noteDetailsSortedWithTime.map((note) => (
						<NoteCard key={note._id} note={note} setNotes={setNotes} />
					))
				)}
			</ul>
		</>
	);
};
