import { 
    GENRE_FETCH_TRACKS, GENRE_RECEIVE_TRACKS, GENRE_RECEIVE_PLAYLISTS
} from './../actions/genreActions';

import { ObjectStatus } from './../enums'

const defaultState = {
    cache: {}
};

const defaultGenre = {
    tracksStatus: ObjectStatus.DEFAULT,
    tracks: [],
    playlistsStatus: ObjectStatus.DEFAULT,
    playlists: [],
};

function updateCacheEntry(cache, genre, newData) {
    const newCache = { ...cache };
    newCache[genre] = { ...newCache[genre], ...newData };
    return newCache;
}

function updateCache(state, genre, newData) {
    const cache = updateCacheEntry(state.cache, genre, newData);
    return { ...state, cache };
}

export default function artists(state = defaultState, action) {
    switch (action.type) {
        case GENRE_FETCH_TRACKS:
            return updateCache(state, action.genre, Object.assign({}, defaultGenre, { tracksStatus: ObjectStatus.FETCHING }))
        case GENRE_RECEIVE_TRACKS:
            return updateCache(state, action.genre, { tracks: action.tracks, tracksStatus: ObjectStatus.FETCHED })
        case GENRE_RECEIVE_PLAYLISTS:
            return updateCache(state, action.genre, { playlists: action.playlists, playlistsStatus: ObjectStatus.FETCHED })
        default:
            return state;
    }
}