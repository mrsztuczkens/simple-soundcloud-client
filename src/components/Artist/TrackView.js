import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

import { ObjectStatus } from './../../enums';
import { TrackNotFound } from './../../consts';

export default class TrackView extends Component {

    static propTypes = {
        track: PropTypes.object,
        tracksStatus: PropTypes.symbol.isRequired,
        artist: PropTypes.string.isRequired,
    }
    
    render() {
        const { track, tracksStatus } = this.props;
        if (tracksStatus !== ObjectStatus.FETCHED) {
            return <h3>Fetching track...</h3>;
        } else if (track === TrackNotFound) {
            return <Redirect to="/404" />
        }

        console.log(this.props.track)
        return <h3>{track.title}</h3>
    }
}