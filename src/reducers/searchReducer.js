import { SEARCH_STARTED, SEARCH_RESULTS, SEARCH_RESULTS_HIDE } from './../actions/searchActions'

const searchResultsDefaultState = {
    isFetching: false,
    isVisible: false,
    query: '',
    data: [],
};

export default function search(state = searchResultsDefaultState, action) {
    switch(action.type) {
        case SEARCH_STARTED:
            if (!action.query)
                return Object.assign({}, searchResultsDefaultState);
            return {
                isFetching: true,
                isVisible: false,
                query: action.query,
                data: [],
            };
        case SEARCH_RESULTS:
            return {
                isFetching: false,
                isVisible: true,
                data: action.results,
                query: action.query,
            };
        case SEARCH_RESULTS_HIDE:
            return { ...state, isVisible: false };
        default:
            return state;
    }
}