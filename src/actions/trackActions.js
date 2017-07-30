export const PLAY = 'TRACK_PLAY';
export const PLAY_TRACK = 'TRACK_PLAY_TRACK';
export const NEXT = 'TRACK_NEXT';
export const PREVIOUS = 'TRACK_PREVIOUS';
export const PAUSE = 'TRACK_PAUSE';
export const ADD_TO_QUEUE = 'TRACK_ADD_TO_QUEUE';
export const TOGGLE_REPEAT = 'TRACK_TOGGLE_REPEAT';


export const playTrack = (track) => ({
    type: PLAY_TRACK,
    track
});
export const addToQueue = (track) => ({
    type: ADD_TO_QUEUE,
    track
});

export const next = () => ({ type: NEXT });
export const previous = () => ({ type: PREVIOUS });
export const pause = () => ({ type: PAUSE });
export const play = () => ({ type: PLAY });
export const toggleRepeat = () => ({ type: TOGGLE_REPEAT });
