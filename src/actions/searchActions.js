import SC from 'soundcloud';

export const SEARCH_STARTED = 'SEARCH_STARTED';
export const SEARCH_RESULTS = 'SEARCH_RESULTS';

export const search = (q) => dispatch => {
    dispatch(searchStarted(q));
    return SC.get("/tracks", { limit: 10, q })
        .then((tracks) => dispatch(searchResults(q, tracks)));
}

const searchStarted = (query) => ({
    type: SEARCH_STARTED,
    query
});

const searchResults = (query, results) => ({
    type: SEARCH_RESULTS,
    query,
    results
});
