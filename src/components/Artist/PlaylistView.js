import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

import { ObjectStatus } from './../../enums';
import { PlaylistNotFound } from './../../consts';
import TrackList from './TrackList';

export default class PlaylistView extends Component {

    static propTypes = {
        playlist: PropTypes.object.isRequired,
        playlistsStatus: PropTypes.symbol.isRequired,
        artist: PropTypes.string.isRequired,
    }

    render() {
        const { playlist, playlistsStatus, artist } = this.props;
        if (playlistsStatus === ObjectStatus.FETCHING)
            return <h3>Fetching playlist...</h3>;
        if (playlist === PlaylistNotFound)
            return <Redirect to="/404" />;
        return (
            <div>
                <h3>Playlist: {playlist.title}</h3>
                <TrackList 
                    tracks={playlist.tracks}
                    artist={artist}
                    changeTrack={this.props.changeTrack}
                    />
            </div>
        );
    }
}