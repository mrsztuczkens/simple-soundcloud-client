import { 
    NEXT, PREVIOUS, PAUSE, PLAY, ADD_TO_QUEUE, PLAY_TRACK,
    TOGGLE_REPEAT, MOVE_TRACK_TO_INDEX, REMOVE_TRACK
} from './../actions/trackActions';

const defaultState = {
    currentTrack: null,
    isPlaying: false,
    previousTracks: [],
    nextTracks: [],
    repeat: false,
};


export default function track(state = defaultState, action) {
    switch (action.type) {
        case PLAY_TRACK: {
            let previousTracks = state.previousTracks;
            if (state.currentTrack) {
                previousTracks = previousTracks.concat([state.currentTrack])
            }
            return { ...state, isPlaying: true, previousTracks, currentTrack: action.track };
        }
        case PAUSE: return { ...state, isPlaying: false };
        case PLAY: return { ...state, isPlaying: true };
        case TOGGLE_REPEAT: return { ...state, repeat: !state.repeat };
        case ADD_TO_QUEUE:{
            if (!state.currentTrack) {
                return { ...state, currentTrack: action.track };
            }
            return { ...state, nextTracks: state.nextTracks.concat([action.track])};
        } 
        case NEXT: {
            const previousTracks = state.previousTracks.concat([state.currentTrack]);
            if (state.nextTracks.length === 0) {
                const currentTrack = null;
                return { ...state, previousTracks, currentTrack, isPlaying: false };
            }
            const currentTrack = state.nextTracks[0];
            const nextTracks = state.nextTracks.slice(1)
            return { ...state, previousTracks, currentTrack, nextTracks };
        }
        case PREVIOUS: {
            if (state.previousTracks.length === 0) return state;
            const currentTrack = state.previousTracks[0];
            const previousTracks = state.previousTracks.slice(1);
            const nextTracks = [state.currentTrack].concat(state.nextTracks);
            return { ...state, currentTrack, previousTracks, nextTracks };
        }
        case MOVE_TRACK_TO_INDEX: {
            const trackToMove = state.nextTracks[action.index];
            if (!trackToMove) return state;
            let nextTracks = [...state.nextTracks.slice(0, action.index), ...state.nextTracks.slice(action.index+1)];
            nextTracks = [...nextTracks.slice(0, action.toIndex), trackToMove, ...nextTracks.slice(action.toIndex)];
            return { ...state, nextTracks };
        }
        case REMOVE_TRACK: {
            if (state.nextTracks.length <= action.index) return state;
            const nextTracks = [...state.nextTracks.slice(0, action.index), ...state.nextTracks.slice(action.index+1)];
            return { ...state, nextTracks }
        }
        default:
            return state;
    }
}