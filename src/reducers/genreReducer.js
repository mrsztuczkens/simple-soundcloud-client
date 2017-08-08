import { 
    GENRE_FETCH_TRACKS, GENRE_RECEIVE_TRACKS
} from './../actions/genreActions';

import { ObjectStatus } from './../enums'

const defaultState = {
    cache: {}
};

const defaultGenre = {
    tracksStatus: ObjectStatus.DEFAULT,
    tracks: [],
};

function updateCacheEntry(cache, permalink, newData) {
    const newCache = { ...cache };
    newCache[permalink] = { ...newCache[permalink], ...newData };
    return newCache;
}

function updateCache(state, permalink, newData) {
    const cache = updateCacheEntry(state.cache, permalink, newData);
    return { ...state, cache };
}


export default function artists(state = defaultState, action) {
    switch (action.type) {
        case GENRE_FETCH_TRACKS:
            return updateCache(state, action.genre, { tracksStatus: ObjectStatus.FETCHING })
        case GENRE_RECEIVE_TRACKS:
            return updateCache(state, action.genre, { tracks: action.tracks, tracksStatus: ObjectStatus.FETCHED })
        default:
            return state;
    }
}