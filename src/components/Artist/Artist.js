import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { Route, Redirect } from 'react-router';

import { ObjectStatus } from './../../enums';
import { PlaylistNotFound, TrackNotFound } from './../../consts';
import ArtistInfo from './ArtistInfo';
import ArtistView from './ArtistView';
import PlaylistView from './PlaylistView';
import TrackView from './TrackView'

export default class Artist extends Component {

    static propTypes = {
        info: PropTypes.object,
        tracks: PropTypes.array,
        playlists: PropTypes.array,
        fetchifNeeded: PropTypes.func.isRequired,
        select: PropTypes.func.isRequired,
        changeTrack: PropTypes.func.isRequired,
    };

    artist = '';

    componentWillMount() {
        this.artist = this.getPermalink()
        this.props.fetchifNeeded(this.artist);
        this.props.select(this.artist);
    }

    componentDidUpdate(newProps) {
        this.artist = this.getPermalink()
        //Todo download other user's data if that changed
    }

    getPermalink = () => {
        return this.props.match.params.permalink
    }

    render() {
        const { status, info, match } = this.props;
        if (status === ObjectStatus.FETCHING) {
            return (<h3>Fetching...</h3>);
        } else if (status === ObjectStatus.NOTFOUND) {
            return <Redirect to="/404" />
        }
        return (
            <Grid fluid>
                <Row>
                    <Col lg={3}>
                        <ArtistInfo permalink={this.artist} info={this.props.info} status={this.props.status} />
                    </Col>
                    <Col lg={9}>
                         <Route path={`${match.url}/sets/:setName`} render={(props) => {
                            const setName = props.match.params.setName
                            const playlist = this.props.playlists.find(pl => pl.permalink === setName) || PlaylistNotFound
                            return (
                                <PlaylistView
                                    {...props}
                                    artist={this.artist}
                                    playlist={playlist}
                                    playlistsStatus={this.props.playlistsStatus}
                                    changeTrack={this.props.changeTrack}
                                />
                            )
                        }}
                        /> 
                        <Route path={`${match.url}/tracks/:trackName`} render={(props) => {
                            const trackName = props.match.params.trackName
                            const track = this.props.tracks.find(pl => pl.permalink === trackName) || TrackNotFound
                            return (
                                <TrackView
                                    {...props}
                                    artist={this.artist}
                                    track={track}
                                    tracksStatus={this.props.tracksStatus}
                                    changeTrack={this.props.changeTrack}
                                />
                            )
                        }} />
                        <Route exact path={match.url} render={(props) => (
                            <ArtistView
                                {...props}
                                artist={this.artist}
                                playlists={this.props.playlists}
                                playlistsStatus={this.props.playlistsStatus}
                                tracks={this.props.tracks}
                                tracksStatus={this.props.tracksStatus}
                                changeTrack={this.props.changeTrack}
                            />
                        )} />
                    </Col>
                </Row>
            </Grid>

        );
    }
}