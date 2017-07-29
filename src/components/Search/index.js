import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { artist as artistUrl } from './../../helpers/url-helper'

class SearchComponent extends Component {

    static propTypes = {
        results: PropTypes.arrayOf(PropTypes.object),
        isFetching: PropTypes.bool
    };

    componentDidMount() {
        this.props.search(this.props.match.params.q);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.q !== this.props.match.params.q) {
            this.props.search(this.props.match.params.q);
        }
    }


    select = (id) => {
        const track = this.props.results.find(tr => tr.id === id);
        if (track) {
            this.props.changeTrack( track );
        }
    }

    render() {
        if (this.props.isFetching)
            return (<div>Fetching results</div>);
        return (
            <div>
                {this.props.results.map(track =>
                    <p key={track.id}>
                        {track.title} by <Link to={artistUrl(track.user.permalink)}>{track.user.username}</Link>
                        <button onClick={() => this.select(track.id)}>&nbsp;Play</button>
                    </p>
                )}
            </div>
        );
    }
}

export default SearchComponent;