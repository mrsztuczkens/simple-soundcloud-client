import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { Route } from 'react-router';

import { ObjectStatus } from './../../enums';
import ArtistInfo from './ArtistInfo';
import ArtistView from './ArtistView';
import PlaylistView from './PlaylistView';

export default class Artist extends Component {

    static propTypes = {
        info: PropTypes.object,
        tracks: PropTypes.array,
        playlists: PropTypes.array,
        fetchifNeeded: PropTypes.func.isRequired,
        select: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.fetchifNeeded(this.permalink);
        this.props.select(this.permalink);
    }

    componentDidUpdate(newProps) {
        //Todo download other user's data if that changed
    }

    get permalink() {
        return this.props.match.params.permalink
    }

    render() {
        const { status, info, match } = this.props;
        if (status === ObjectStatus.FETCHING)
            return (<h3>Fetching...</h3>);
        return (
            <Grid fluid>
                <Row>
                    <Col lg={3}>
                        <ArtistInfo info={this.props.info} status={this.props.status} />
                    </Col>
                    <Col lg={9}>
                        <Route path={`${match.url}/sets/:setName`} render={(props) => {
                            const setName = props.match.params.setName
                            let playlist = this.props.playlists.filter(pl => pl.permalink == setName)
                            playlist = playlist[0] || {} //TODO make it better
                            return (
                                <PlaylistView
                                    {...props}
                                    permalink={this.permalink}
                                    playlist={playlist}
                                    playlistsStatus={this.props.playlistsStatus}
                                />
                            )
                        }}
                        />
                        <Route path={`${match.url}/tracks/:trackName`} render={(props) => {
                            const trackName = props.match.params.trackName
                            let track = this.props.tracks.filter(pl => pl.permalink == trackName)
                            track = track[0] || {} //TODO make it better
                            console.log('found', {track});
                            return <h2>Track</h2>
                        }} />
                        <Route exact path={match.url} render={(props) => (
                            <ArtistView
                                {...props}
                                permalink={this.permalink}
                                playlists={this.props.playlists}
                                playlistsStatus={this.props.playlistsStatus}
                                tracks={this.props.tracks}
                                tracksStatus={this.props.tracksStatus}
                            />
                        )} />
                    </Col>
                </Row>
            </Grid>

        );
    }
}