import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { track as trackUrl } from '../../helpers/url-helper'
import { SearchResultsWrapper, SearchResultsList, SearchResultsEntry } from './SearchResults.style'

export default class SearchResults extends Component {

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentWillReceiveProps(nextProps) {
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
                            <Link to={trackUrl(track.user.permalink, track.permalink)}>{track.title}</Link>
                        </SearchResultsEntry>
                    )}
                </SearchResultsList>
            </SearchResultsWrapper>
        );
    }
}