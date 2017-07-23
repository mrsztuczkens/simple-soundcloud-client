import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ArtistInfo extends Component {

    static propTypes = {
        info: PropTypes.object,
    };

    render() {
        const { username, city, country, avatar_url } = this.props.info;
        return (
            <div>
                <h3>{username}</h3>
                <img src={avatar_url} alt={username} />
                <p>From {city} in {country}</p>
            </div>
        );
    }
}