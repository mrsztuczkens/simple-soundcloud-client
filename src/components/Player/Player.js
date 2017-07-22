import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaPlay, FaPause, FaVolumeUp, FaRepeat } from 'react-icons/lib/fa';
import { Grid, Row, Col } from 'react-bootstrap';
import { throttle } from 'lodash';

import ProgressBar from './ProgressBar';
import VolumeBar from './VolumeBar';
import TrackInfo from './TrackInfo';

import { CLIENT_ID } from './../../consts';



function formatStreamUrl(str) {
    return `${str}?client_id=${CLIENT_ID}`;
}

class Player extends Component {

    static props = {
        track: PropTypes.object
    };

    constructor() {
        super();

        this.state = {
            volume: 1,
            progress: 0,
            playing: false
        };

        //bound functions
        this.onTimeUpdate = this.onTimeUpdate.bind(this);
        this.onVolumeChange = this.onVolumeChange.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
    }

    componentDidMount() {
        this.audio.addEventListener('ended', () => console.log('ended'), false);
        this.audio.addEventListener('loadedmetadata', () => console.log('load metadata'), false);
        this.audio.addEventListener('loadstart', () => console.log('load start'), false);
        this.audio.addEventListener('pause', () => console.log('paused'), false);
        this.audio.addEventListener('play', () => console.log('played'), false);
        this.audio.addEventListener('timeupdate', throttle(this.onTimeUpdate, 250, { leading: true }), false);

        this.setState({ volume: this.audio.volume });
    }

    componentWillUnmount() {
        this.audio.removeEventListener(this.onTimeUpdate);
    }

    onVolumeChange(newVolumeValue) {
        console.log({ newVolumeValue });
        this.audio.volume = newVolumeValue;
        this.setState({ volume: newVolumeValue });
    }

    onTimeUpdate() {
        const progress = this.audio.currentTime / this.audio.duration * 100;
        this.setState({ progress });
    }

    togglePlay() {
        this.state.playing ? this.audio.pause() : this.audio.play();
        this.setState({ playing: !this.state.playing });
    }

    render() {
        //this.props.track && console.log(JSON.stringify( this.props.track ));
        return (
            <div style={{ position: 'fixed', bottom: 0, width: '100%', minHeight: '100px' }}>
                <audio hidden ref={(input) => { this.audio = input; }} src={this.props.track && formatStreamUrl(this.props.track.stream_url)} />
                <Grid fluid>
                    <Row>
                        <Col lg={3}>
                            <TrackInfo track={this.props.track} />
                        </Col>
                        <Col lg={6}>
                            {this.renderPlayPauseButton()}
                            <FaRepeat className="icon2x" />
                            <ProgressBar progress={this.state.progress} track={this.props.track} />
                        </Col>
                        <Col lg={3}>
                            <Row>
                                <Col lg={6}>
                                    <FaVolumeUp className="icon2x pull-right" />
                                </Col>
                                <Col lg={6}>
                                    <VolumeBar onChange={this.onVolumeChange} volume={this.state.volume} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

    renderPlayPauseButton() {
        if (!this.state.playing) {
            return (<FaPlay disabled={!this.props.track} onClick={this.togglePlay} className="icon2x" />);
        } else {
            return (<FaPause onClick={this.togglePlay} className="icon2x" />);
        }
    }
}

export default Player;