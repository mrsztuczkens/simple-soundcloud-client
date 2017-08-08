import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { FaPlay, FaPlus } from 'react-icons/lib/fa';

import { ObjectStatus, EventType } from './../../enums';
import { TrackNotFound } from './../../consts';
import { ClickableIconWrapper } from './../Styles'

export default class TrackView extends Component {

    static propTypes = {
        track: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.symbol,
        ]).isRequired,
        tracksStatus: PropTypes.symbol.isRequired,
        artist: PropTypes.string.isRequired,
        changeTrack: PropTypes.func.isRequired,
        addTrackToQueue: PropTypes.func.isRequired,
    }
    
    render() {
        const { track, tracksStatus } = this.props;
        if (tracksStatus !== ObjectStatus.FETCHED) {
            return <h3>Fetching track...</h3>;
        } else if (track === TrackNotFound) {
            return <Redirect to="/404" />;
        }

        return (
            <div>
                <h3>{track.title}</h3>
                <ClickableIconWrapper onClick={() => this.props.changeTrack(track)}>
                    <FaPlay />
                </ClickableIconWrapper>
                <ClickableIconWrapper onClick={() => this.props.addTrackToQueue(track)} data-event={EventType.PLAYLIST}>
                    <FaPlus />
                </ClickableIconWrapper>
            </div>
        );
    }
}