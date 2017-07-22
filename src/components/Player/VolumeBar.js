import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VolumeBar extends Component {

    static props = {
        onChange: PropTypes.func,
        volume: PropTypes.number,
    };

    static defaultProps = {
        volume: 1
    };

    constructor() {
        super();

        this.dragging = false;

        //declare bound events
        this.startDrag = this.startDrag.bind(this);
        this.stopDrag = this.stopDrag.bind(this);
        this.drag = this.drag.bind(this);
    }

    componentDidMount() {
        this.volume.addEventListener('mousedown', this.startDrag);
        this.volume.addEventListener('mouseup', this.stopDrag);
        this.volume.addEventListener('mousemove', this.drag);
    }

    componentWillUnmount() {
        this.volume.removeEventListener('mousedown', this.startDrag);
        this.volume.removeEventListener('mouseup', this.stopDrag);
        this.volume.removeEventListener('mousemove', this.drag);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.volume !== this.props.volume || nextProps.onChange !== this.props.onChange;
    }

    computeVolume(cursorX) {
        const mathBetween0and1 = (val) => Math.min(Math.max(val, 0), 100);
        const { width, left } = this.volume.getBoundingClientRect();
        const normalized = mathBetween0and1( (cursorX - left) / width);
        if (this.props.onChange)
            this.props.onChange(normalized);
    }

    startDrag(e) {
        this.dragging = true;
        this.computeVolume(e.pageX);
    }

    stopDrag(e) {
        this.dragging = false;
        this.computeVolume(e.pageX);
    }

    drag(e) {
        if (!this.dragging)
            return;
        this.computeVolume(e.pageX);
    }

    render() {
        const width = `${this.props.volume * 100}%`;
        return (
            <div className="volume" ref={(input) => this.volume = input }>
                <span className="volumeBar" ref={(input) => this.volumeBar = input } style={ { width } } />
            </div>
        );
    }
}

export default VolumeBar;