import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/lib/fa';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Wrapper, QueueList, QueueWrapper, NextTrackWrapper } from './Queue.style';
import QueueEntry from './QueueEntry';
import { ClickableIconWrapper } from './../../Styles';
import { EventType } from './../../../enums';
import { DOMHelper } from './../../../helpers';

class Queue extends Component {

    static propTypes = {
        isVisible: PropTypes.bool.isRequired,
        toggle: PropTypes.func.isRequired,
        nextTracks: PropTypes.array.isRequired,
        moveTrackToIndex: PropTypes.func.isRequired,
        removeTrack: PropTypes.func.isRequired,
        style: PropTypes.object,
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.props.isVisible && this.wrapperRef && !this.wrapperRef.contains(event.target)
            && !DOMHelper.isEventType(event.target, EventType.PLAYLIST)) {
            this.props.toggle()
        }
    }

    render() {
        const { isVisible, style, nextTracks } = this.props;
        const nextTrack = nextTracks.length > 0 ? `Next: ${nextTracks[0].title}` : 'Queue empty';
        return (
            <Wrapper className="navbar-text navbar-right" style={style} innerRef={(ref) => this.wrapperRef = ref}>
                <NextTrackWrapper>{nextTrack}</NextTrackWrapper>
                {isVisible &&
                    <ClickableIconWrapper onClick={this.props.toggle} className="pull-right">
                        <FaAngleDoubleUp />
                    </ClickableIconWrapper>
                }
                {!isVisible && nextTracks.length > 0 &&
                    <ClickableIconWrapper onClick={this.props.toggle} className="pull-right">
                        <FaAngleDoubleDown />
                    </ClickableIconWrapper>
                }
                {this.renderQueue()}
            </Wrapper>
        )
    }

    renderQueue = () => {
        const { isVisible, nextTracks, moveTrackToIndex, removeTrack } = this.props;
        if (!isVisible) return null;
        return (
            <QueueWrapper>
                <QueueList>
                    {nextTracks.map((track, index) =>
                        <QueueEntry key={index} index={index} moveTrack={moveTrackToIndex} track={track} removeTrack={removeTrack.bind(null, index)} />
                    )}
                </QueueList>
            </QueueWrapper>
        )
    }
}

export default DragDropContext(HTML5Backend)(Queue)