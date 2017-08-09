import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { track as trackUrl, artist as artistUrl } from '../../helpers/url-helper'
import { SearchResultsWrapper, SearchResultsList, SearchResultsEntry } from './SearchResults.style'

export default class SearchResults extends Component {

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.props.isVisible && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.hide()
        }
    }

    render() {
        const { data } = this.props
        return (
            <SearchResultsWrapper show={this.props.isVisible} innerRef={(ref) => this.wrapperRef = ref}>
                <SearchResultsList>
                    {data.map(track =>
                        <SearchResultsEntry key={track.id}>
                            <Link onClick={() => this.props.hide()} to={trackUrl(track.user.permalink, track.permalink)}>{track.title}</Link> by <Link to={artistUrl(track.user.permalink)} onClick={() => this.props.hide()}>{track.user.username}</Link>
                        </SearchResultsEntry>
                    )}
                </SearchResultsList>
            </SearchResultsWrapper>
        );
    }
}