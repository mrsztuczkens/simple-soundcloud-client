import { connect } from 'react-redux'

import { fetchArtistIfNeeded, selectArtist  } from './../actions/artistsActions'
import { ArtistComponent } from './../components'

const mapStateToProps = (state) => {
    const { cache, current } = state.artists;
    const currentArtistCache = cache[current];
    return {
        isFetching: (currentArtistCache && currentArtistCache.isFetching) || false,
        info: (currentArtistCache && currentArtistCache.info) || {}
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchifNeeded: (permalink) => dispatch(fetchArtistIfNeeded(permalink)),
        select: (permalink) => dispatch(selectArtist(permalink))
    };
}

const ArtistContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistComponent);

export default ArtistContainer;