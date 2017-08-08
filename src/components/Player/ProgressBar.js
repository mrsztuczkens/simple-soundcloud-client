import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ProgressBarWrapper, WaveBackground } from './ProgressBar.style'

class ProgressBar extends Component {

    static props = {
        progress: PropTypes.number,
        track: PropTypes.object
    };

    static defaultProps = {
        progress: 0,
        track: null
    };

    shouldComponentUpdate(nextProps) {
        return nextProps.progress !== this.props.progress || nextProps.track !== this.props.track;
    }

    render() {
        if (!this.props.track)
            return null;
        const { waveform_url } = this.props.track;
        return(
            <ProgressBarWrapper>
                <img alt="" src={waveform_url} style={{ maxHeight: '100%', maxWidth: '100%', minWidth: '100%', position: 'absolute', top: 0, left: 0, zIndex: 100 }} />
                <WaveBackground style={{ width: `${this.props.progress}%` }} />
            </ProgressBarWrapper>
        );
    }
}

export default ProgressBar;