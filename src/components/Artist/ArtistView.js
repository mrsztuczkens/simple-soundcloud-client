import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { ObjectStatus } from './../../enums';
import TrackList from './TrackList';
import { playlist as playlistUrl } from './../../helpers/url-helper'

export default class ArtistMain extends Component {

    static props = {
        artist: PropTypes.string,
        playlists: PropTypes.array,
        tracks: PropTypes.array,
        changeTrack: PropTypes.func.isRequired,
    }

    render() {
        return (
            <div>
                <h2>Artist Main view!</h2>
                {this.renderPlaylists()}
                {this.renderTracks()}
            </div>
        );
    }

    renderPlaylists() {
        if (this.props.playlistsStatus === ObjectStatus.FETCHING) {
            return <h3>Fetching playlists</h3>
        }
        const { playlists, artist } = this.props;
        return (
            <div>
                <h4>Playlists</h4>
                <ListGroup>{playlists.map(plist =>
                    <ListGroupItem key={plist.id}>
                        <Link to={playlistUrl(artist, plist.permalink)}>{plist.title}</Link>
                    </ListGroupItem>
                )}
                </ListGroup>
            </div>
        );
    }

    renderTracks() {
        if (this.props.tracksStatus === ObjectStatus.FETCHING) {
            return <h3>Fetching tracks</h3>
        }
        return (
            <div>
                <h4>Tracks</h4>
                <TrackList
                    artist={this.props.artist}
                    tracks={this.props.tracks}
                    changeTrack={this.props.changeTrack}
                />
            </div>
        );
    }
}