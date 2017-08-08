import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPlay, FaPlus } from 'react-icons/lib/fa';

import { track as trackUrl } from './../../helpers/url-helper';
import { ClickableIconWrapper } from './../Styles';
import { EventType } from './../../enums';

export default class TrackList extends Component {

    static propTypes = {
        tracks: PropTypes.array.isRequired,
        changeTrack: PropTypes.func.isRequired,
        addTrackToQueue: PropTypes.func.isRequired,
    }

    render() {
        return (
            <ListGroup>
                {this.props.tracks.map(track =>
                    <ListGroupItem key={track.id}>
                        <Link to={trackUrl(track.user.permalink, track.permalink)}>{track.title}</Link>
                        <ClickableIconWrapper onClick={() => this.props.changeTrack(track)}>
                            <FaPlay />
                        </ClickableIconWrapper>
                        <ClickableIconWrapper onClick={() => this.props.addTrackToQueue(track)} data-event={EventType.PLAYLIST}>
                            <FaPlus />
                        </ClickableIconWrapper>
                    </ListGroupItem>
                )}
            </ListGroup>
        );
    }
}