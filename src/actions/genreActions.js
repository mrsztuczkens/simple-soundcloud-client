import SC from 'soundcloud';

import { CLIENT_ID } from './../consts'


/**
 * Action Types
 */
export const GENRE_FETCH_TRACKS = 'GENRE_FETCH_TRACKS';
export const GENRE_RECEIVE_TRACKS = 'GENRE_RECEIVE_TRACKS';
export const GENRE_RECEIVE_PLAYLISTS = 'GENRE_RECEIVE_PLAYLISTS';

/**
 * Action Creators
 */

export const fetchGenreIfNeeded = (genre) => (dispatch, getState) => {
    const state = getState();
    const cachedArtist = state.genre.cache[genre];
    if (cachedArtist)
        return;

    const promises = [
        SC.get('/tracks/', { genre: genre })
            .then((tracks) => dispatch(receiveTracks(genre, tracks))),
        SC.get('/playlists/', { genre: genre })
            .then(playlists => dispatch(receivePlaylists(genre, playlists)))
    ];
    return Promise.all(promises);
};

export const fetchTracks = genre => ({
    type: GENRE_FETCH_TRACKS,
    genre
});

export const receiveTracks = (genre, tracks) => ({
    type: GENRE_RECEIVE_TRACKS,
    genre,
    tracks,
});

export const receivePlaylists = (genre, playlists) => ({
    type: GENRE_RECEIVE_PLAYLISTS,
    genre,
    playlists,
});