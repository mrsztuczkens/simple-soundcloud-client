import { connect } from 'react-redux'

import { fetchArtistIfNeeded, selectArtist } from './../actions/artistsActions'
import { playTrack, addToQueue } from './../actions/trackActions'
import { ObjectStatus } from './../enums'
import { ArtistComponent } from './../components'

const mapStateToProps = (state) => {
    const { cache, current } = state.artists;
    const currentArtistCache = cache[current];
    return {
        status: (currentArtistCache && currentArtistCache.status) || ObjectStatus.DEFAULT,
        info: (currentArtistCache && currentArtistCache.info) || {},
        tracks: (currentArtistCache && currentArtistCache.tracks) || [],
        tracksStatus: (currentArtistCache && currentArtistCache.tracksStatus) || ObjectStatus.DEFAULT,
        playlists: (currentArtistCache && currentArtistCache.playlists) || [],
        playlistsStatus: (currentArtistCache && currentArtistCache.playlistsStatus) || ObjectStatus.DEFAULT,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTrack: (track) => dispatch(playTrack(track)),
        addTrackToQueue: (track) => dispatch(addToQueue(track)),
        fetchifNeeded: (permalink) => dispatch(fetchArtistIfNeeded(permalink)),
        select: (permalink) => dispatch(selectArtist(permalink)),
    };
}

const ArtistContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistComponent);

export default ArtistContainer;