import { connect } from 'react-redux'

import { fetchArtistIfNeeded } from './../actions/artistsActions'
import { playTrack, addToQueue } from './../actions/trackActions'
import { ObjectStatus } from './../enums'
import { ArtistComponent } from './../components'

const mapStateToProps = (state, props) => {
    const { permalink } = props.match.params;
    const currentArtistCache = state.artists.cache[permalink];
    return {
        status: (currentArtistCache && currentArtistCache.status) || ObjectStatus.DEFAULT,
        info: (currentArtistCache && currentArtistCache.info) || {},
        tracks: (currentArtistCache && currentArtistCache.tracks) || [],
        tracksStatus: (currentArtistCache && currentArtistCache.tracksStatus) || ObjectStatus.DEFAULT,
        permalink,
        playlists: (currentArtistCache && currentArtistCache.playlists) || [],
        playlistsStatus: (currentArtistCache && currentArtistCache.playlistsStatus) || ObjectStatus.DEFAULT,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTrack: (track) => dispatch(playTrack(track)),
        addTrackToQueue: (track) => dispatch(addToQueue(track)),
        fetchifNeeded: (permalink) => dispatch(fetchArtistIfNeeded(permalink)),
    };
}

const ArtistContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistComponent);

export default ArtistContainer;