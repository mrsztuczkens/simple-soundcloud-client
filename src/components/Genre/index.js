import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import { ObjectStatus } from './../../enums';
import { Genres } from './../../consts';
import { UrlHelper } from './../../helpers/'
import TrackList from './../TrackList';

export default class Genre extends Component {

    static propTypes = {
        genre: PropTypes.string.isRequired,
        tracks: PropTypes.array,
        tracksStatus: PropTypes.symbol,
        playlists: PropTypes.array,
        playlistsStatus: PropTypes.symbol,
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
        const { 
            tracksStatus, genre, tracks,
            addTrackToQueue, changeTrack,
            playlistsStatus, playlists,
        } = this.props;
        const genreName = Genres[genre];
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
                    <h4>Tracks</h4>
                    <TrackList 
                        addTrackToQueue={addTrackToQueue}
                        tracks={tracks}
                        changeTrack={changeTrack}
                    />
                </Row>
                <Row>
                    <h4>Playlists</h4>
                    <ListGroup>{playlists.map(plist =>
                        <ListGroupItem key={plist.id}>
                            <Link to={UrlHelper.playlist(plist.user.permalink, plist.permalink)}>{plist.title}</Link>
                        </ListGroupItem>
                    )}
                    </ListGroup>
                </Row>
            </Grid>
        );
    }
}