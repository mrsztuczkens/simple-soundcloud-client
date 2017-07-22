import { 
    ARTIST_SELECT,
    ARTIST_FETCH, ARTIST_FETCH_TRACKS, ARTIST_FETCH_PLAYLISTS,
    ARTIST_RECEIVE, ARTIST_RECEIVE_TRACKS, ARTIST_RECEIVE_PLAYLISTS
} from './../actions/artistsActions';

import { ObjectStatus } from './../enums'

const defaultState = {
    current: '',
    cache: {}
};

const defaultArtist = {
    status: ObjectStatus.DEFAULT,
    info: {},
    tracksStatus: ObjectStatus.DEFAULT,
    tracks: [],
    playlistsStatus: ObjectStatus.DEFAULT,
    playlists: []
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
        case ARTIST_SELECT:
            return { ...state, current: action.permalink };
        case ARTIST_FETCH: 
            return updateCache(state, action.permalink, { ...defaultArtist, status: ObjectStatus.FETCHING })
        case ARTIST_FETCH_TRACKS:
            return updateCache(state, action.permalink, { tracksStatus: ObjectStatus.FETCHING })
        case ARTIST_FETCH_PLAYLISTS:
            return updateCache(state, action.permalink, { playlistsStatus: ObjectStatus.FETCHING })
        case ARTIST_RECEIVE:
            return updateCache(state, action.permalink, { status: ObjectStatus.FETCHED, info: action.info });
        case ARTIST_RECEIVE_TRACKS:
            return updateCache(state, action.permalink, { tracks: action.tracks, tracksStatus: ObjectStatus.FETCHED })
        case ARTIST_RECEIVE_PLAYLISTS:
            return updateCache(state, action.permalink, { playlists: action.playlists, playlistsStatus: ObjectStatus.FETCHED })
        default:
            return state;
    }
}