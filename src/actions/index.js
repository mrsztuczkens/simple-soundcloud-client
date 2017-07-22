import SC from 'soundcloud';

/**
 * Action Types
 */

/* TRACKS */
export const CHANGE_TRACK = 'CHANGE_TRACK';


/* SEARCH */
export const SEARCH_STARTED = 'SEARCH_STARTED';
export const SEARCH_RESULTS = 'SEARCH_RESULTS';

/**
 * Action Creators
 */

/* TRACKS */
export function changeTrack(track) {
    return {
        type: CHANGE_TRACK,
        track
    };
}

/* SEARCH */
export const search = (q) => dispatch => {
    dispatch(searchStarted(q));
    return SC.get("/tracks", { limit: 10, q })
        .then((tracks) => dispatch(searchResults(q, tracks)));
}

const searchStarted = (query) => {
    return {
        type: SEARCH_STARTED,
        query
    };
}

const searchResults = (query, results) => {
    return {
        type: SEARCH_RESULTS,
        query,
        results
    };
}