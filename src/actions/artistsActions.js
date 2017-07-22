import SC from 'soundcloud';


/**
 * Action Types
 */
export const ARTIST_FETCH = 'ARTIST_FETCH';
export const ARTIST_RECEIVE = 'ARTIST_RECEIVE';
export const ARTIST_SELECT = 'ARTIST_SELECT';

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
            console.log({user});
            dispatch(receiveArtist(permalink, user));
            return user.id;
            //const baseUrl = `/users/${user.id}`;
            //const info = pick(user, ['username', 'city', 'country']);
            //this.setState({ info });
            // SC.get(`${baseUrl}/tracks`).then(tracks => this.setState({ tracks }));
            // SC.get(`${baseUrl}/playlists`).then(playlists => this.setState({ playlists }));
        });
};

export const selectArtist = permalink => {
    return {
        type: ARTIST_SELECT,
        permalink
    };
}

export const fetchArtist = permalink => {
    return {
        type: ARTIST_FETCH,
        permalink
    };
}

export const receiveArtist = (permalink, info) => {
    return {
        type: ARTIST_RECEIVE,
        permalink,
        info
    };
}