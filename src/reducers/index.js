import { combineReducers } from 'redux'
import artists from './artistsReducer';
import track from './trackReducer'
import search from './searchReducer'
import queue from './queueReducer';
import genre from './genreReducer';

const app = combineReducers({
    track,
    search,
    artists,
    queue,
    genre,
});

export default app;