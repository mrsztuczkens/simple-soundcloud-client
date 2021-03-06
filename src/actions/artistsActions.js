import SC from 'soundcloud';


/**
 * Action Types
 */
export const ARTIST_FETCH = 'ARTIST_FETCH';
export const ARTIST_FETCH_TRACKS = 'ARTIST_FETCH_TRACKS';
export const ARTIST_FETCH_PLAYLISTS = 'ARTIST_FETCH_PLAYLISTS';
export const ARTIST_NOT_FOUND = 'ARTIST_NOT_FOUND';
export const ARTIST_RECEIVE = 'ARTIST_RECEIVE';
export const ARTIST_RECEIVE_TRACKS = 'ARTIST_RECEIVE_TRACKS';
export const ARTIST_RECEIVE_PLAYLISTS = 'ARTIST_RECEIVE_PLAYLISTS';

/**
 * Action Creators
 */

export const fetchArtistIfNeeded = (permalink) => (dispatch, getState) => {
    const state = getState();
    const cachedArtist = state.artists.cache[permalink];
    if (cachedArtist)
        return;

    return SC.get('/users/', { q: permalink })
        .then(([user]) => {
            if (!user) {
                dispatch(notFoundArtist(permalink))
                return null;
            }
            dispatch(receiveArtist(permalink, user));
            return user.id;
        })
        .then(userId => {
            if (!userId) return true
            dispatch(fetchArtistTracks(permalink))
            dispatch(fetchArtistPlaylists(permalink))
            const baseUrl = `/users/${userId}`;
            const proms = [
                SC.get(`${baseUrl}/tracks`).then(tracks => dispatch(receiveArtistTracks(permalink, tracks))),
                SC.get(`${baseUrl}/playlists`).then(playlists => dispatch(receiveArtistPlaylists(permalink, playlists)))
            ];
            return Promise.all(proms)
        });
};

export const fetchArtist = permalink => ({
    type: ARTIST_FETCH,
    permalink
});

export const fetchArtistTracks = permalink => ({
    type: ARTIST_FETCH_TRACKS,
    permalink
});

export const fetchArtistPlaylists = permalink => ({
    type: ARTIST_FETCH_PLAYLISTS,
    permalink
});

export const notFoundArtist = (permalink) => ({
    type: ARTIST_NOT_FOUND,
    permalink
});

export const receiveArtist = (permalink, info) => ({
    type: ARTIST_RECEIVE,
    permalink,
    info
});

const receiveArtistTracks = (permalink, tracks) => ({
    type: ARTIST_RECEIVE_TRACKS,
    permalink,
    tracks
})

const receiveArtistPlaylists = (permalink, playlists) => ({
    type: ARTIST_RECEIVE_PLAYLISTS,
    permalink,
    playlists
})