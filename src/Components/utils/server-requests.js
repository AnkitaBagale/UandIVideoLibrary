import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../utils';

const errorToastOptions = { autoClose: 2000, className: 'toast toast-error' };
const successToastOptions = {
	autoClose: 2000,
	className: 'toast toast-success',
};
const informToastOptions = { autoClose: 2000, className: 'toast toast-inform' };

export const addOrRemoveFromPlaylist = async ({
	type,
	playlistId,
	dispatch,
	videoId,
	token,
}) => {
	if (token) {
		try {
			let toastId;
			if (type !== 'SET_HISTORY') {
				toastId = toast.info('Updating Your Playlist..', informToastOptions);
			}

			const {
				data: { response },
			} = await axios({
				method: 'POST',
				url: `${API_URL}/playlists/${playlistId}/videos`,
				data: {
					videoId,
					date: new Date().toDateString(),
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log({ response });
			dispatch({ type, payload: response });

			toast.dismiss(toastId);
		} catch (error) {
			console.error(error);
			toast.error('Please try later !', errorToastOptions);
		}
	} else {
		toast.info('Please login to continue!', informToastOptions);
	}
};

export const updatePlaylistInformation = async ({
	type,
	playlistId,
	title,
	dispatch,
	token,
}) => {
	if (token) {
		try {
			let toastId;
			if (type !== 'history') {
				toastId = toast.info('Updating Your Playlist..', informToastOptions);
			}
			const {
				data: { response },
			} = await axios({
				method: 'POST',
				url: `${API_URL}/playlists/${playlistId}`,
				data: {
					title,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			dispatch({ type: 'UPDATE_PLAYLIST', payload: response });

			toast.dismiss(toastId);
		} catch (error) {
			console.error(error);
			if (type !== 'history') {
				toast.error('Please try later !', errorToastOptions);
			}
		}
	} else {
		toast.info('Please log in to continue!', informToastOptions);
	}
};

export const deleteEntirePlaylist = async ({ dispatch, playlistId, token }) => {
	try {
		const toastId = toast.info('Deleting Playlist..', informToastOptions);
		const {
			data: { response },
		} = await axios({
			method: 'DELETE',
			url: `${API_URL}/playlists/${playlistId}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		dispatch({ type: 'DELETE_PLAYLIST', payload: response._id });
		toast.dismiss(toastId);
	} catch (error) {
		console.error(error);
		toast.error('Please try later !', errorToastOptions);
	}
};

export const createNewPlaylist = async ({
	title,
	video,
	dispatch,
	token,
	setPlaylistTitle,
}) => {
	if (token) {
		try {
			const {
				data: { response },
			} = await axios({
				method: 'POST',
				url: `${API_URL}/playlists`,
				data: {
					title,
					thumbnail: video.thumbnail,
					videoList: [{ videoId: video._id, date: new Date().toDateString() }],
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			dispatch({ type: 'ADD_NEW_PLAYLIST', payload: response });
			setPlaylistTitle('');
			toast.success('Playlist created and video added !', successToastOptions);
		} catch (error) {
			console.error(error);
			toast.error('Please try later !', errorToastOptions);
		}
	} else {
		toast.info('Please log in to continue!', informToastOptions);
	}
};

export const clearHistory = async ({ playlistId, dispatch, token }) => {
	try {
		const toastId = toast.info('Clearing History..', informToastOptions);
		const {
			data: { response },
		} = await axios({
			method: 'POST',
			url: `${API_URL}/playlists/${playlistId}`,
			data: {
				videoList: [],
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		dispatch({ type: 'SET_HISTORY', payload: response });
		toast.dismiss(toastId);
	} catch (error) {
		console.error(error);
		toast.error('Please try later !', errorToastOptions);
	}
};
export const getNotesForVideo = async ({ token, videoId, setNotes }) => {
	try {
		const {
			data: { response },
		} = await axios({
			url: `${API_URL}/notes/video/${videoId}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
			method: 'GET',
		});

		setNotes(response);
	} catch (error) {
		console.error(error);
	}
};

export const CreateNoteForVideo = async ({
	setNotes,
	newVideo,
	noteDispatch,
	token,
}) => {
	try {
		const toastId = toast.info('Adding Note..', informToastOptions);
		const {
			data: { response },
		} = await axios({
			url: `${API_URL}/notes`,
			data: newVideo,
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		setNotes((notes) => [...notes, response]);
		noteDispatch({ type: 'SET_DESCRIPTION', payload: '' });
		noteDispatch({ type: 'SET_TITLE', payload: '' });
		toast.dismiss(toastId);
	} catch (error) {
		console.error(error);
		toast.error('Please try later !', errorToastOptions);
	}
};

export const UpdateNoteForVideo = async ({
	noteId,
	setNotes,
	noteUpdates,
	setEditMode,
	token,
}) => {
	try {
		const toastId = toast.info('Updating Note..', informToastOptions);
		const {
			data: { response },
		} = await axios({
			method: 'POST',
			url: `${API_URL}/notes/${noteId}`,
			data: noteUpdates,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		setNotes((notes) =>
			notes.map((note) => (note._id !== response._id ? note : response)),
		);
		setEditMode(false);
		toast.dismiss(toastId);
	} catch (error) {
		console.error(error);
		toast.error('Please try later !', errorToastOptions);
	}
};

export const deleteNoteForVideo = async ({ noteId, setNotes, token }) => {
	try {
		const toastId = toast.info('Deleting note..', informToastOptions);
		const {
			data: { response },
		} = await axios({
			url: `${API_URL}/notes/${noteId}`,
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		setNotes((notes) => notes.filter((note) => note._id !== response._id));
		toast.dismiss(toastId);
	} catch (error) {
		console.error(error);
		toast.error('Please try later !', errorToastOptions);
	}
};
