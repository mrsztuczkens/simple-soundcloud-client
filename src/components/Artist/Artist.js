import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Artist extends Component {

    static propTypes = {
        isFetching: PropTypes.bool,
        info: PropTypes.object,
        fetchifNeeded: PropTypes.func.isRequired,
        select: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            playlists: [],
            tracks: []
        }
    }

    componentWillMount() {
        const { permalink } = this.props.match.params;
        this.props.fetchifNeeded(permalink);
        this.props.select(permalink);
        // SC.get('/users/', { q: permalink, limit: 10 })
        //     .then(([user]) => {
        //         const baseUrl = `/users/${user.id}`;
        //         const info = pick(user, ['username', 'city', 'country']);
        //         this.setState({ info });
        //         SC.get(`${baseUrl}/tracks`).then(tracks => this.setState({ tracks }));
        //         SC.get(`${baseUrl}/playlists`).then(playlists => this.setState({ playlists }));
        //     });
    }

    componentDidUpdate(newProps) {
        //Todo download other user's data if that changed
    }

    render() {
        if (this.props.isFetching)
            return (<h3>Fetching</h3>);
        const { username: name, city, country } = this.props.info;
        return (
            <div>
                <h3>{name}</h3>
                <p>From {city} in {country}</p>
            </div>
        );
    }

    renderPlaylists() {
        if (!this.state.playlists)
            return null;
        return (
            <div>
                <h4>Playlists</h4>
                <ul>{this.state.playlists.map(plist => <li key={plist.id}>{plist.title}</li>)}</ul>
            </div>
        );
    }

    renderTracks() {
        if (!this.state.tracks)
            return;
        return (
            <div>
                <h4>Tracks</h4>
                <ul>{this.state.tracks.map(track => <li key={track.id}>{track.title}</li>)}</ul>
            </div>
        );
    }
}

export default Artist;