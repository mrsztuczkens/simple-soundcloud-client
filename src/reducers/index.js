import { combineReducers } from 'redux'
import artists from './artistsReducer';
import track from './trackReducer'
import search from './searchReducer'
import queue from './queueReducer';

const app = combineReducers({
    track,
    search,
    artists,
    queue,
});

export default app;