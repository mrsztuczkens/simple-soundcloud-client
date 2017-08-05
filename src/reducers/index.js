import { combineReducers } from 'redux'
import artists from './artistsReducer';
import track from './trackReducer'
import search from './searchReducer'

const app = combineReducers({
    track,
    search,
    artists
});

export default app;