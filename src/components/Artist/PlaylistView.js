import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ObjectStatus } from './../../enums';
import TrackList from './TrackList';

export default class PlaylistView extends Component {

    static propTypes = {
        playlist: PropTypes.object.isRequired,
        playlistsStatus: PropTypes.symbol.isRequired,
        permalink: PropTypes.string.isRequired,
    }

    render() {
        const { playlist, playlistsStatus, permalink } = this.props;
        if (playlistsStatus !== ObjectStatus.FETCHED) {
            return <h3>Fetching playlist...</h3>;
        }
        return (
            <div>
                <h3>Playlist: {playlist.title}</h3>
                <TrackList tracks={playlist.tracks} permalink={permalink} />
            </div>
        );
    }
}