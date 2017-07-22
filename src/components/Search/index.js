import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchComponent extends Component {

    static propTypes = {
        results: PropTypes.arrayOf(PropTypes.object),
        isFetching: PropTypes.bool
    };

    constructor(props) {
        super(props);
        
        this.select = this.select.bind(this);
    }

    componentDidMount() {
        console.log('mnt', this.props);
        this.props.search(this.props.match.params.q);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.q !== this.props.match.params.q) {
            this.props.search(this.props.match.params.q);
        }
    }


    select(id) {
        const filtered = this.props.results.filter(tr => tr.id === id);
        if (filtered.length === 1) {
            this.props.changeTrack( filtered[0] );
        }
    }

    render() {
        if (this.props.isFetching)
            return (<div>Fetching results</div>);
        return (
            <div>
                {this.props.results.map(track =>
                    <p key={track.id}>
                        {track.title} <button onClick={() => this.select(track.id)}>Select</button>
                    </p>
                )}
            </div>
        );
    }
}

export default SearchComponent;