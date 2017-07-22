import { combineReducers } from 'redux'
import { CHANGE_TRACK, SEARCH_STARTED, SEARCH_RESULTS } from './../actions'
import artists from './artistsReducer';

function track(state = null, action) {
    switch (action.type) {
        case CHANGE_TRACK:
            return action.track;
        default:
            return state
    }
}

const searchResultsDefaultState = {
    isFetching: false,
    query: '',
    data: []
};

function searchResults(state = searchResultsDefaultState, action) {
    switch(action.type) {
        case SEARCH_STARTED:
            if (!action.query)
                return Object.assign({}, searchResultsDefaultState);
            return {
                isFetching: true,
                query: action.query,
                data: []
            };
        case SEARCH_RESULTS:
            return { isFetching: false, data: action.results, query: action.query };
        default:
            return state;
    }
}

const app = combineReducers({
    track,
    searchResults,
    artists
});

export default app;