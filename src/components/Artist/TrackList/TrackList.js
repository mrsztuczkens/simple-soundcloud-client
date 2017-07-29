import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaPlay } from 'react-icons/lib/fa';

import { track as trackUrl } from './../../../helpers/url-helper'
import { PlayIcon } from './TrackList.style'

export default class TrackList extends Component {

    static propTypes = {
        artist: PropTypes.string.isRequired,
        tracks: PropTypes.array.isRequired,
        changeTrack: PropTypes.func.isRequired,
    }

    render() {
        return (
            <ListGroup>
                {this.props.tracks.map(track =>
                    <ListGroupItem key={track.id}>
                        <Link to={trackUrl(this.props.artist, track.permalink)}>{track.title}</Link>
                        <PlayIcon>
                            <FaPlay onClick={() => this.props.changeTrack(track)} />
                        </PlayIcon>
                    </ListGroupItem>
                )}
            </ListGroup>
        );
    }
}