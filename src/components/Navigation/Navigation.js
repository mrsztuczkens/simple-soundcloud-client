import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import Search from './Search';
import Queue from './Queue';

export default class Navigation extends Component {

    static propTypes = {
        queueIsVisible: PropTypes.bool.isRequired,
        queueToggle: PropTypes.func.isRequired,
        queueNextTracks: PropTypes.array.isRequired,
        queueMoveTrackToIndex: PropTypes.func.isRequired,
        queueRemoveTrack: PropTypes.func.isRequired,
    }

    render() {
        const searchProps = {
            search: this.props.search,
            data: this.props.searchData,
            isFetching: this.props.searchIsFetching,
            isVisible: this.props.searchIsVisible,
            hide: this.props.searchResultsHide,
        };
        const queueProps = {
            isVisible: this.props.queueIsVisible,
            toggle: this.props.queueToggle,
            nextTracks: this.props.queueNextTracks,
            moveTrackToIndex: this.props.queueMoveTrackToIndex,
            removeTrack: this.props.queueRemoveTrack,
        };
        return (
            <Navbar inverse collapseOnSelect fluid style={{ paddingRight: '0', border: '0' }}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Simple Soundcloud Client</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse style={{ paddingRight: '0'}}>
                    <Queue {...queueProps} style={{width: '250px'}} />
                    <Search {...searchProps} />
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
