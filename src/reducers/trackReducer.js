import { 
    NEXT, PREVIOUS, PAUSE, PLAY, ADD_TO_QUEUE, PLAY_TRACK
} from './../actions/trackActions';

const defaultState = {
    currentTrack: null,
    isPlaying: false,
    previousTracks: [],
    nextTracks: []
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
        case PREVIOUS:
            // TODO
        default:
            return state;
    }
}