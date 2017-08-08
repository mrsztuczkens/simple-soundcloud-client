import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaPlay, FaPause, FaVolumeUp, FaRepeat, FaForward, FaBackward } from 'react-icons/lib/fa';
import { Grid, Row, Col } from 'react-bootstrap';

import ProgressBar from './ProgressBar';
import VolumeBar from './VolumeBar';
import TrackInfo from './TrackInfo';

import { IconWrapper, PlayerWrapper } from './Player.style'
import { CLIENT_ID } from './../../consts';

function formatStreamUrl(str) {
    return `${str}?client_id=${CLIENT_ID}`;
}

export default class Player extends Component {

    static props = {
        track: PropTypes.object,
        isPlaying: PropTypes.bool,
        hasNext: PropTypes.bool.isRequired,
        hasPrevious: PropTypes.bool.isRequired,
        repeat: PropTypes.bool.isRequired,
        play: PropTypes.func.isRequired,
        pause: PropTypes.func.isRequired,
        next: PropTypes.func.isRequired,
        previous: PropTypes.func.isRequired,
        toggleRepeat: PropTypes.func.isRequired,
    };

    constructor() {
        super();

        this.state = {
            volume: 1,
            progress: 0,
        };
        this.progressInterval = null;
    }

    componentDidMount() {
        this.audio.addEventListener('ended', this.onEnded, false);
        this.audio.addEventListener('loadedmetadata', this.onLoadMetadata);
        this.audio.addEventListener('loadstart', () => console.log('load start'), false);
        this.audio.addEventListener('pause', () => console.log('paused'), false);
        this.audio.addEventListener('play', () => console.log('played'), false);

        this.setState({ volume: this.audio.volume });
    }

    componentWillUnmount() {
        this.audio.removeEventListener('ended', this.onEnded);
        this.audio.removeEventListener('loadedmetadata', this.onLoadMetadata);
    }

    componentWillReceiveProps(nextProps) {
        const startPlaying = !this.props.isPlaying && nextProps.isPlaying;
        const stopPlaying = this.props.isPlaying && !nextProps.isPlaying;
        if (startPlaying) {
            this.progressInterval= setInterval(this.onTimeUpdate, 100);
            if (this.props.track === nextProps.track) {
                this.audio.play();
            }
        }

        if (stopPlaying) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
            this.audio.pause();
        }

    }

    onLoadMetadata = () => {
        if (this.props.isPlaying) {
            this.audio.play()
        }
        this.onTimeUpdate()
    }

    onEnded = () => {
        if (this.props.repeat) {
            this.audio.play();
        } else if (this.props.hasNext) {
            this.props.next()
        } else {
            this.props.pause()
        }
    }

    onVolumeChange = (newVolumeValue) => {
        this.audio.volume = newVolumeValue;
        this.setState({ volume: newVolumeValue });
    }

    onTimeUpdate = () => {
        const progress = this.audio.currentTime / this.audio.duration * 100;
        this.setState({ progress });
    }

    render() {
        return (
            <PlayerWrapper>
                <audio hidden ref={(input) => this.audio = input} src={this.props.track && formatStreamUrl(this.props.track.stream_url)} />
                <Grid fluid>
                    <Row>
                        <Col lg={3}>
                            <TrackInfo track={this.props.track} />
                        </Col>
                        <Col lg={6}>
                            <Row>
                                <IconWrapper>
                                    <FaBackward disabled={!this.props.hasPrevious} onClick={this.props.previous} className="icon2x" />
                                </IconWrapper>
                                {!this.props.isPlaying &&
                                    <IconWrapper>
                                        <FaPlay disabled={!this.props.track} onClick={this.props.play} className="icon2x" />
                                    </IconWrapper>
                                }
                                {this.props.isPlaying &&
                                    <FaPause onClick={this.props.pause} className="icon2x" />
                                }
                                <IconWrapper>
                                    <FaForward disabled={!this.props.hasNext} onClick={this.props.next} className="icon2x" />
                                </IconWrapper>
                                <IconWrapper>
                                    <FaRepeat disabled={!this.props.repeat} className="icon2x" onClick={this.props.toggleRepeat} />
                                </IconWrapper>
                            </Row>
                            <Row>
                                <ProgressBar progress={this.state.progress} track={this.props.track} />
                            </Row>
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
            </PlayerWrapper>
        );
    }
}
