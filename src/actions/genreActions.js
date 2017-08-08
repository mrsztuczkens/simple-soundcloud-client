import SC from 'soundcloud';

import { CLIENT_ID } from './../consts'


/**
 * Action Types
 */
export const GENRE_FETCH_TRACKS = 'GENRE_FETCH_TRACKS';
export const GENRE_RECEIVE_TRACKS = 'GENRE_RECEIVE_TRACKS';

/**
 * Action Creators
 */

export const fetchGenreIfNeeded = (genre) => (dispatch, getState) => {
    const state = getState();
    const cachedArtist = state.genre.cache[genre];
    if (cachedArtist)
        return;

    return SC.get('/tracks/', { genre: genre })
        .then((tracks) => {
            if (!tracks) {
                //dispatch(notFoundArtist(permalink))
                return null;
            }
            console.log({ tracks });
            dispatch(receiveTracks(genre, tracks));
            return true
        })
        .then(() => {
            const fetchUrl = `https://api-v2.soundcloud.com/explore/categories?limit=10&offset=0&linked_partitioning=1&client_id=${CLIENT_ID}`;
            return fetch(fetchUrl, { headers: { mode: 'no-cors' } });
        })
        .then((results) => {
            console.log({ results });
        });
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