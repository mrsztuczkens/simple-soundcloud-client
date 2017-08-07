export const PLAY = 'TRACK_PLAY';
export const PLAY_TRACK = 'TRACK_PLAY_TRACK';
export const NEXT = 'TRACK_NEXT';
export const PREVIOUS = 'TRACK_PREVIOUS';
export const PAUSE = 'TRACK_PAUSE';
export const ADD_TO_QUEUE = 'TRACK_ADD_TO_QUEUE';
export const TOGGLE_REPEAT = 'TRACK_TOGGLE_REPEAT';
export const MOVE_TRACK_TO_INDEX = 'TRACK_MOVE_TRACK_TO_INDEX';
export const REMOVE_TRACK = 'TRACK_REMOVE_TRACK';


export const playTrack = (track) => ({
    type: PLAY_TRACK,
    track
});
export const addToQueue = (track) => ({
    type: ADD_TO_QUEUE,
    track
});

export const moveTrackToIndex = (index, toIndex) => ({
    type: MOVE_TRACK_TO_INDEX,
    index,
    toIndex,
});

export const removeTrack = (index) => ({
    type: REMOVE_TRACK,
    index,
});

export const next = () => ({ type: NEXT });
export const previous = () => ({ type: PREVIOUS });
export const pause = () => ({ type: PAUSE });
export const play = () => ({ type: PLAY });
export const toggleRepeat = () => ({ type: TOGGLE_REPEAT });
