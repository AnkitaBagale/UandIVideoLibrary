export const stateReducer = (state, { type, payload }) => {
	switch (type) {
		case 'SET_VIDEOS': {
			return { ...state, videos: payload };
		}

		case 'SET_PLAYLISTS': {
			return { ...state, playlists: payload };
		}

		case 'SET_HISTORY': {
			return { ...state, watchHistory: payload };
		}

		case 'SET_LIKED_VIDEOS': {
			return { ...state, likedVideos: payload };
		}

		case 'SET_WATCH_LATER': {
			return { ...state, watchLater: payload };
		}

		case 'ADD_NEW_PLAYLIST': {
			return { ...state, playlists: state.playlists.concat(payload) };
		}

		case 'UPDATE_PLAYLIST': {
			return {
				...state,
				playlists: state.playlists.map((item) =>
					item._id !== payload._id ? item : payload,
				),
			};
		}

		case 'DELETE_PLAYLIST': {
			return {
				...state,
				playlists: state.playlists.filter(
					(playlist) => playlist._id !== payload,
				),
			};
		}

		case 'RESET_DATA_ON_LOGOUT': {
			return {
				...state,
				playlists: [],
				watchLater: {},
				watchHistory: {},
				likedVideos: {},
			};
		}

		default:
			return state;
	}
};
