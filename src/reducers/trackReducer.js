import { 
    NEXT, PREVIOUS, PAUSE, PLAY, ADD_TO_QUEUE, PLAY_TRACK, TOGGLE_REPEAT
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
        case ADD_TO_QUEUE: return { ...state, nextTracks: state.nextTracks.concat([action.track])};
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
        default:
            return state;
    }
}