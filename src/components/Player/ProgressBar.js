import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        const width = `${this.props.progress}%`;
        return(
            <div style={{ height: '80px', position: 'relative' }}>
                <img alt="" src={waveform_url} style={{ maxHeight: '100%', maxWidth: '100%', minWidth: '100%', position: 'absolute', top: 0, left: 0, zIndex: 100 }} />
                <div style={{position: 'absolute', top: 0, left: 0, width , backgroundColor: `#000`, height: '80px', transition: 'width 0.25s linear'}} />
            </div>
        );
    }
}

export default ProgressBar;