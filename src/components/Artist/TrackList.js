import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { track as trackUrl } from './../../helpers/url-helper'

export default class TrackList extends Component {

    static propTypes = {
        permalink: PropTypes.string.isRequired,
        tracks: PropTypes.array.isRequired,
    }

    render() {
        return (
            <ListGroup>
                {this.props.tracks.map(track =>
                    <ListGroupItem key={track.id}>
                        <Link to={trackUrl(this.props.permalink, track.permalink)}>{track.title}</Link>
                    </ListGroupItem>
                )}
            </ListGroup>
        );
    }
}