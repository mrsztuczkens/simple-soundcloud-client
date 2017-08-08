import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router'

import { ObjectStatus } from './../../enums';
import { Genres } from './../../consts';
import TrackList from './../TrackList';

export default class Genre extends Component {

    static propTypes = {
        genre: PropTypes.string.isRequired,
        tracks: PropTypes.array,
        tracksStatus: PropTypes.symbol,
        fetchifNeeded: PropTypes.func.isRequired,
        addTrackToQueue: PropTypes.func.isRequired,
        changeTrack: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.props.fetchifNeeded(this.props.genre);
    }

    componentDidUpdate(newProps) {
        this.props.fetchifNeeded(this.props.genre);
    }

    render() {
        const { tracksStatus, genre, tracks, addTrackToQueue, changeTrack } = this.props;
        const genreName = Genres[genre];
        console.log({tracks});
        if (tracksStatus === ObjectStatus.FETCHING) {
            return (<h3>Fetching...</h3>);
        } else if (tracksStatus === ObjectStatus.NOTFOUND) {
            return <Redirect to="/404" />
        }
        return (
            <Grid>
                <Row>
                    <h3>{genreName}</h3>
                </Row>
                <Row>
                    <TrackList 
                        addTrackToQueue={addTrackToQueue}
                        tracks={tracks}
                        changeTrack={changeTrack}
                    />
                </Row>
            </Grid>
        );
    }
}