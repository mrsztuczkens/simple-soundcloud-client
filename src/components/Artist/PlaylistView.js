import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

import { ObjectStatus } from './../../enums';
import { PlaylistNotFound } from './../../consts';
import TrackList from './../TrackList';

export default class PlaylistView extends Component {

    static propTypes = {
        playlist: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.symbol,
        ]).isRequired,
        playlistsStatus: PropTypes.symbol.isRequired,
        artist: PropTypes.string.isRequired,
        addTrackToQueue: PropTypes.func.isRequired,
    }

    render() {
        const { playlist, playlistsStatus, artist, addTrackToQueue } = this.props;
        if (playlistsStatus !== ObjectStatus.FETCHED)
            return <h3>Fetching playlist...</h3>;
        if (playlist === PlaylistNotFound)
            return <Redirect to="/404" />;
        return (
            <div>
                <h3>Playlist: {playlist.title}</h3>
                <TrackList 
                    addTrackToQueue={addTrackToQueue}
                    tracks={playlist.tracks}
                    changeTrack={this.props.changeTrack}
                />
            </div>
        );
    }
}