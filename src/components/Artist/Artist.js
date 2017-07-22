import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import { ObjectStatus } from './../../enums';
import ArtistInfo from './ArtistInfo'

export default class Artist extends Component {

    static propTypes = {
        info: PropTypes.object,
        tracks: PropTypes.array,
        playlists: PropTypes.array,
        fetchifNeeded: PropTypes.func.isRequired,
        select: PropTypes.func.isRequired
    };

    componentWillMount() {
        const { permalink } = this.props.match.params;
        this.props.fetchifNeeded(permalink);
        this.props.select(permalink);
    }

    componentDidUpdate(newProps) {
        //Todo download other user's data if that changed
    }

    render() {
        if (this.props.status === ObjectStatus.FETCHING)
            return (<h3>Fetching...</h3>);
        return (
            <Grid fluid>
                <Row>
                    <Col lg={3}>
                        <ArtistInfo info={this.props.info} status={this.props.status} />
                    </Col>
                    <Col lg={9}>
                        {this.renderPlaylists()}
                        {this.renderTracks()}
                    </Col>
                </Row>
            </Grid>

        );
    }

    renderPlaylists() {
        if (this.props.playlistsStatus === ObjectStatus.FETCHING) {
            return <h3>Fetching playlists</h3>
        }
        return (
            <div>
                <h4>Playlists</h4>

                <ul>{this.props.playlists.map(plist => <li key={plist.id}>{plist.title}</li>)}</ul>
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
                <ul>{this.props.tracks.map(track => <li key={track.id}>{track.title}</li>)}</ul>
            </div>
        );
    }
}