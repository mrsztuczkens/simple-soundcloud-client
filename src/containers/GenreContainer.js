import { connect } from 'react-redux'

import { fetchGenreIfNeeded } from './../actions/genreActions';
import { playTrack, addToQueue } from './../actions/trackActions';
import { ObjectStatus } from './../enums';
import { GenreComponent } from './../components';

const mapStateToProps = (state, props) => {
    const { genre } = props.match.params;
    const genreCache = state.genre.cache[genre];
    return {
        tracks: (genreCache && genreCache.tracks) || [],
        tracksStatus: (genreCache && genreCache.tracksStatus) || ObjectStatus.DEFAULT,
        playlists: (genreCache && genreCache.playlists) || [],
        playlistsStatus: (genreCache && genreCache.playlistsStatus) || ObjectStatus.DEFAULT,
        genre,
    };
}

const mapDispatchToProps = (dispatch) => ({
    fetchifNeeded: (genre) => dispatch(fetchGenreIfNeeded(genre)),
    changeTrack: (track) => dispatch(playTrack(track)),
    addTrackToQueue: (track) => dispatch(addToQueue(track)),
});

const GenreContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GenreComponent);

export default GenreContainer;