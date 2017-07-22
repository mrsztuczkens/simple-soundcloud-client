import { ARTIST_SELECT, ARTIST_FETCH, ARTIST_RECEIVE } from './../actions/artistsActions';

const defaultState = {
    current: '',
    cache: {}
};

const defaultArtist = {
    isFetching: false,
    notFound: false,
    info: {},
    tracks: [],
    playlists: []
};


export default function artists(state = defaultState, action) {
    switch (action.type) {
        case ARTIST_SELECT:
            return Object.assign({}, state, { current: action.permalink });
        case ARTIST_FETCH: {
            const cache = Object.assign({}, state.cache);
            cache[action.permalink] = Object.assign({}, defaultArtist, { isFetching: true });
            return Object.assign({}, state, { cache });
        }
        case ARTIST_RECEIVE: {
            const cache = Object.assign({}, state.cache);
            cache[action.permalink] = Object.assign({}, cache[action.permalink], { isFetching: false, info: action.info });
            return Object.assign({}, state, { cache });
        }
        default:
            return state;
    }
}