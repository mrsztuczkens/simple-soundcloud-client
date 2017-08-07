import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget, DragSource } from 'react-dnd';
import { findDOMNode } from 'react-dom'
import { FaClose } from 'react-icons/lib/fa';

import { ClickableIconWrapper } from './../../Styles'

const ItemTypes = {
    Track: 'track',
};

const trackSource = {
    beginDrag(props) {
        return {
            id: props.track.id,
            index: props.index,
        };
    },
};

const trackTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) return;

        // // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // // Only perform the move when the mouse has crossed half of the items height
        // // When dragging downwards, only move when the cursor is below 50%
        // // When dragging upwards, only move when the cursor is above 50%

        if ((dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
            (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)) {
            return;
        }

        props.moveTrack(dragIndex, hoverIndex);

        // // Note: we're mutating the monitor item here!
        // // Generally it's better to avoid mutations,
        // // but it's good here for the sake of performance
        // // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
};

class QueueEntry extends Component {

    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        moveTrack: PropTypes.func.isRequired,
        removeTrack: PropTypes.func.isRequired,
        track: PropTypes.object.isRequired,
    };

    render() {
        const { connectDragSource, connectDropTarget, track, removeTrack } = this.props;
        return connectDragSource(
            connectDropTarget(
                <li>
                    <ClickableIconWrapper onClick={removeTrack}>
                        <FaClose />
                    </ClickableIconWrapper>
                    {track.title}
                </li>
            )
        );
    }
}

const Droppable = DropTarget(ItemTypes.Track, trackTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))(QueueEntry);

export default DragSource(ItemTypes.Track, trackSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(Droppable);